class BindWithHtml {
  bindByID(id) {
    return document.getElementById(id);
  }
}

export const bindWithHtml = new BindWithHtml();
