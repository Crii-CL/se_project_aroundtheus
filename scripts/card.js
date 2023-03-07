import { handleImageClick } from "./index.js";

export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._handleImageClick = handleImageClick;

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
    this._cardImg.addEventListener("click", () => this._handlePreview());
    this._cardDelBtn.addEventListener("click", this._handleDelCard);
    this._likeBtn.addEventListener("click", this._handleLikeBtn);
  }

  _handleDelCard = () => {
    this._element.remove();
  };

  _handleLikeBtn = () => {
    this._likeBtn.classList.toggle("card__like-button_active");
  };

  _handlePreview() {
    // const modalPreviewImage = document.querySelector("#modal-preview-image");
    // const modalPreviewTitle = document.querySelector("#modal-preview-title");

    // modalPreviewImage.src = this._link;
    // modalPreviewImage.alt = `Photo of ${this._name}`;
    // modalPreviewTitle.textContent = this._name;
    handleImageClick();

    //implement handleImageClick()
  }

  renderCard() {
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector(".card__like-button");
    this._cardImg = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardDelBtn = this._element.querySelector(".card__delete-button");

    this._cardImg.src = this._link;
    this._cardImg.alt = `Photo of ${this._name}`;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
