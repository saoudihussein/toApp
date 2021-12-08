import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';
import { TodoService } from '../_services/todo/todo.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
})
export class DonePage implements OnInit {
  date: Date = new Date()

  taskCollection: any;
  constructor(private apiService: TodoService
  ) { }

  ngOnInit() {
    this.apiService.listTask().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() as {} })
        )
      )
    ).subscribe(task => {
      this.taskCollection = task;
      console.log(task)
    }, (error) => {
      console.log(error);
    });

  }

}
