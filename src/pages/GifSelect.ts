const GIFS = ['/mygif.gif', '/mygif1.gif', '/mygif2.gif', '/mygif3.gif', '/mygif4.gif', '/mygif5.gif', '/mygif6.gif', '/mygif7.gif', '/mygif8.gif', '/mygif9.gif', '/mygif10.gif', '/mygif11.gif', '/mygif12.gif',];
const ICON_BASE_PATH = '/icon/';

const getActionIconPath = (name: string) => {
  return ICON_BASE_PATH + name + '.svg';
};

const GifSelect = () => {
  const container = document.createElement('div');
  container.className = 'gif-select-container';

  const title = document.createElement('h2');
  title.textContent = 'Выберите гифку для главного экрана';
  title.style.fontFamily = 'Orbitron, sans-serif';
  title.style.color = '#836FFF';
  title.style.textAlign = 'center';
  container.appendChild(title);

  const grid = document.createElement('div');
  grid.style.display = 'flex';
  grid.style.flexWrap = 'wrap';
  grid.style.justifyContent = 'center';
  grid.style.gap = '24px';
  grid.style.margin = '32px 0';

  GIFS.forEach(path => {
    const wrapper = document.createElement('div');
    wrapper.style.border = '2px solid #836FFF';
    wrapper.style.borderRadius = '0px';
    wrapper.style.padding = '8px';
    wrapper.style.background = 'rgba(255,255,255,0.05)';
    wrapper.style.cursor = 'pointer';
    wrapper.style.transition = 'box-shadow 0.2s, border 0.2s';
    wrapper.onmouseenter = () => {
      wrapper.style.border = '2px solid #fff';
    };
    wrapper.onmouseleave = () => {
      wrapper.style.boxShadow = 'none';
      wrapper.style.border = '2px solid #836FFF';
    };
    const img = document.createElement('img');
    img.src = path;
    img.alt = 'gif';
    img.style.width = '120px';
    img.style.height = '120px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '0px';
    wrapper.appendChild(img);
    wrapper.onclick = () => {
      localStorage.setItem('selectedGif', path);
      window.location.hash = '';
    };
    grid.appendChild(wrapper);
  });

  container.appendChild(grid);

  const backBtn = document.createElement('button');
  backBtn.textContent = 'Назад';
  backBtn.style.margin = '0 auto';
  backBtn.style.display = 'block';
  backBtn.style.padding = '8px 24px';
  backBtn.style.borderRadius = '0px';
  backBtn.style.border = '2px solid #836FFF';
  backBtn.style.background = 'var(--darker-bg)';
  backBtn.style.color = '#836FFF';
  backBtn.style.cursor = 'pointer';
  backBtn.style.fontFamily = 'Share Tech Mono, monospace';
  backBtn.style.fontSize = '1em';
  backBtn.style.boxShadow = 'none';
  backBtn.style.transition = 'background 0.2s, color 0.2s, border 0.2s';
  backBtn.style.textTransform = 'uppercase';
  backBtn.style.letterSpacing = '2px';
  backBtn.onmouseenter = () => {
    backBtn.style.background = '#836FFF22';
    backBtn.style.color = '#fff';
    backBtn.style.border = '2px solid #fff';
  };
  backBtn.onmouseleave = () => {
    backBtn.style.color = '#836FFF';
    backBtn.style.border = '2px solid #836FFF';
    backBtn.style.background = 'var(--darker-bg)';
  };
  backBtn.onclick = () => {
    window.location.hash = '';
  };
  container.appendChild(backBtn);

  return container;
};

export default GifSelect; 
