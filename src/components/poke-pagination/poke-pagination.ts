import {bindable} from 'aurelia-framework';

export class PokePagination {

  @bindable activePage;
  @bindable lastPage;
  pages: number[];

  @bindable pageClick;

  constructor() {    
    this.activePage = 1;
  }

  attached() {
    this.pages = this.loadPages();
  }

  setActivePage(activePage) {
    if (activePage === this.activePage)
      return;
    if (typeof this.pageClick === 'function') {
      this.pageClick(activePage);
    }
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
