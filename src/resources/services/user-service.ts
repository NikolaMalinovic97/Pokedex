import { autoinject } from 'aurelia-dependency-injection';
import { User } from 'resources/models/user';
import { UserRole } from 'resources/models/enum/user-role';

@autoinject
export class UserService {

    signedUser: User;
    users: User[];

    constructor() {
        this.users = [
            new User('admin', 'admin', UserRole.Admin, '/img/users/user-1.jpg'),
            new User('user', 'user', UserRole.User, '/img/users/user-2.jpg')
        ];
    }
    
    signIn(username: string, password: string) {
        return new Promise((resolve, reject) => {
            const resultUser = this.users.find(user => {
                return user.username === username && user.password === password;
            });
            if (resultUser === undefined || resultUser === null) {
                resolve(false);
            } else {
                this.signedUser = resultUser;
                resolve(true);
            }
        });
    }

    signOut() {
        this.signedUser = null;
    }

    isSignedIn(): boolean {
        return this.signedUser != null || this.signedUser != undefined;
    }
	
}