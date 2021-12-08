import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';







@Injectable({
  providedIn: 'root'
})
export class TodoService {
  task: AngularFireList<any>;
  tasksCollection: any;
  constructor(private db: AngularFireDatabase) {
    this.task = this.db.list('task');
  }
  // Create

  createTask(apt: any, date) {

    return this.task.push({ name: apt, date: date, state: false })
  }

  listTask() {
    return this.db.list('/task')
  }

  update(key, object) {
    return this.task.update(key, { name: object.name, date: object.date, state: true })
  }



}
