import {Injectable} from '@angular/core';
import {Task} from '../model/Task';
import {Observable} from 'rxjs';
import {TaskArrayImpl} from "../dao/impl/task-array-impl";
import {CategoryArrayImpl} from "../dao/impl/category-array-impl";
import {Category} from "../model/category";
import {Priority} from "../model/priority";
import {PriorityArrayImpl} from "../dao/impl/priority-array-impl";


@Injectable({
  providedIn: 'root'
})

export class DataHandlerService {
  private taskArray = new TaskArrayImpl();
  private categoryArray = new CategoryArrayImpl();
  private priorityArray = new PriorityArrayImpl();

  constructor() { }

  getAllTasks(): Observable<Task[]> {
    return this.taskArray.getAll();
  }

  getAllCategories(): Observable<Category[]>{
    return this.categoryArray.getAll();
  }

  getAllPriorities(): Observable<Priority[]>{
    return this.priorityArray.getAll();
  }

  // поиск задач по параметрам
  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskArray.search(category, searchText, status, priority);
  }

  updateTask(task: Task): Observable<Task> {
      return this.taskArray.update(task);
  }
}
