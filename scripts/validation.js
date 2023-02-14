// function enableValidation(options) {
//   const { formSelector } = options;
//   const formElements = [...document.querySelectorAll(formSelector)];
//   formElements.forEach((formElement) => {
//     formElement.addEventListener("submit", (e) => {
//       e.preventDefault();
//     });

//     setEventListeners(formElement, options);
//   });
// }

// // setEventListeners in validation.js
// function setEventListeners(formElement, options) {
//   const { inputSelector } = options;
//   const { submitButtonSelector } = options;
//   const inputList = [...formElement.querySelectorAll(inputSelector)];
//   const submitButton = formElement.querySelector(submitButtonSelector);

//   formElement.addEventListener("reset", () => {
//     setTimeout(() => {
//       toggleButtonState(inputList, submitButton, options);
//     });
//   });

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       checkInputValidity(formElement, inputElement, options);
//       toggleButtonState(inputList, submitButton, options);
//     });
//   });
// }

// function checkInputValidity(formElement, inputElement, options) {
//   if (!inputElement.validity.valid) {
//     return showInputError(formElement, inputElement, options);
//   }
//   hideInputError(formElement, inputElement, options);
// }

// function showInputError(
//   formElement,
//   inputElement,
//   { inputErrorClass, errorClass }
// ) {
//   const errorMessageElement = formElement.querySelector(
//     `#${inputElement.id}-error`
//   );

//   inputElement.classList.add(inputErrorClass);
//   errorMessageElement.textContent = inputElement.validationMessage;
//   errorMessageElement.classList.add(errorClass);
// }

// function hideInputError(
//   formElement,
//   inputElement,
//   { inputErrorClass, errorClass }
// ) {
//   const errorMessageElement = formElement.querySelector(
//     `#${inputElement.id}-error`
//   );

//   inputElement.classList.remove(inputErrorClass);
//   errorMessageElement.textContent = " ";
//   errorMessageElement.classList.remove(errorClass);
// }

// function toggleButtonState(inputList, submitButton, { inactiveButtonClass }) {
//   let foundInvalid = false;

//   inputList.forEach((inputElement) => {
//     if (!inputElement.validity.valid) {
//       foundInvalid = true;
//     }
//   });

//   if (foundInvalid) {
//     submitButton.classList.add(inactiveButtonClass);
//     return (submitButton.disabled = true);
//   }
//   submitButton.classList.remove(inactiveButtonClass);
//   submitButton.disabled = false;
// }
// /* ---------------------------- Validation Object --------------------------- */
// const config = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__form-input",
//   submitButtonSelector: ".modal__form-button",
//   inactiveButtonClass: "modal__form-button_inactive",
//   inputErrorClass: "modal__form-input_error",
//   errorClass: "modal__error_visible",
// };

// enableValidation(config);
// /* --------------------------- ^ValidationObject^ --------------------------- */
