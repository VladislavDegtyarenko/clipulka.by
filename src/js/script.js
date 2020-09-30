document.addEventListener('DOMContentLoaded', function () {

  // splidejs
  new Splide('.splide', {
    perPage: 4,
    perMove: 4,
    rewindSpeed: 1500,
    arrows: true,
    rewind: true,
    pagination: false,
    lazyLoad: 'nearby',
    classes: {
      arrows: 'new__controls',
      arrow: 'new__controls_button',
      prev: 'new__controls_button-left',
      next: 'new__controls_button-right',
    },
    breakpoints: {
      991: {
        perPage: 3,
        perMove: 3
      },
      767: {
        perPage: 2,
        perMove: 2
      },
      480: {
        perPage: 1,
        perMove: 1
      },
    }
  }).mount();
});


const hamburgerMenu = document.querySelector(".header__hamburger"),
  navMenu = document.querySelector(".nav"),
  navOverlay = document.querySelector("#navOverlay"),
  contactsOverlay = document.querySelector("#contactsOverlay"),
  contactsButton = document.querySelectorAll(".contacts_button"),
  contactsMenu = document.querySelector(".contacts"),
  contactsClose = document.querySelector(".contacts__close"),
  promoDropdownInput = document.querySelectorAll(".promo__dropdown_input"),
  promoDropdownMenu = document.querySelectorAll(".promo__dropdown_menu"),
  promoDropdownItem = document.querySelectorAll(".promo__dropdown_item"),
  cartOpenButton = document.querySelector("#cartOpenButton"),
  cart = document.querySelector(".cart"),
  cartOverlay = document.querySelector("#cartOverlay"),
  cartCloseButton = document.querySelector(".cart__close"),
  cartGoToCatalogButton = document.querySelector("#goToCatalog"),
  cartEmptyGoToCatalogButton = document.querySelector(".cart__empty"),
  cartItems = document.querySelectorAll(".cart__item"),
  cartContunueShoppingButton = document.querySelector("#cartContinueShopping"),
  removeCartItemButtons = document.querySelectorAll(".cart__item_remove"),
  whatsThePriceButton = document.querySelector('.card-page__button-price'),
  whatsThePriceModal = document.querySelector(".whatsThePrice"),
  whatsThePriceModalOverlay = document.querySelector("#whatsThePriceOverlay"),
  whatsThePriceCloseModal = document.querySelector(".whatsThePrice__close"),
  fadeTime = 700;




// Nav Active Links and Page Title on Mobile Screens

var path = window.location.pathname;
var page = path.split("/").pop();
var pageTitleOnMobile = document.querySelector(".pagetitle");

switch (page) {
  case 'index.html': // если открыта страница index.html
    var navItem = document.getElementById("index");
    navItem.classList.add("nav__item-active");
    pageTitleOnMobile.innerHTML = navItem.innerHTML;
    break;
  case 'how.html': // если открыта страница index.html
    var navItem = document.getElementById("how");
    navItem.classList.add("nav__item-active");
    pageTitleOnMobile.innerHTML = navItem.innerHTML;
    break;
  case 'send.html': // если открыта страница index.html
    var navItem = document.getElementById("send");
    navItem.classList.add("nav__item-active");
    pageTitleOnMobile.innerHTML = navItem.innerHTML;
    break;
  case 'contacts.html': // если открыта страница index.html
    var navItem = document.getElementById("contacts");
    navItem.classList.add("nav__item-active");
    pageTitleOnMobile.innerHTML = navItem.innerHTML;
    break;
  case 'about.html': // если открыта страница index.html
    var navItem = document.getElementById("about");
    navItem.classList.add("nav__item-active");
    pageTitleOnMobile.innerHTML = navItem.innerHTML;
    break;
  case 'order.html': // на странице оформления заказа
    document.querySelector('.cartButton').style.display = 'none'; // скрываем корзину в шапке
  default:
    pageTitleOnMobile.innerHTML = "";
}



/* Disable Hover on Touch Devices */
function hasTouch() {
  return 'ontouchstart' in document.documentElement ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { // remove all the :hover stylesheets
  try { // prevent exception on browsers not supporting DOM styleSheets properly
    for (var si in document.styleSheets) {
      var styleSheet = document.styleSheets[si];
      if (!styleSheet.rules) continue;

      for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
        if (!styleSheet.rules[ri].selectorText) continue;

        if (styleSheet.rules[ri].selectorText.match(':hover')) {
          styleSheet.deleteRule(ri);
        }
      }
    }
  } catch (ex) {}
}



