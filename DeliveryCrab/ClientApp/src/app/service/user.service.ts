import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { User } from '../models/user';
@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
    }
    log_user:User = new User();
    isAuthorization: boolean|undefined;

    getUsers() {
        return this.http.get("https://localhost:44432/user");
    }

    getUser(id: number | undefined) {
        return this.http.get("https://localhost:44432/user" + '/' + id);
    }

    createUser(user: User) {
        return this.http.post("https://localhost:44432/user/postuser", user);
    }
    updateUser(user: User) {
        return this.http.put("https://localhost:44432/user/putuser", user);
    }
    deleteUser(id: number| undefined) {
        return this.http.delete("https://localhost:44432/user/deleteuser/?id=" + id);
    }

  }

