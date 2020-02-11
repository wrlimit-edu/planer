import {Component, OnInit} from '@angular/core';
import {Task} from "./model/task";
import {Category} from "./model/category";
import {DataHandlerService} from "./service/data-handler.service";
import {Priority} from "./model/priority";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'planer';

  tasks: Task[];
  categories: Category[];

  private selectedCategory: Category = null;

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    //this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.onSelectCategory(null); // показать все задачи
  }

  private onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.dataHandler.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
  }
}