/* Fade In & Out Function */
(function () {
  var FX = {
    easing: {
      linear: function (progress) {
        return progress;
      },
      quadratic: function (progress) {
        return Math.pow(progress, 2);
      },
      swing: function (progress) {
        return 0.5 - Math.cos(progress * Math.PI) / 2;
      },
      circ: function (progress) {
        return 1 - Math.sin(Math.acos(progress));
      },
      back: function (progress, x) {
        return Math.pow(progress, 2) * ((x + 1) * progress - x);
      },
      bounce: function (progress) {
        for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
          if (progress >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
          }
        }
      },
      elastic: function (progress, x) {
        return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
      }
    },
    animate: function (options) {
      var start = new Date;
      var id = setInterval(function () {
        var timePassed = new Date - start;
        var progress = timePassed / options.duration;
        if (progress > 1) {
          progress = 1;
        }
        options.progress = progress;
        var delta = options.delta(progress);
        options.step(delta);
        if (progress == 1) {
          clearInterval(id);
          options.complete();
        }
      }, options.delay || 10);
    },
    fadeOut: function (element, options) {
      var to = 1;
      this.animate({
        duration: options.duration,
        delta: function (progress) {
          progress = this.progress;
          return FX.easing.swing(progress);
        },
        complete: options.complete,
        step: function (delta) {
          element.style.opacity = to - delta;
        }
      });
    },
    fadeIn: function (element, options) {
      var to = 0;
      this.animate({
        duration: options.duration,
        delta: function (progress) {
          progress = this.progress;
          return FX.easing.swing(progress);
        },
        complete: options.complete,
        step: function (delta) {
          element.style.opacity = to + delta;
        }
      });
    }
  };
  window.FX = FX;
})()



/* Hamburger Menu  */
hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('header__hamburger-open');
  navMenu.classList.toggle('nav-active');
  navOverlay.classList.toggle('overlay-active');
  document.body.classList.toggle('bodyNoScroll');
});

navOverlay.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('header__hamburger-open');
  navMenu.classList.toggle('nav-active');
  navOverlay.classList.toggle('overlay-active');
  document.body.classList.toggle('bodyNoScroll');
});



// Open Contacts Menu

for (var i = 0; i < contactsButton.length; i++) {
  var self = contactsButton[i];

  self.addEventListener('click', function (event) {
    event.preventDefault();

    contactsMenu.classList.toggle("contacts-active");
    contactsOverlay.classList.toggle('overlay-active');

    document.body.classList.toggle('bodyNoScroll');
  }, false);
}

// Overlay and "X" Closes Contacts Menu
contactsClose.addEventListener('click', function () {
  contactsMenu.classList.toggle("contacts-active");
  contactsOverlay.classList.toggle('overlay-active');

  document.body.classList.toggle('bodyNoScroll');
});

contactsOverlay.addEventListener('click', function () {
  contactsMenu.classList.toggle("contacts-active");
  contactsOverlay.classList.toggle('overlay-active');

  document.body.classList.toggle('bodyNoScroll');

});



// Cart

cartOpenButton.addEventListener('click', function (event) {
  event.preventDefault();
  cart.style.display = "flex";
  document.body.style.pointerEvents = "none";
  FX.fadeIn(cart, {
    duration: fadeTime,
    complete: function () {
      document.body.style.pointerEvents = "";

    }
  });
});

cartCloseButton.addEventListener('click', function (event) {
  event.preventDefault();
  document.body.style.pointerEvents = "none";
  FX.fadeOut(cart, {
    duration: fadeTime,
    complete: function () {
      cart.style.display = "";
      document.body.style.pointerEvents = "";
    }
  });
});

cartOverlay.addEventListener('click', function (event) {
  event.preventDefault();
  document.body.style.pointerEvents = "none";
  FX.fadeOut(cart, {
    duration: fadeTime,
    complete: function () {
      cart.style.display = "";
      document.body.style.pointerEvents = "";
    }
  });
});

cartEmptyGoToCatalogButton.addEventListener('click', function (event) {
  //event.preventDefault();
    document.body.style.pointerEvents = "none";
    FX.fadeOut(cart, {
      duration: fadeTime,
      complete: function () {
        cart.style.display = "";
        document.body.style.pointerEvents = "";
      }
    });
});

if (cartGoToCatalogButton) {
  cartGoToCatalogButton.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = 'index.html'
  });
}

