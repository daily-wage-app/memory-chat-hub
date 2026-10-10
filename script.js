(() => {
  'use strict';

  // The original ten screenshots were supplied on 9 October 2026 (UTC+7).
  const records = Array.from({ length: 10 }, (_, index) => ({
    image: `assets/memories/${String(index + 1).padStart(2, '0')}.${index === 2 ? 'webp' : 'jpg'}`,
    date: '2026-10-09',
  }));
  records.push({ image: 'assets/memories/11.jpg', date: '2026-10-10' });
  records.push({ image: 'assets/memories/12.jpg', date: '2026-10-10' });
  records.push({ image: 'assets/memories/13.jpg', date: '2026-10-10' });
  records.push({ image: 'assets/memories/14.jpg', date: '2026-10-10', time: '20:23:33' });
  records.push({ image: 'assets/memories/15.jpg', date: '2026-10-10', time: '20:27:24' });
  const grid = document.getElementById('memoryGrid');
  const lightbox = document.getElementById('lightbox');
  const numberFormat = new Intl.NumberFormat('my-MM');

  function toBurmese(value) {
    return String(value).replace(/[0-9]/g, (digit) => '၀၁၂၃၄၅၆၇၈၉'[Number(digit)]);
  }

  function formatDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return '';
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day, 12));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return '';
    const months = ['ဇန်နဝါရီ', 'ဖေဖော်ဝါရီ', 'မတ်', 'ဧပြီ', 'မေ', 'ဇွန်', 'ဇူလိုင်', 'ဩဂုတ်', 'စက်တင်ဘာ', 'အောက်တိုဘာ', 'နိုဝင်ဘာ', 'ဒီဇင်ဘာ'];
    return `${toBurmese(day)} ${months[month - 1]} ${toBurmese(year)}`;
  }

  function formatRecordDate(record) {
    const dateLabel = formatDate(record.date);
    if (!dateLabel || !record.time || !/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(record.time)) return dateLabel;
    return `${dateLabel} • ${toBurmese(record.time)} (UTC+07:00)`;
  }

  function openImage(record, index) {
    const image = document.getElementById('lightboxImage');
    image.src = record.image;
    image.alt = `Chat screenshot ${numberFormat.format(index + 1)}`;
    document.getElementById('lightboxCaption').textContent = formatRecordDate(record);
    lightbox.showModal();
  }

  function render() {
    grid.replaceChildren();
    document.getElementById('momentCount').textContent = String(records.length);
    document.getElementById('photoCount').textContent = String(records.length);

    records.forEach((record, index) => {
      const card = document.createElement('article');
      card.className = 'memory-card';
      const photo = document.createElement('button');
      photo.type = 'button';
      photo.className = 'memory-photo';
      photo.setAttribute('aria-label', `Chat screenshot ${numberFormat.format(index + 1)} ကို အပြည့်ကြည့်ရန်`);
      const image = document.createElement('img');
      image.src = record.image;
      image.alt = `Chat screenshot ${numberFormat.format(index + 1)}`;
      image.loading = 'lazy';
      image.addEventListener('error', () => {
        photo.replaceChildren(document.createTextNode('▧'));
        photo.disabled = true;
        photo.classList.add('photo-missing');
      }, { once: true });
      photo.append(image);
      photo.addEventListener('click', () => openImage(record, index));
      card.append(photo);

      const dateText = formatRecordDate(record);
      if (dateText) {
        const body = document.createElement('div');
        body.className = 'memory-body';
        const date = document.createElement('div');
        date.className = 'memory-date';
        date.textContent = dateText;
        body.append(date);
        card.append(body);
      }
      grid.append(card);
    });
  }

  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
  render();
})();
