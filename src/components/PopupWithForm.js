import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit, loadingButtonText }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._formInputs = this._popupForm.querySelectorAll(".modal__form-input");
    this._submitBtn = this._popupElement.querySelector(".modal__form-button");
    this._buttonText = this._submitBtn.textContent;
    this._handleFormSubmit = handleFormSubmit;
    this._loadingButtonText = loadingButtonText;
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this._handleFormSubmit(this._getInputValues()).then(() => {
      this.close();
    });
  };

  _getInputValues() {
    const inputValues = {};

    this._formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  showLoading() {
    this._submitBtn.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._submitBtn.textContent = this._buttonText;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._popupForm.removeEventListener("submit", this._handleSubmit);
  }
}

// export default class PopupWithForm extends Popup {
//   constructor(popupSelector, handleFormSubmit) {
//     super({ popupSelector });
//     this._popupForm = this._popupElement.querySelector(".modal__form");
//     this._formInputs = this._popupForm.querySelectorAll(".modal__form-input");
//     this._handleFormSubmit = handleFormSubmit;
//   }

//   _handleSubmit = (e) => {
//     e.preventDefault();
//     this._handleFormSubmit(this._getInputValues()).then(() => {
//       this.close();
//     });
//   };

//   _getInputValues() {
//     const inputValues = {};

//     this._formInputs.forEach((input) => {
//       inputValues[input.name] = input.value;
//     });
//     return inputValues;
//   }

//   close() {
//     this._popupForm.reset();
//     super.close();
//   }

//   setEventListeners() {
//     super.setEventListeners();
//     this._popupForm.addEventListener("submit", this._handleSubmit);
//   }

//   removeEventListeners() {
//     super.removeEventListeners();
//     this._popupForm.removeEventListener("submit", this._handleSubmit);
//   }
// }