cartContunueShoppingButton.addEventListener('click', function (event) {
  event.preventDefault();
  document.body.style.pointerEvents = "none";
  FX.fadeOut(cart, {
    duration: fadeTime,
    complete: function () {
      cart.style.display = "";
      document.body.style.pointerEvents = "";
    }
  });
});




// Cart Items Counter // Increment // Decrement
const cartOrderButton = document.querySelector('#buttonCartOrder');

//var cartItemsCounter = document.querySelectorAll('.cart__item').length;
// document.querySelector(".cart_counter").innerHTML = cartItemsCounter; // количетсво наименований (не то)

var counterOnCartIcon = 0;

function updateCounterOnCartIcon() {
  var counter = 0;

  for (var i = 0; i < localStorage.length; i++) {
    var value = localStorage.getItem(localStorage.key(i));
    var value_deserialized = JSON.parse(value);
    counter = counter + parseInt(value_deserialized[1]);
  }
  counterOnCartIcon = counter;
  document.querySelector(".cart_counter").innerHTML = counterOnCartIcon;
};
updateCounterOnCartIcon();

function showHideCounterOnCartIcon() {
  if (counterOnCartIcon > 0) {
    document.querySelector(".cart_counter").style.display = 'block';
  } else {
    document.querySelector(".cart_counter").style.display = '';
  }
};
showHideCounterOnCartIcon();

// If Shopping Cart Is Empty
function cartEmptyCheck() {
  if (counterOnCartIcon == 0) {
    document.querySelector('.cart__subheading').style.display = 'none';
    document.querySelector('.cart__items').style.display = 'none';
    document.querySelector('.cart__buttons').style.display = 'none';
    document.querySelector('.cart__empty').style.display = 'flex';
  } else {
    document.querySelector('.cart__subheading').style.display = '';
    document.querySelector('.cart__items').style.display = '';
    document.querySelector('.cart__buttons').style.display = '';
    document.querySelector('.cart__empty').style.display = '';
  }
};
cartEmptyCheck();

// If itemCount is zero or negative then hide counter + update localStorage
function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateQuantityInLocalStorage(event);
  updateCounterOnCartIcon(event);

}

/* 
function incrementCartItemsCounter() {
  counterOnCartIcon++;
  document.querySelector(".cart_counter").innerHTML = counterOnCartIcon;
  cartEmptyCheck();
  showHideCounterOnCartIcon();
}

function decrementCartItemsCounter() {
  counterOnCartIcon--;
  document.querySelector(".cart_counter").innerHTML = cartItemsCounter;
  cartEmptyCheck();
  showHideCounterOnCartIcon();
}
 */

function cartInitFromLocalStorage() {
  if (!(localStorage.length === 0)) {
    // перебрать все ключи
    for (var i = 0; i < localStorage.length; i++) {
      // console.log("Cart Item #" + i);
      var key = localStorage.key(i);
      // console.log(key);

      var value = localStorage.getItem(localStorage.key(i));
      var value_deserialized = JSON.parse(value);
      // console.log(value_deserialized[0]);
      // console.log(value_deserialized[1]);
      // console.log(" ");

      var title = key;
      var imageSrc = value_deserialized[0];
      var itemCount = value_deserialized[1];
      addItemToCart(title, imageSrc, itemCount);
    }
    cartEmptyCheck();
    showHideCounterOnCartIcon();
    updateCounterOnCartIcon();
    // передать в функцию
    // 
  }
}
cartInitFromLocalStorage();




// add item to localStorage
function addItemToLocalStorage(title, imageSrc, itemCount) {
  var cartItemObj = [imageSrc, itemCount];
  // console.log(cartItemObj); // (2) ["img/catalog/D057.jpg", "1"]

  localStorage.setItem(title, JSON.stringify(cartItemObj));
  // console.log(localStorage); // Storage {Втулка резиновая BMW - D057: "["img/catalog/D057.jpg","1"]", length: 1}
}

function removeFromLocalStorage(event) {
  var remove = event.target;
  // console.log(remove); // <button class="button cart__item_remove">×</button>
  var itemTitle = remove.parentElement.parentElement.querySelector('.cart__item_title').innerText;
  // console.log(itemTitle); // название товара
  if (localStorage.getItem(itemTitle)) {
    localStorage.removeItem(itemTitle)
  }

  if (document.querySelector('.order')) {
    if (document.querySelector('.cart__items').innerHTML === "") {
      window.location.href = "index.html"
    }
  }
}

