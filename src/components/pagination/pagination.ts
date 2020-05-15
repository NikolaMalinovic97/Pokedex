import { bindable } from 'aurelia-framework';

export class Pagination {

  @bindable activePage;
  @bindable lastPage;
  pages: number[];
  parentComponent;

  constructor() {
    this.activePage = 1;
  }

  attached() {
    this.pages = this.loadPages();
  }

  bind(ctx) {
    this.parentComponent = ctx;
  }

  activePageChanged(newValue, oldValue) {
    if (newValue)
      this.parentComponent.refreshData(newValue);
  }

  setActivePage(activePage) {
    if (activePage === this.activePage)
      return;
    this.activePage = activePage;
    this.pages = this.loadPages();
  }

  private loadPages() {
    if (this.activePage <= 2) {
      return [1, 2, 3, 4, 5];
    }
    else if (this.activePage >= this.lastPage - 1) {
      return [
        this.lastPage - 4,
        this.lastPage - 3,
        this.lastPage - 2,
        this.lastPage - 1,
        this.lastPage
      ];
    }
    else {
      return [
        this.activePage - 2,
        this.activePage - 1,
        this.activePage,
        this.activePage + 1,
        this.activePage + 2];
    }
  }

}
