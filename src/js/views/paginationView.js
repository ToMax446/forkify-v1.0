import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg'; //parcel 2
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;
    //page 1 and there are other pages
    if (curPage === 1 && numPages > 1) return this._generateNextPAge(curPage);

    //page 1 and no other pages
    if (curPage === 1 && numPages === 1) return '';

    //Last page
    if (curPage === numPages) return this._generatePrevPage(curPage);
    // other page
    if (curPage < numPages) {
      return this._generatePrevPage(curPage) + this._generateNextPAge(curPage);
    }
  }
  _generatePrevPage(curPage) {
    return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>${curPage - 1}</span>
    </button>
    `;
  }
  _generateNextPAge(curPage) {
    return `    
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }
}
export default new PaginationView();
