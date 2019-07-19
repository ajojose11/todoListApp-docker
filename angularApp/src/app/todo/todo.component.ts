import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  map } from 'rxjs/operators';
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem
  } from '@angular/cdk/drag-drop';
import * as _ from 'underscore';

import { UserService, AlertService, AuthenticationService} from '@app/services';

export interface Todo {
    title: string;
    date: string;
    poster : string;
  }
@Component({
    templateUrl: 'todo.component.html',
    styleUrls: ['./todo.component.scss']
    })
export class TodoComponent implements OnInit {
    tasks: any = [];
    done: any = [];
    newTask: string;
    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private router: Router,
    ) {

    }

    ngOnInit() {
      this.getTasks();
    }
      drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          let data: any = event.previousContainer.data[event.previousIndex];
          data.completed = !data.completed;
          this.userService.updateTask(data).subscribe((response: any) => {
            if (response.status === 'success') {
              transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
            } else {
              this.alertService.error(response.message, true);
            }
          },
          error => {
         console.log(error);
         this.alertService.error(error, true);
       })
        }
      }
      getTasks() {
        this.userService.getTaskById(this.authenticationService.currentUserValue.data._id)
        .subscribe(
          (response: any) => {
            if (response.status === 'success') {
            const value = _.groupBy(response.data,'completed');
            if(value.false) this.tasks = value.false;
            if(value.true) this.done = value.true;
            } 
        },
        error => {
          this.alertService.error(error, true);
        });
      }
      createTask() {
       if (this.newTask !== '') {
         const task = { userid: this.authenticationService.currentUserValue.data._id, task: this.newTask }
         this.userService.createTask(task).subscribe((response: any) => {
            if(response.status === 'success') {
              this.newTask = '';
              this.alertService.success('Task added Successfully', true);
              this.getTasks();
            }
          },
          error => {
            this.alertService.error(error, true);
          });
       }
      }
      logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      }

}
