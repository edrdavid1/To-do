const GifPanel = () => {
  const div = document.createElement('div');
  div.className = 'gif-panel';

  const gifPath = localStorage.getItem('selectedGif') || '/mygif1.gif';

  const img = document.createElement('img');
  img.src = gifPath;
  img.alt = 'gif';
  img.style.maxWidth = '100%';
  img.style.maxHeight = '100%';
  img.style.borderRadius = '12px';
  div.appendChild(img);

  return div;
};

export default GifPanel; 