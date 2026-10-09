const STORAGE_KEY = 'love-memory-gallery';

const defaultMemories = [
  {
    id: crypto.randomUUID(),
    title: 'Our favorite chat',
    date: '2025-09-14',
    caption: 'The message that made my heart skip a beat. You always know exactly how to make the day feel softer.',
    image:
      'https://i.ibb.co/0pxYdHhT/Screenshot-com-zhiliaoapp-musically.jpg',
    favorite: true,
  },
  {
    id: crypto.randomUUID(),
    title: 'Sweet little date',
    date: '2025-08-02',
    caption: 'The most simple evening turned into one of my favorite memories.',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    favorite: false,
  },
  {
    id: crypto.randomUUID(),
    title: 'Always smiling together',
    date: '2025-06-19',
    caption: 'Those laughs will always be one of the prettiest sounds in my life.',
    image:
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80',
    favorite: true,
  }
];

const form = document.getElementById('memoryForm');
const memoryGrid = document.getElementById('memoryGrid');
const momentCount = document.getElementById('momentCount');
const photoCount = document.getElementById('photoCount');
const favoriteCount = document.getElementById('favoriteCount');

function getMemories() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMemories));
    return [...defaultMemories];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultMemories];
  } catch (error) {
    return [...defaultMemories];
  }
}

function saveMemories(memories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

function formatDate(dateValue) {
  if (!dateValue) return 'Memories';

  const date = new Date(dateValue + 'T00:00:00');
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function updateStats(memories) {
  const favoriteTotal = memories.filter((memory) => memory.favorite).length;
  const photoTotal = memories.filter((memory) => memory.image).length;

  momentCount.textContent = memories.length;
  photoCount.textContent = photoTotal;
  favoriteCount.textContent = favoriteTotal;
}

function createMemoryCard(memory) {
  const article = document.createElement('article');
  article.className = 'memory-card';

  article.innerHTML = `
    <img src="${memory.image}" alt="${memory.title}" />
    <div class="card-content">
      <div class="memory-top">
        <h4>${memory.title}</h4>
        <span class="date-badge">${formatDate(memory.date)}</span>
      </div>
      <p>${memory.caption}</p>
      <div class="card-actions">
        <button class="icon-btn ${memory.favorite ? 'is-favorite' : ''}" data-action="favorite" data-id="${memory.id}">${memory.favorite ? '♥ Favorite' : '♡ Favorite'}</button>
        <button class="icon-btn" data-action="delete" data-id="${memory.id}">Delete</button>
      </div>
    </div>
  `;

  return article;
}

function renderMemories() {
  const memories = getMemories();
  memoryGrid.innerHTML = '';

  if (!memories.length) {
    memoryGrid.innerHTML = '<div class="empty-state">No memories yet. Save your first moment of love.</div>';
    updateStats([]);
    return;
  }

  memories.forEach((memory) => {
    memoryGrid.appendChild(createMemoryCard(memory));
  });

  updateStats(memories);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value.trim();
  const date = document.getElementById('date').value;
  const caption = document.getElementById('caption').value.trim();
  const urlInput = document.getElementById('imageUrl').value.trim();
  const fileInput = document.getElementById('imageFile').files[0];

  if (!title || !date || !caption) {
    return;
  }

  let image = urlInput || '';

  if (fileInput) {
    image = await readFileAsDataUrl(fileInput);
  }

  if (!image) {
    image = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80';
  }

  const memories = getMemories();
  memories.unshift({
    id: crypto.randomUUID(),
    title,
    date,
    caption,
    image,
    favorite: false,
  });

  saveMemories(memories);
  renderMemories();
  form.reset();
});

memoryGrid.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const { action, id } = button.dataset;
  const memories = getMemories();

  if (action === 'favorite') {
    const index = memories.findIndex((memory) => memory.id === id);
    if (index !== -1) {
      memories[index].favorite = !memories[index].favorite;
      saveMemories(memories);
      renderMemories();
    }
  }

  if (action === 'delete') {
    const filtered = memories.filter((memory) => memory.id !== id);
    saveMemories(filtered);
    renderMemories();
  }
});

renderMemories();
