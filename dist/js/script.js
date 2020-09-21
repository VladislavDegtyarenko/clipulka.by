const hamburgerMenu = document.querySelector(".header__hamburger"),
  navMenu = document.querySelector(".nav"),
  navOverlay = document.querySelector("#navOverlay"),
  contactsOverlay = document.querySelector("#contactsOverlay"),
  contactsButton = document.querySelectorAll(".contacts_button"),
  contactsMenu = document.querySelector(".contacts"),
  contactsClose = document.querySelector(".contacts__close"),
  promoDropdownInput = document.querySelectorAll(".promo__dropdown_input"),
  promoDropdownMenu = document.querySelectorAll(".promo__dropdown_menu"),
  promoDropdownItem = document.querySelectorAll(".promo__dropdown_item");


// Prevent Body Scroll
function bodyNoScroll() {
  navMenu.classList.contains('nav-active') ?
    document.body.style = "overflow-y:hidden; position: relative; margin-right: var(--widthReflow);" :
    document.body.style = ""
}


hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('header__hamburger-open');
  navMenu.classList.toggle('nav-active');
  navOverlay.classList.toggle('overlay-active');

  bodyNoScroll();
});

navOverlay.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('header__hamburger-open');
  navMenu.classList.toggle('nav-active');
  navOverlay.classList.toggle('overlay-active');

  bodyNoScroll();
});


// Open Contacts Menu

for (var i = 0; i < contactsButton.length; i++) {
  var self = contactsButton[i];

  self.addEventListener('click', function (event) {
    event.preventDefault();

    contactsMenu.classList.toggle("contacts-active");
    contactsOverlay.classList.toggle('overlay-active');

    bodyNoScroll();
  }, false);
}

// Overlay and "X" Closes Contacts Menu
contactsClose.addEventListener('click', function () {
  contactsMenu.classList.toggle("contacts-active");
  contactsOverlay.classList.toggle('overlay-active');

  bodyNoScroll();
});

contactsOverlay.addEventListener('click', function () {
  contactsMenu.classList.toggle("contacts-active");
  contactsOverlay.classList.toggle('overlay-active');

  bodyNoScroll();
});









// hide Dropdown Menu function
function hideDropdownMenuFunction() {
  for (var i = 0; i < promoDropdownMenu.length; i++) {
    promoDropdownMenu[i].classList.remove("promo__dropdown_menu-show");
  }
}



// Toggle Show i-th (appropriate) Dropdown Menu
function toggleDropdownMenuFunction(i) {
  promoDropdownMenu[i].classList.toggle("promo__dropdown_menu-show");
}

for (let i = 0; i < promoDropdownInput.length; i++) {
  promoDropdownInput[i].addEventListener('click', function () {
    hideDropdownMenuFunction();
    toggleDropdownMenuFunction(i);
  })
}





// Dropdown Menu Item (tag a) onclick function
function selectFromList(elem) {
  // отслеживаем через дата-атрибут onclick
  // берем текст из кликнутого элемента
  // делаем замену значения у поля ввода на содержимое кликнутого элемента из выпадающего списка
  /* document.getElementById("myInput").value = elem.innerHTML; */

  // закрываем меню
  /* hideDropdownMenuFunction(); */

  elem.parentNode.classList.add('something');

}



// для каждого кликнутого promoDropdownItem
for (let j = 0; j < promoDropdownItem.length; j++) {

  // отслеживаем клик
  promoDropdownItem[j].addEventListener('click', function (j) {

    // подымаемся на уровень выше - parentNode
    /* console.log(promoDropdownItem[j].parentNode.nodeName); */

    // Определяем какой по счету это promoDropdownItem

    // Берем i

    // Берем i-й promoDropdownInput

    // делаем замену value у input
    /* document.getElementById("myInput").value = elem.innerHTML; */

  })
}












function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = promoDropdownMenu;
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}




// CARD PAGE
// взять массив card-page__photos_img
const cardPageImages = document.querySelectorAll(".card-page__photos_img"),
cardpageImageBig = document.querySelector(".card-page__photos_big");


cardpageImageBig.children[0].src = cardPageImages[0].children[0].src;

// для каждого изображения
for (let i = 0; i < cardPageImages.length; i++) {

  cardPageImages[i].addEventListener('click', function() {
    console.log(cardPageImages[i]);

    // брать src у маленького изображения
    var smallImgSrc = cardPageImages[i].children[0].src;

    // подставлять в большое
    cardpageImageBig.children[0].src = smallImgSrc;

  });
}


// УЗНАТЬ ЦЕНУ

const whatsThePriceButton = document.querySelector('.card-page__button-price');
const socialButtons = document.querySelector('.card-page__social');

whatsThePriceButton.addEventListener('click', () => {
  socialButtons.classList.add("card-page__social-active")
});




// COUNTER на каждой карточке

// собираем все catalog__card_buttons
/* const catalogCardButtons = document.querySelectorAll(".catalog__card_buttons");


for (let i = 0; i < catalogCardButtons.length; i++) {

} */