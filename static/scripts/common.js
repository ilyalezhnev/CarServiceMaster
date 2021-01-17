document.getElementById('menu-toggler').addEventListener('click', () => {
  document.querySelector('ul.mobile-navbar').classList.toggle('active');
});

document.addEventListener('click', (e) => {
  let menu = !!document.querySelector('ul.mobile-navbar.active');
  if (e.target.id != 'menu-toggler' && menu) {
    document.querySelector('ul.mobile-navbar').classList.remove('active');
  }
});
