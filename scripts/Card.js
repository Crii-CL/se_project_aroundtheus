const modalPreview = document.querySelector("#modal-preview");
const modalPreviewImage = document.querySelector("#modal-preview-image");
const modalPreviewTitle = document.querySelector("#modal-preview-title");

function closeByEscape(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
    console.log("it worked");
  }
}

function handleOverlay(e) {
  if (e.target.classList.contains("modal_opened")) {
    closePopup(e.target);
  }
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
  document.removeEventListener("mousedown", handleOverlay);
}
// If a tutor sees these top blocks of code, they are there because they were there in the videos.
//I am not completely sure if those are the required blocks for this area but I'd appreciate if you could double check.

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
      .addEventListener("click", () => this._handlePreview);
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDelBtn);
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeBtn);
  }
  _handleDelBtn(e) {
    const card = e.target.closest("#card");
    card.remove();
  }

  _handleLikeBtn(e) {
    e.target.classList.toggle("card__like-button_active");
  }

  _handlePreview() {
    this._element.querySelector(
      "#modal-preview-image"
    ).src = `url(${this._link})`;
    this._element.querySelector("#modal-preview-title").textContent =
      this._name;
  }

  renderCard() {
    this._element = this._getTemplate();

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;

    this._element.querySelector("#modal-preview-image").textContent =
      this._name;

    this._element.querySelector("card__title").textContent = this._name;

    this._setEventListeners();
    console.log(this._element);
  }
}

export default Card;
