import {autoinject} from 'aurelia-framework';
import { Router } from 'aurelia-router';

@autoinject
export class Header {

  constructor(private router: Router) {}
}
