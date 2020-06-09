import { UserRole } from "./enum/user-role";

export class User {

    username: string;
    password: string;
    role: UserRole;
    imagePath: string;

    constructor(username: string, password: string, role: UserRole, imagePath: string) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.imagePath = imagePath;
    }
}