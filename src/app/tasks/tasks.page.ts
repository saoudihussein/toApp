import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../_services/todo/todo.service';
import { AddTaskPage } from './add-task/add-task.page';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  date: Date = new Date()
  taskCollection: any;

  constructor(private modalController: ModalController, private apiService: TodoService
  ) { }

  ngOnInit() {
    this.getAllTask()
  }

  getAllTask() {
    this.apiService.listTask().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() as {} })
        )
      )
    ).subscribe(task => {
      this.taskCollection = task;
    }, (error) => {
      console.log(error);
    });
  }

  checkValue(key, object) {
    this.apiService.update(key, object).then(res => {
      console.log(res)
    })
      .catch(error => console.log(error));
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddTaskPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}


