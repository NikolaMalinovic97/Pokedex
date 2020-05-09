import { autoinject } from 'aurelia-dependency-injection';

@autoinject
export class PaginationService {

	pages = [1, 2, 3, 4, 5];
	activePage = 1;

	constructor() { }

	setActivePage(activePage) {
		this.activePage = activePage;
	}

	loadPages(count) {
		const lastPage = Math.ceil(count / 20);
		if (this.activePage <= 2) {
			return [1, 2, 3, 4, 5];
		}
		else if (this.activePage >= lastPage - 1) {
			return [
				lastPage - 4,
				lastPage - 3,
				lastPage - 2,
				lastPage - 1,
				lastPage
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