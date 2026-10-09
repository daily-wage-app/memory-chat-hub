(() => {
  'use strict';

  const records = Array.from({ length: 10 }, (_, index) => ({
    title: `စကားဝိုင်းမှတ်တမ်း ${new Intl.NumberFormat('my-MM').format(index + 1)}`,
    caption: 'ပေးထားသော screenshot ကို မှတ်တမ်းအဖြစ် သိမ်းဆည်းထားသည်။',
    image: `assets/memories/${String(index + 1).padStart(2, '0')}.${index === 2 ? 'webp' : 'jpg'}`,
  }));
  const grid = document.getElementById('memoryGrid');
  const search = document.getElementById('searchInput');
  const lightbox = document.getElementById('lightbox');

  function openImage(record) {
    const image = document.getElementById('lightboxImage');
    image.src = record.image;
    document.getElementById('lightboxCaption').textContent = record.title;
    lightbox.showModal();
  }

  function render() {
    const query = search.value.trim().toLocaleLowerCase();
    const visible = records.filter((record) => `${record.title} ${record.caption}`.toLocaleLowerCase().includes(query));
    grid.replaceChildren();
    document.getElementById('resultLabel').textContent = `မှတ်တမ်း ${new Intl.NumberFormat('my-MM').format(visible.length)} ခု`;
    document.getElementById('momentCount').textContent = String(records.length);
    document.getElementById('photoCount').textContent = String(records.length);

    if (!visible.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      const title = document.createElement('strong');
      title.textContent = 'မှတ်တမ်းရှာမတွေ့ပါ';
      const message = document.createElement('p');
      message.textContent = 'အခြားစကားလုံးဖြင့် ရှာကြည့်ပါ။';
      empty.append(title, message);
      grid.append(empty);
      return;
    }

    visible.forEach((record) => {
      const card = document.createElement('article');
      card.className = 'memory-card';
      const photo = document.createElement('button');
      photo.type = 'button';
      photo.className = 'memory-photo';
      photo.setAttribute('aria-label', `${record.title} ပုံကို အပြည့်ကြည့်ရန်`);
      const image = document.createElement('img');
      image.src = record.image;
      image.alt = record.title;
      image.loading = 'lazy';
      image.addEventListener('error', () => {
        photo.replaceChildren(document.createTextNode('▧'));
        photo.disabled = true;
        photo.classList.add('photo-missing');
      }, { once: true });
      photo.append(image);
      photo.addEventListener('click', () => openImage(record));

      const body = document.createElement('div');
      body.className = 'memory-body';
      const date = document.createElement('div');
      date.className = 'memory-date';
      date.textContent = 'နေ့စွဲ မသတ်မှတ်ရသေး';
      const title = document.createElement('h3');
      title.className = 'memory-title';
      title.textContent = record.title;
      const caption = document.createElement('p');
      caption.className = 'memory-caption';
      caption.textContent = record.caption;
      const tag = document.createElement('span');
      tag.className = 'record-tag';
      tag.textContent = 'ဖတ်ရှုရန်သာ';
      body.append(date, title, caption, tag);
      card.append(photo, body);
      grid.append(card);
    });
  }

  search.addEventListener('input', render);
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
  render();
})();
