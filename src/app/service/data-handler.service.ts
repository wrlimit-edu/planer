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

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskArray.search(category, searchText, status, priority);
  }

  updateTask(task: Task): Observable<Task> {
      return this.taskArray.update(task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskArray.delete(id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryArray.update(category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryArray.delete(id);
  }

  addTask(task: Task): Observable<Task> {
    return this.taskArray.add(task);
  }

  addCategory(title:string):Observable<Category>{
    return this.categoryArray.add(new Category(null, title));
  }

  searchCategories(title: string): Observable<Category[]> {
    return this.categoryArray.search(title);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.taskArray.getCompletedCountInCategory(category);
  }

  getUncompletedTotalCount(): Observable<number> {
    return this.taskArray.getUncompletedCountInCategory(null);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return this.taskArray.getUncompletedCountInCategory(category);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return this.taskArray.getTotalCountInCategory(category);
  }
}
