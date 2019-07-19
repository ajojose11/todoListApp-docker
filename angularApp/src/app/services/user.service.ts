import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getTaskById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/api/tasks/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    updateTask(task) {
        return this.http.put(`${environment.apiUrl}/api/tasks/${task._id}`, task);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
    createTask(task) {
        return this.http.post(`${environment.apiUrl}/api/tasks/`, task);
    }
}