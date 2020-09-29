// CARD PAGE
// взять массив card-page__photos_img

// add Item To Cart From Card Page
const addToCartFromCardPage = document.querySelector("#addToCartFromCardPage");
addToCartFromCardPage.addEventListener('click', addToCartFromCardPageClicked)

function addToCartFromCardPageClicked(event) { 
  var button = event.target;
  var catalogPageSide = button.parentElement.parentElement;
  var title = catalogPageSide.querySelector(".card-page__info_heading").innerHTML;
  var itemCount = catalogPageSide.querySelector('#points').value;
  var imageSrc = catalogPageSide.parentElement.querySelector('.card-page__photos_big').children[0].children[0].srcset;
  addItemToCart(title, imageSrc, itemCount); // Берем параметры у карточки товара: имя и ссылка на картинку

  // открытие корзины
  cart.style.display = "flex";
  FX.fadeIn(cart, {
    duration: fadeTime,
    complete: function () {}
  });
}

// УЗНАТЬ ЦЕНУ

whatsThePriceButton.addEventListener('click', function (event) {
  event.preventDefault();
  whatsThePriceModal.style.display = "flex";
  FX.fadeIn(whatsThePriceModal, {
    duration: fadeTime,
    complete: function () {}
  });
});

whatsThePriceCloseModal.addEventListener('click', function (event) {
  event.preventDefault();
  FX.fadeOut(whatsThePriceModal, {
    duration: fadeTime,
    complete: function () {
      whatsThePriceModal.style.display = "";
    }
  });
});

whatsThePriceModalOverlay.addEventListener('click', function (event) {
  event.preventDefault();
  FX.fadeOut(whatsThePriceModal, {
    duration: fadeTime,
    complete: function () {
      whatsThePriceModal.style.display = "";
    }
  });
});

