class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardDelBtn
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDelButton);
    this._cardLikeBtn
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLikeButton);
    this._cardImageEl
      .querySelector(".card__image")
      .addEventListener("click", () => {
        handleImagePreview(cardData);
        openPopup(modalPreview);
      });
  }

  _handleDelBtn(e) {
    const card = e.target.closest("#card");
    card.remove();
  }

  _handleLikeBtn(e) {
    e.target.classList.toggle("card__like-button_active");
  }

  getView() {
    const template = this._getTemplate;
    this._setEventListeners();
  }
}

export default Card;

// It takes card data — text and a link to the image — and a template element selector as parameters into the constructor.
// It has private methods for working with markup and adding event listeners.
// It has private methods for each event handler.
// It has one public method that returns a fully functional card element populated with data.
