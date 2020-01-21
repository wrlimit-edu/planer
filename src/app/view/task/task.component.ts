import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../../service/data-handler.service';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[];

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit() {
    this.dataHandlerService.taskSubject.subscribe(tasks => this.tasks = tasks);
    //this.tasks = this.dataHandlerService.getTasks();
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }
}
