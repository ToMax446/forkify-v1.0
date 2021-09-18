import icons from 'url:../../img/icons.svg'; //parcel 2

export default class View {
  _data;

  /**
   *  Render the received object to the DOM
   * @param {Object | Object[]} data the data to be rendered
   * @param {boolean} [render=true] if false create markup instead of rendering it to the DOM
   * @returns {undefined | string} A markup is returned of render=false
   * @this {Object} View instance
   * @author Tom Levy
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;

    // generating the updated markup
    const newMarkup = this._generateMarkup();
    // create "virtual updated DOM"
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // get arrays of all old and new elements
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //prettier-ignore

      //update text

      // check if the node has changed
      if (!newEl.isEqualNode(curEl) &&
        //check if the text content (will be the first child of element is not empty)
        newEl.firstChild?.nodeValue.trim() !== '') {
        //change only the text content of the element to the new content
        curEl.textContent = newEl.textContent;
      }

      //update attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
