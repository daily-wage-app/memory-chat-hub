(() => {
  'use strict';

  const STORAGE_KEY = 'memories-and-us-v2';
  const LEGACY_STORAGE_KEY = 'memories-and-us-v1';
  const DEFAULT_MEMORIES = Array.from({ length: 10 }, (_, index) => ({
    id: `included-chat-${String(index + 1).padStart(2, '0')}`,
    title: `စကားဝိုင်းမှတ်တမ်း ${new Intl.NumberFormat('my-MM').format(index + 1)}`,
    date: '',
    caption: 'ပေးထားသော screenshot ကို မှတ်တမ်းအဖြစ် သိမ်းဆည်းထားသည်။',
    image: `assets/memories/${String(index + 1).padStart(2, '0')}.${index === 2 ? 'webp' : 'jpg'}`,
    favorite: false,
  }));
  const MAX_FILE_SIZE = 1.5 * 1024 * 1024;
  const form = document.getElementById('memoryForm');
  const grid = document.getElementById('memoryGrid');
  const toast = document.getElementById('toast');
  const imageUrl = document.getElementById('imageUrl');
  const imageFile = document.getElementById('imageFile');
  const preview = document.getElementById('imagePreview');
  const previewImage = document.getElementById('previewImage');
  const formMessage = document.getElementById('formMessage');
  const lightbox = document.getElementById('lightbox');
  let favoritesOnly = false;
  let toastTimer;
  let previewObjectUrl = null;

  const byId = (id) => document.getElementById(id);
  const makeId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const localDateValue = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  };

  function loadMemories() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const value = JSON.parse(saved);
        if (!Array.isArray(value)) return [];
        let changed = false;
        const memories = value.filter((item) => item && typeof item === 'object' && typeof item.id === 'string').map((item) => {
          if (!item.id.startsWith('included-chat-')) return item;
          const seed = DEFAULT_MEMORIES[Number(item.id.slice(-2)) - 1];
          if (!seed || (item.title === seed.title && item.caption === seed.caption)) return item;
          changed = true;
          return { ...item, title: seed.title, caption: seed.caption };
        });
        if (changed) localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
        return memories;
      }

      let previous = [];
      try {
        const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || '[]');
        if (Array.isArray(legacy)) previous = legacy.filter((item) => item && typeof item === 'object' && typeof item.id === 'string');
      } catch { /* Start with the included screenshots if old browser data is unreadable. */ }
      const initial = [...DEFAULT_MEMORIES.map((item) => ({ ...item })), ...previous];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    } catch {
      return DEFAULT_MEMORIES.map((item) => ({ ...item }));
    }
  }

  function saveMemories(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return true;
    } catch {
      showToast('Browser storage ပြည့်နေပါတယ်။ ပုံဖိုင်ကြီးတွေကို URL နဲ့အစားထိုးပါ။');
      return false;
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }

  function formatDate(value) {
    if (!value) return 'နေ့စွဲ မသတ်မှတ်ရသေး';
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return 'နေ့စွဲ မသတ်မှတ်ရသေး';
    return new Intl.DateTimeFormat('my-MM', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  }

  function updateCounts(items) {
    byId('momentCount').textContent = String(items.length);
    byId('photoCount').textContent = String(items.filter((item) => item.image).length);
    byId('favoriteCount').textContent = String(items.filter((item) => item.favorite).length);
  }

  function textElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text;
    return element;
  }

  function createCard(item) {
    const card = document.createElement('article');
    card.className = 'memory-card';

    const photo = document.createElement('div');
    photo.className = item.image ? 'memory-photo' : 'memory-photo photo-missing';
    if (item.image) {
      photo.setAttribute('role', 'button');
      photo.setAttribute('tabindex', '0');
      photo.setAttribute('aria-label', `${item.title || 'မှတ်တမ်းပုံ'} ကို အပြည့်ကြည့်ရန်`);
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.title || 'မှတ်တမ်းပုံ';
      img.loading = 'lazy';
      img.addEventListener('error', () => { photo.replaceChildren(textElement('span', '', '▧')); photo.classList.add('photo-missing'); photo.removeAttribute('role'); photo.removeAttribute('tabindex'); }, { once: true });
      photo.append(img);
      photo.addEventListener('click', () => openLightbox(item));
      photo.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLightbox(item); } });
    } else {
      photo.append(textElement('span', '', '▧'));
    }

    const body = document.createElement('div');
    body.className = 'memory-body';
    body.append(textElement('div', 'memory-date', formatDate(item.date)));
    body.append(textElement('h3', 'memory-title', item.title || 'ခေါင်းစဉ်မရှိသော မှတ်တမ်း'));
    body.append(textElement('p', 'memory-caption', item.caption || ''));

    const actions = document.createElement('div');
    actions.className = 'memory-actions';
    const favorite = document.createElement('button');
    favorite.type = 'button';
    favorite.className = `card-action${item.favorite ? ' is-favorite' : ''}`;
    favorite.dataset.action = 'favorite';
    favorite.dataset.id = item.id;
    favorite.setAttribute('aria-pressed', String(Boolean(item.favorite)));
    favorite.textContent = item.favorite ? '★ မှတ်သားထားသည်' : '☆ မှတ်သားရန်';
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'card-action';
    remove.dataset.action = 'delete';
    remove.dataset.id = item.id;
    remove.textContent = 'ဖျက်မယ် ×';
    actions.append(favorite, remove);
    body.append(actions);
    card.append(photo, body);
    return card;
  }

  function render() {
    const all = loadMemories().sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
    const query = byId('searchInput').value.trim().toLocaleLowerCase();
    const shown = all.filter((item) => {
      const matchesFavorite = !favoritesOnly || item.favorite;
      const searchable = `${item.title || ''} ${item.caption || ''}`.toLocaleLowerCase();
      return matchesFavorite && searchable.includes(query);
    });
    grid.replaceChildren();
    updateCounts(all);
    byId('resultLabel').textContent = favoritesOnly ? `${shown.length} ခု · မှတ်သားထားသည်` : `${shown.length} ခု`;

    if (!shown.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.append(textElement('span', 'empty-icon', query || favoritesOnly ? '⌕' : '▤'));
      const title = query || favoritesOnly ? 'ရှာတွေ့တာ မရှိသေးပါ' : 'ဒီစာမျက်နှာမှာ မှတ်တမ်းမရှိသေးပါ';
      empty.append(textElement('strong', '', title));
      const message = document.createElement('p');
      message.textContent = query || favoritesOnly ? 'ရှာဖွေစကားလုံးကို ပြောင်းပြီး ထပ်စမ်းပါ။' : 'Chat screenshot တစ်ပုံကို URL နဲ့ဖြစ်စေ၊ ဖိုင်ရွေးပြီးဖြစ်စေ ထည့်နိုင်ပါတယ် — ';
      if (!query && !favoritesOnly) {
        const link = document.createElement('a');
        link.href = '#add-memory';
        link.textContent = 'မှတ်တမ်းအသစ်ထည့်ရန်';
        message.append(link);
      }
      empty.append(message);
      grid.append(empty);
      return;
    }
    shown.forEach((item) => grid.append(createCard(item)));
  }

  function validImageUrl(value) {
    try {
      const parsed = new URL(value);
      return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : null;
    } catch { return null; }
  }

  function readAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('ပုံဖိုင်ကို ဖတ်မရပါ။'));
      reader.readAsDataURL(file);
    });
  }

  function clearPreview() {
    if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
    previewObjectUrl = null;
    previewImage.removeAttribute('src');
    preview.hidden = true;
  }

  function updatePreview() {
    clearPreview();
    const file = imageFile.files?.[0];
    if (file) {
      previewObjectUrl = URL.createObjectURL(file);
      previewImage.src = previewObjectUrl;
      preview.hidden = false;
      return;
    }
    const url = validImageUrl(imageUrl.value.trim());
    if (url) {
      previewImage.src = url;
      preview.hidden = false;
    }
  }

  function openLightbox(item) {
    if (!item.image) return;
    byId('lightboxImage').src = item.image;
    byId('lightboxCaption').textContent = item.title || '';
    lightbox.showModal();
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    formMessage.textContent = '';
    const title = byId('title').value.trim();
    const date = byId('date').value;
    const caption = byId('caption').value.trim();
    const rawUrl = imageUrl.value.trim();
    const file = imageFile.files?.[0];
    let image = '';

    if (rawUrl && !validImageUrl(rawUrl)) {
      formMessage.textContent = 'ပုံ URL မှန်ကန်မှုရှိမရှိ စစ်ဆေးပါ (https:// သို့မဟုတ် http://)။';
      imageUrl.focus();
      return;
    }
    if (file && !file.type.startsWith('image/')) {
      formMessage.textContent = 'ပုံဖိုင်အမျိုးအစားကိုသာ ရွေးပါ။';
      return;
    }
    if (file && file.size > MAX_FILE_SIZE) {
      formMessage.textContent = 'ပုံဖိုင် 1.5 MB ထက်ကြီးနေပါတယ်။ ပုံ URL သုံးပါ၊ ဒါမှမဟုတ် ပုံကိုသေးအောင်လုပ်ပြီး ထပ်ရွေးပါ။';
      return;
    }

    try {
      image = file ? await readAsDataUrl(file) : (validImageUrl(rawUrl) || '');
    } catch (error) {
      formMessage.textContent = error.message;
      return;
    }
    const items = loadMemories();
    items.unshift({ id: makeId(), title, date, caption, image, favorite: false, createdAt: new Date().toISOString() });
    if (!saveMemories(items)) return;
    form.reset();
    clearPreview();
    byId('date').value = localDateValue();
    render();
    showToast('မှတ်တမ်းကို သိမ်းပြီးပါပြီ။');
    byId('gallery').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  grid.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const items = loadMemories();
    const index = items.findIndex((item) => item.id === button.dataset.id);
    if (index < 0) return;
    if (button.dataset.action === 'favorite') items[index].favorite = !items[index].favorite;
    if (button.dataset.action === 'delete') {
      if (!window.confirm(`“${items[index].title || 'ဒီမှတ်တမ်း'}” ကို ဖျက်မှာ သေချာပါသလား?`)) return;
      items.splice(index, 1);
    }
    if (saveMemories(items)) render();
  });

  byId('favoritesFilter').addEventListener('click', (event) => {
    favoritesOnly = !favoritesOnly;
    event.currentTarget.setAttribute('aria-pressed', String(favoritesOnly));
    render();
  });
  byId('searchInput').addEventListener('input', render);
  imageUrl.addEventListener('input', updatePreview);
  imageFile.addEventListener('change', updatePreview);
  byId('removePreview').addEventListener('click', () => { imageFile.value = ''; imageUrl.value = ''; clearPreview(); });
  byId('lightboxClose').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && lightbox.open) lightbox.close(); });

  byId('exportButton').addEventListener('click', () => {
    const data = JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), memories: loadMemories() }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'chat-record-archive-backup.json';
      anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('Backup ဖိုင်ကို download လုပ်ပြီးပါပြီ။');
  });

  byId('importFile').addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const imported = Array.isArray(parsed) ? parsed : parsed.memories;
      if (!Array.isArray(imported) || !imported.every((item) => item && typeof item.title === 'string' && typeof item.caption === 'string')) {
        throw new Error('Backup ဖိုင်ပုံစံ မမှန်ပါ။');
      }
      const current = loadMemories();
      const existing = new Set(current.map((item) => item.id));
      const cleaned = imported.map((item) => {
        const oldId = typeof item.id === 'string' ? item.id : makeId();
        const id = existing.has(oldId) ? makeId() : oldId;
        existing.add(id);
        const image = typeof item.image === 'string' && (item.image.startsWith('data:image/') || validImageUrl(item.image)) ? item.image : '';
        return {
          id,
          title: item.title.slice(0, 90),
          date: typeof item.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item.date) ? item.date : '',
          caption: item.caption.slice(0, 500),
          image,
          favorite: Boolean(item.favorite),
          createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
        };
      });
      const merged = [...current, ...cleaned];
      if (!saveMemories(merged)) return;
      render();
      showToast(`${imported.length} ခုကို ပြန်ထည့်ပြီးပါပြီ။`);
    } catch (error) {
      showToast(error.message || 'Backup ကို ဖတ်မရပါ။');
    } finally {
      event.target.value = '';
    }
  });

  byId('date').value = localDateValue();
  render();
})();
