import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../../service/data-handler.service';
import { Task } from 'src/app/model/task';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы
  tasks: Task[];

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit() {
    this.dataHandlerService.taskSubject.subscribe(tasks => this.tasks = tasks);
    this.dataSource = new MatTableDataSource();
    this.refreshTable();

    //this.tasks = this.dataHandlerService.getTasks();
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  private getPriorityColor(task: Task) {
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return '#000';
  }

  private refreshTable() {
    this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)
  }
}
