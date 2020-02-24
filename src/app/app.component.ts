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

  private tasks: Task[];
  private categories: Category[];
  private priorities: Priority[]; // все приоритеты
  private selectedCategory: Category = null;
  private searchTaskText = '';
  private statusFilter: boolean;
  private priorityFilter: Priority;
  private searchCategoryText: string;

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
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

  private onUpdateTask(task: Task) {
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

  private onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(() => {
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

  private onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null; // открываем категорию "Все"
      this.onSelectCategory(this.selectedCategory);
    });
  }

  private onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  private onSearchTasks(searchString: string) {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  private onFilterTasksByStatus(status: boolean) {
    this.statusFilter = status;
    this.updateTasks();
  }

  private onFilterByPriority(priority: Priority) {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  private updateTasks() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  private onAddTask(task: Task) {
    this.dataHandler.addTask(task).subscribe(result => {
      this.updateTasks();
    });
  }

  private onAddCategory(title: string) {
    this.dataHandler.addCategory(title).subscribe(() => this.updateCategories());
  }

  private updateCategories() {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  private onSearchCategory(title: string) {
    this.searchCategoryText = title;
    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    });
  }
}
