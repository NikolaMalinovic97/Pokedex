import { Package } from "./package";

export class SubData {

    name: string;
    email: string;
    phone: string;
    package: Package;
    period: number;
    isRecieveingEmails: boolean;

    constructor() {
        this.name = "";
        this.email = "";
        this.phone = "";
        this.period = 0;
        this.isRecieveingEmails = false;
    }
}