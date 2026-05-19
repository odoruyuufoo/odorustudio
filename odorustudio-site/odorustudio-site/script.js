const menuButton = document.getElementById('menuButton');
const closeButton = document.getElementById('closeButton');
const sidebar = document.getElementById('sidebar');
const scrim = document.getElementById('scrim');
const pages = document.querySelectorAll('[data-page]');

function openMenu() {
  sidebar.classList.add('is-open');
  sidebar.setAttribute('aria-hidden', 'false');
  menuButton.setAttribute('aria-expanded', 'true');
  scrim.hidden = false;
  document.body.classList.add('menu-open');
}

function closeMenu() {
  sidebar.classList.remove('is-open');
  sidebar.setAttribute('aria-hidden', 'true');
  menuButton.setAttribute('aria-expanded', 'false');
  scrim.hidden = true;
  document.body.classList.remove('menu-open');
}

function showPage(route, shouldPush = true) {
  const nextRoute = route === 'thinkblank' ? 'thinkblank' : 'home';
  pages.forEach((page) => {
    page.hidden = page.dataset.page !== nextRoute;
  });
  closeMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (shouldPush) {
    const hash = nextRoute === 'home' ? '' : `#${nextRoute}`;
    history.pushState({ route: nextRoute }, '', `${location.pathname}${hash}`);
  }
}

menuButton.addEventListener('click', openMenu);
closeButton.addEventListener('click', closeMenu);
scrim.addEventListener('click', closeMenu);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.querySelectorAll('[data-route]').forEach((button) => {
  button.addEventListener('click', () => showPage(button.dataset.route));
});

window.addEventListener('popstate', () => {
  showPage(location.hash.replace('#', '') || 'home', false);
});

showPage(location.hash.replace('#', '') || 'home', false);
