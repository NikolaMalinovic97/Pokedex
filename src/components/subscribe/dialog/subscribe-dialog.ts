import { DialogController } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';

@autoinject
export class SubscribeDialog {

    subData;
    
    constructor(private dialogController: DialogController) {}

    activate(subData) {
        this.subData = subData;
    }

    confirm() {
        this.dialogController.ok();
    }

    cancel() {
        this.dialogController.cancel();
    }
}