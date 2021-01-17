document.getElementById('menu-toggler').addEventListener('click', () => {
  document.querySelector('ul.mobile-navbar').classList.toggle('active');
});

document.addEventListener('click', (e) => {
  let menu = !!document.querySelector('ul.mobile-navbar.active');
  if (e.target.id != 'menu-toggler' && menu) {
    document.querySelector('ul.mobile-navbar').classList.remove('active');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.pathname;
  console.log('url', url);

  //array of menu items
  const menuPoints = document.querySelectorAll('.desktop-navbar__item');
  console.log('menuPoints', menuPoints);
});

getActiveMenuItem = () => {
  switch (menuTitle) {
    case '/':
      const activeNode = menuPoints.forEach((el) => {
        el.innerText = 'Главная';
      });
  }
};
