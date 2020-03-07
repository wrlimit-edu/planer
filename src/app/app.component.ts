import {Component, Input, OnInit} from '@angular/core';
import {Task} from "./model/task";
import {Category} from "./model/category";
import {Priority} from "./model/priority";
import {zip} from "rxjs";
import {concatMap, map} from "rxjs/operators";
import {PriorityService} from "./service/priority.service";
import {CategoryService} from "./service/category.service";
import {TaskService} from "./service/task.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'planer';

  private tasks: Task[];
  private categories: Category[];
  private priorities: Priority[];
  private selectedCategory: Category = null;
  private searchTaskText = '';
  private statusFilter: boolean;
  private priorityFilter: Priority;
  private searchCategoryText: string;
  private totalTasksCountInCategory: number;
  private completedCountInCategory: number;
  private uncompletedCountInCategory: number;
  private uncompletedTotalTasksCount: number;
  private categoryMap = new Map<Category, number>();

  constructor(
    private categoryService: CategoryService,
    private priorityService: PriorityService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(categories => this.categories = categories);
    this.priorityService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    //this.fillCategories();
    //this.onSelectCategory(null);
  }

  /* CATEGORY */

  private onAddCategory(title: string) {
    this.categoryService.addCategory(name).subscribe(() => this.updateCategories());
  }

  private onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.taskService.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    )
    this.updateTasksAndStat();
  }

  private onUpdateCategory(category: Category) {
    this.categoryService.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  private onDeleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null; // открываем категорию "Все"
      this.categoryMap.delete(cat); // не забыть удалить категорию из карты
      this.onSearchCategory(this.searchCategoryText);
      this.updateTasks();
    });
  }

  private onSearchCategory(title: string) {
    this.searchCategoryText = title;
    this.categoryService.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    });
  }

  private updateCategories() {
    this.categoryService.getAllCategories().subscribe(categories => this.categories = categories);
  }


  private fillCategories() {
    if (this.categoryMap) {
      this.categoryMap.clear();
    }
    this.categories = this.categories.sort((a, b) => a.name.localeCompare(b.name));
    this.categories.forEach(cat => {
      this.taskService.getUncompletedCountInCategory(cat).subscribe(count => this.categoryMap.set(cat, count));
    });
  }

  /* TASK */

  private onAddTask(task: Task) {
    this.taskService.addTask(task).pipe(// сначала добавляем задачу
      concatMap(task => { // используем добавленный task (concatMap - для последовательного выполнения)
          // .. и считаем кол-во задач в категории с учетом добавленной задачи
          return this.taskService.getUncompletedCountInCategory(task.category).pipe(map(count => {
            return ({t: task, count}); // в итоге получаем массив с добавленной задачей и кол-вом задач для категории
          }));
        }
      )).subscribe(result => {

      const t = result.t as Task;


// если указана категория - обновляем счетчик для соотв. категории
      // чтобы не обновлять весь список - обновим точечно
      if (t.category) {
        this.categoryMap.set(t.category, result.count);
      }
      this.updateTasksAndStat();

    });
  }


  private onUpdateTask(task: Task): void {
      this.taskService.updateTask(task).subscribe(() => {
        this.fillCategories();
        this.updateTasksAndStat();
      });
  }


  private onDeleteTask(task: Task) {

    this.taskService.deleteTask(task.id).pipe(
      concatMap(task => {
          return this.taskService.getUncompletedCountInCategory(task.category).pipe(map(count => {
            return ({t: task, count});
          }));
        }
      )).subscribe(result => {

      const t = result.t as Task;

      // если указана категория - обновляем счетчик для соотв. категории
      // чтобы не обновлять весь список - обновим точечно
      if (t.category) {
        this.categoryMap.set(t.category, result.count);
      }


      this.updateTasksAndStat();

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
    this.taskService.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  private updateTasksAndStat() {
    this.updateTasks();
    this.updateStat();
  }

  private updateStat() {
    /*
    zip(
      this.taskService.getTotalCountInCategory(this.selectedCategory),
      this.taskService.getCompletedCountInCategory(this.selectedCategory),
      this.taskService.getUncompletedCountInCategory(this.selectedCategory),
      this.taskService.getUncompletedTotalCount())

      .subscribe(array => {
        this.totalTasksCountInCategory = array[0];
        this.completedCountInCategory = array[1];
        this.uncompletedCountInCategory = array[2];
        this.uncompletedTotalTasksCount = array[3]; // нужно для категории Все
      });
      
     */
  }
}
