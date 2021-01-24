document.getElementById('menu-toggler').addEventListener('click', () => {
  document.querySelector('ul.mobile-navbar').classList.toggle('active');
  document.querySelector('ul.mobile-navbar.active > li > .services').classList.remove('active');
});

document.addEventListener('click', (e) => {
  const menu = !!document.querySelector('ul.mobile-navbar.active');
  const serviceItem = document.querySelector('ul.mobile-navbar.active > li > span');

  if (e.target.id != 'menu-toggler' && e.target != serviceItem && menu) {
    document.querySelector('ul.mobile-navbar').classList.remove('active');
  }

  if (e.target === serviceItem) {
    document.querySelector('ul.mobile-navbar.active > li > .services').classList.toggle('active');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.pathname;

  //array of menu items
  const menuPoints = document.querySelectorAll('.desktop-navbar__item');
});

// window.onscroll = function () {
//   const header = document.querySelector('header');
//   const headerOffset = header.offsetTop;

//   console.log('scroll');
//   if (window.pageYOffset >= headerOffset) {
//     header.classList.add('sticky');
//   } else {
//     header.classList.remove('sticky');
//   }
// };

getActiveMenuItem = () => {
  switch (menuTitle) {
    case '/':
      const activeNode = menuPoints.forEach((el) => {
        el.innerText = 'Главная';
      });
  }
};
