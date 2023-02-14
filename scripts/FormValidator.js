class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }

  // _setEventListeners in the class
  _setEventListeners() {
    this._inputList = [...this._formElement.querySelectorAll(inputSelector)];
    submitButton = formElement.querySelector(submitButtonSelector);

    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        toggleButtonState(inputList, submitButton, options);
      });
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement, options);
        toggleButtonState(inputList, submitButton, options);
      });
    });
  }

  _showInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(inputErrorClass);
    errorMessageElement.textContent = " ";
    errorMessageElement.classList.remove(errorClass);
  }
  _toggleButtonState() {
    let foundInvalid = false;

    inputList.forEach((inputElement) => {
      if (!inputElement.validity.valid) {
        foundInvalid = true;
      }
    });

    if (foundInvalid) {
      submitButton.classList.add(inactiveButtonClass);
      return (submitButton.disabled = true);
    }
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_inactive",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error_visible",
};

const editFormvalidator = new FormValidator(config);
editFormvalidator.enableValidation();
