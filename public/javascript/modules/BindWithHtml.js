class BindWithHtml {
  bindByID(id) {
    return document.getElementById(id);
  }

  bindElementsBySelector(selector) {
    return document.querySelectorAll(selector);
  }
}

export const bindWithHtml = new BindWithHtml();
