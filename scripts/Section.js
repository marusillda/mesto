export default class Section {
  /**
   *
   * @param {{item: array, renderer: function}} param0
   * @param {string} containerSelector
   */
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, append = true) {
    if (append) {
      this._container.append(element);
    }
    else {
      this._container.prepend(element);
    }
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
