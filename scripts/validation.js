function enableValidation(options) {
  const formElements = Array.from(
    document.querySelectorAll("options.formSelector")
  );
  const formInput = document.querySelectorAll("options.inputSelector");

  formElements.forEach((formElement) => {
    formElements.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    formElement.forEach(formInput);
  });
}

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
