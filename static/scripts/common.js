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
  setActiveMenuItem(menuPoints, url);
});

setActiveMenuItem = (menuPoints, url) => {
  switch (url) {
    case '/':
      menuPoints.forEach((el) => {
        if (el.innerText === 'Главная') {
          el.classList.add('active');
        }
      });
      break;
    case '/service':
      menuPoints.forEach((el) => {
        if (el.innerText === 'Услуги') {
          el.classList.add('active');
        }
      });
      break;
    case '/car-parts':
      menuPoints.forEach((el) => {
        if (el.innerText === 'Запчасти') {
          el.classList.add('active');
        }
      });
      break;
    case '/corporate':
      menuPoints.forEach((el) => {
        if (el.innerText === 'Юр.лицам') {
          el.classList.add('active');
        }
      });
      break;
    case '/contacts':
      menuPoints.forEach((el) => {
        if (el.innerText === 'Контакты') {
          el.classList.add('active');
        }
      });
      break;
  }
};

function openMessenger(messenger, contact) {
  let link = '';

  switch (messenger) {
    case 'whatsapp':
      link = `https://wa.me/${contact}`;
      break;
    case 'viber':
      link = `viber://chat?number=%2B${contact}`;
      break;
    case 'telegram':
      link = `https://t.me/${contact}`;
      break;
  }

  if (link) {
    window.open(link);
  }
}

function openMessengerFromPopup(officeData) {
  const messenger = document.getElementById('messenger-argument').innerHTML;
  openMessenger(messenger, officeData[messenger]);
}
