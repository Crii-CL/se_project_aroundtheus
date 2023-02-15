class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
  }

  // _setEventListeners in the class
  _setEventListeners() {
    this._inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState(inputList, submitButton, options);
      });
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._formElement, inputElement, options);
        this._toggleButtonState(inputList, submitButton, options);
      });
    });
  }

  _toggleButtonState() {
    let foundInvalid = false;

    inputList.forEach((inputElement) => {
      if (!inputElement.validity.valid) {
        foundInvalid = true;
      }
    });

    if (foundInvalid) {
      submitButton.classList.add(this._inactiveButtonClass);
      return (submitButton.disabled = true);
    }
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _showInputError(inputElement) {
    const errorMessageElement = formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = " ";
    errorMessageElement.classList.remove(this._errorClass);
  }

  enableValidation(settings) {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._hideInputError(this._formElement);

    this._setEventListeners(this._formElement, settings);
  }
}

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_inactive",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error_visible",
};

const editForm = document.querySelector(".modal__form");

const editFormvalidator = new FormValidator(settings, editForm);
// const addFormValidator = new FormValidator(settings, addForm);
editFormvalidator.enableValidation();
