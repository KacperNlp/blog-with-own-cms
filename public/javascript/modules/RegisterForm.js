import { bindWithHtml } from "./BindWithHtml.js";

const CLASS_FOR_VISIBLE_LOGIN_PANEL = "active";
const CLOSE_LOGIN_PANEL_BUTTON_ID = "close-login";
const LOGIN_PANEL_ID = "login-panel";
const SHOW_LOGIN_PANEL_ELEMENT_ID = "show-login";

class RegisterForm {
  constructor() {
    this.closeLoginPanelButton = bindWithHtml.bindByID(
      CLOSE_LOGIN_PANEL_BUTTON_ID
    );
    this.elementToShowLoginPanel = bindWithHtml.bindByID(
      SHOW_LOGIN_PANEL_ELEMENT_ID
    );
    this.loginPanel = bindWithHtml.bindByID(LOGIN_PANEL_ID);

    this.#init();
  }

  #init() {
    this.#handleShowLoginPanel();
    this.#handleHideLoginPanel();
  }

  #handleShowLoginPanel() {
    this.elementToShowLoginPanel.addEventListener("click", () => {
      this.loginPanel.classList.add(CLASS_FOR_VISIBLE_LOGIN_PANEL);
    });
  }

  #handleHideLoginPanel() {
    this.closeLoginPanelButton.addEventListener("click", () => {
      this.loginPanel.classList.remove(CLASS_FOR_VISIBLE_LOGIN_PANEL);
    });
  }
}

export const registerForm = new RegisterForm();
