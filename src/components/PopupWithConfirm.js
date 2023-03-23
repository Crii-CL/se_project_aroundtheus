class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleDelSubmit) {
    super({ popupSelector });
    this._delBtn = document.querySelector("#card-delete-button");
    this._delBtnModal = document.querySelector("#confirm-del");
    this._handleDelSubmit = handleDelSubmit;
  }

  _handleDelSubmit() {
    const 
  }
}
