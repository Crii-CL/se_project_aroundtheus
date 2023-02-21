import { openPopup } from "./utils.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreview());
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDelCard);
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLikeBtn);
  }

  _handleDelCard = () => {
    this._element.remove();
  };

  _handleLikeBtn() {
    this._likeBtn.classList.toggle("card__like-button_active");
  }

  _handlePreview() {
    const modalPreview = document.querySelector(".modalPreview");
    document.querySelector("#modal-preview-image").src = this._link;
    document.querySelector("#modal-preview-title").textContent = this._name;
    openPopup(modalPreview);
  }

  renderCard() {
    this._element = this._getTemplate();

    this._likeBtn = this._element.querySelector(".card__like-button");

    this._element.querySelector(".card__image").src = this._link;

    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