function updateQuantityInLocalStorage(event) {
  var counter = event.target.value; // counter on cartItem in Cart Modal Window

  var cartItemTitle = event.target.parentElement.parentElement.querySelector('.cart__item_title').innerText; // cart title

  if (localStorage.getItem(cartItemTitle)) {
    var itemInStorage_deserialized = JSON.parse(localStorage.getItem(cartItemTitle)); // taking appropriate item from localStorage and converting back to an object
    itemInStorage_deserialized[1] = counter; // updating its counter in object
    itemInStorage_serialized = JSON.stringify(itemInStorage_deserialized) // back to string form to export to localStorage
    localStorage.setItem(cartItemTitle, itemInStorage_serialized) // update current value of appropriate key in localStorage
  }
}





// remove Cart Item in Cart Modal Window
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  removeFromLocalStorage(event);
  updateCounterOnCartIcon();
  showHideCounterOnCartIcon();
  cartEmptyCheck();

}

for (var i = 0; i < removeCartItemButtons.length; i++) {
  var button = removeCartItemButtons[i];
  button.addEventListener('click', removeCartItem);
}




// Add Item To Cart
const addToCartButtons = document.querySelectorAll(".catalog__card_cart");
for (var i = 0; i < addToCartButtons.length; i++) {
  var button = addToCartButtons[i];
  button.addEventListener('click', addToCartClicked) // отслеживаем клик у кнопок "Добавить в корзину"
}

function addToCartClicked(event) {
  var button = event.target;
  var catalogItem = button.parentElement.parentElement;
  var title = catalogItem.querySelector(".catalog__card_text").querySelector(".catalog__card_descr").innerHTML;
  var itemCount = catalogItem.querySelector('.catalog__card_buttons').querySelector('.catalog__card_counter').value;
  var imageSrc = catalogItem.querySelector(".catalog__card_img").children[0].src;
  addItemToCart(title, imageSrc, itemCount); // Берем параметры у карточки товара: имя и ссылка на картинку

  // открытие корзины
  cart.style.display = "flex";
  FX.fadeIn(cart, {
    duration: fadeTime,
    complete: function () {}
  });
}

function addItemToCart(title, imageSrc, itemCount) {
  var cartItem = document.createElement('div'); // создаем блок для дальнейшего его добавления в корзину
  cartItem.classList.add('cart__item'); // добавляем этому блоку стили добавленного товара

  var cartItems = document.querySelector('.cart__items'); // проверка "добавлен ли уже такой товар в корзину"
  var cartItemNames = cartItems.querySelectorAll('.cart__item_title');
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('Этот товар уже в корзине')
      return
    }
  }

  var cartItemContent = `
  <div class="cart__item_img">
    <img src="${imageSrc}" alt="">
  </div>
  <div class="cart__item_title">${title}</div>
  <div class="cart__item_buttons">
    <input type="number" value="${itemCount}" min="1" step="1" class="cart__item_quantity">
    <button class="button cart__item_remove">&times;</button>
  </div>`; // HTML единицы товара в корзине (контент)
  cartItem.innerHTML = cartItemContent; // добавляем контент как "внутренний HTML" к созданному div'у
  cartItems.appendChild(cartItem); // подставляем созданный div с его контентом В НАЧАЛО обертки cart__items
  
  cartItem.querySelector('.cart__item_buttons').querySelector('.cart__item_quantity').addEventListener('change', quantityChanged); // >=1
  cartItem.querySelector('.cart__item_buttons').querySelector('.cart__item_remove').addEventListener('click', removeCartItem)
  cartItem.querySelector('.cart__item_buttons').querySelector('.cart__item_remove').addEventListener('click', removeFromLocalStorage);

  addItemToLocalStorage(title, imageSrc, itemCount);
  updateCounterOnCartIcon(); // Обновим счетчик над иконкой корзины
  showHideCounterOnCartIcon(); // скрыть счетчик кол-ва товара в корзине, если корзина пустая
  cartEmptyCheck();
}







// Фильтры

var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("promo__dropdown");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /*when an item is clicked, update the original select box,
      and the selected item:*/
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /*when the select box is clicked, close any other select boxes,
    and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}


function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);








// COUNTER на каждой карточке товара в каталоге
function plus(el) {
  el.parentNode.children[1].value++;
  if (el.parentNode.children[1].value > 99) {
    el.parentNode.children[1].style.width = '36px';
  } else {
    el.parentNode.children[1].style.width = '';
  }
}

function minus(el) {
  if (el.parentNode.children[1].value > 1) {
    el.parentNode.children[1].value--
  }
  if (el.parentNode.children[1].value > 99) {
    el.parentNode.children[1].style.width = '36px';
  } else {
    el.parentNode.children[1].style.width = '';
  }
}