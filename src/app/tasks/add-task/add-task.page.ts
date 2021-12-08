import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from 'src/app/_services/todo/todo.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {


  constructor(private modalController: ModalController, private apiService: TodoService
  ) { }

  ngOnInit() {

  }

  dismissModal() {
    this.modalController.dismiss()
  }

  formSubmit(form) {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();


    var date = dd + '/' + mm + '/' + yyyy;
    this.apiService.createTask(form.value.name, date).then(res => {
      console.log(res)
    })
      .catch(error => console.log(error));
  }
}


