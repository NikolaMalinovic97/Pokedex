import { SubData } from '../../resources/models/sub-data';
import { Package } from '../../resources/models/enum/package';
import { autoinject } from 'aurelia-framework';
import { ValidationControllerFactory, ValidationRules, validateTrigger } from 'aurelia-validation';
import { DialogService } from 'aurelia-dialog';
import { SubscribeDialog } from './dialog/subscribe-dialog';
import * as Toastr from 'toastr';
import { Router } from 'aurelia-router';
import { I18N } from 'aurelia-i18n';
import { RouteService } from 'resources/services/route-service';

@autoinject
export class Subscribe {

  subData: SubData;
  periodOptions: number[];
  packages: string[];
  controller;

  constructor(
    private controllerFactory: ValidationControllerFactory,
    private dialogService: DialogService,
    private router: Router,
    private i18n: I18N,
    private routeService: RouteService
  ) {
    this.subData = new SubData;
    this.periodOptions = [1, 3, 6, 12];
    this.subData.period = this.periodOptions[0];
    this.packages = Object.values(Package);
    this.subData.package = Package.Bronze;
    this.configureValidation();
  }

  canActivate(params, routeConfig, navigationInstruction) {
    let isAccessible = this.routeService.shouldRouteBeAccessible(routeConfig);
    if (!isAccessible) {
      this.router.navigate('login');
    }
    return true;
  }

  private configureValidation() {
    this.controller = this.controllerFactory.createForCurrentScope();
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
    const onlyNumbers = /^\d+$/;
    ValidationRules
      .ensure('name')
      .displayName(this.i18n.tr('subscribe.name'))
      .required().withMessage(this.i18n.tr('validation.required'))
      .maxLength(25).withMessage(this.i18n.tr('validation.max-length'))
      .ensure('email')
      .displayName(this.i18n.tr('subscribe.email'))
      .required().withMessage(this.i18n.tr('validation.required'))
      .email().withMessage(this.i18n.tr('validation.email'))
      .ensure('phone')
      .displayName(this.i18n.tr('subscribe.phone'))
      .required().withMessage(this.i18n.tr('validation.required'))
      .maxLength(20).withMessage(this.i18n.tr('validation.max-length'))
      .matches(onlyNumbers).withMessage(this.i18n.tr('validation.numbers-only'))
      .on(this.subData);
  }

  submit() {
    this.controller.validate().then(result => {
      result.valid ? this.openDialog() : Toastr.error(this.i18n.tr('toastr.sub-error.message'), this.i18n.tr('toastr.sub-error.title'));
    });
  }

  private openDialog() {
    this.dialogService.open({ viewModel: SubscribeDialog, model: this.subData, lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        Toastr.success(this.i18n.tr('toastr.sub-success.message'), this.i18n.tr('toastr.sub-success.title'));
        this.router.navigate('');
      }
    });
  }
}
