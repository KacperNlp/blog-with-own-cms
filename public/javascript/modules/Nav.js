import { bindWithHtml } from "./BindWithHtml.js";

const ACTIVE_NAV_CLASS = "active";
const BARS_ID = "bars";
const NAV_ID = "nav";

class Nav {
  constructor() {
    this.bars = null;
    this.nav = null;
    this.#init();
  }

  #init() {
    this.bars = bindWithHtml.bindByID(BARS_ID);
    this.nav = bindWithHtml.bindByID(NAV_ID);
    this.#barsHandle();
  }

  #barsHandle() {
    this.bars.addEventListener("click", () => {
      this.bars.classList.toggle(ACTIVE_NAV_CLASS);
      this.nav.classList.toggle(ACTIVE_NAV_CLASS);
    });
  }
}

export const nav = new Nav();
