import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Task} from "../model/task";
import {Priority} from "../model/priority";
import {Category} from "../model/category";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: HttpClient) { }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:8889/api/task/create', task);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>('http://localhost:8889/api/task/get/' + id);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:8889/api/task/update', task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.get<Task>('http://localhost:8889/api/task/delete/' + id);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:8889/api/task/list');
  }



  /*
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchFilter(category, searchText, status, priority));
  }
   */

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.getAllTasks();
  }


  /*
  private searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): any {
    //let allTasks = this.getAllTasks().subscribe(allTasks => allTasks = allTasks)
    /*
    let allTasks = this.getAllTasks().subscribe(allTasks => allTasks = allTasks);

    // поочереди применяем все условия (какие не пустые)
    if (status != null) {
      allTasks = allTasks.filter(task => task.completed === status);
    }

    if (category != null) {
      allTasks = allTasks.filter(task => task.category === category);
    }

    if (priority != null) {
      allTasks = allTasks.filter(task => task.priority === priority);
    }

    if (searchText != null) {
      allTasks = allTasks.filter(
        task =>
          task.name.toUpperCase().includes(searchText.toUpperCase()) // учитываем текст поиска (если '' - возвращаются все значения)
      );
    }
    return this.getAllTasks();
  }

   */


  getUncompletedTotalCount(): Observable<number> {
    return undefined;
    //return this.taskArray.getUncompletedCountInCategory(null);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
    //return this.taskArray.getUncompletedCountInCategory(category);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
    //return this.taskArray.getTotalCountInCategory(category);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
    //return this.taskArray.getCompletedCountInCategory(category);
  }

}
