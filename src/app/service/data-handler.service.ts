import {Injectable} from '@angular/core';
import {Task} from '../model/Task';
import {Observable} from 'rxjs';
import {TaskArrayImpl} from "../dao/impl/task-array-impl";
import {CategoryArrayImpl} from "../dao/impl/category-array-impl";
import {Category} from "../model/category";

@Injectable({
  providedIn: 'root'
})

export class DataHandlerService {
  private taskArray = new TaskArrayImpl();
  private categoryArray = new CategoryArrayImpl();

  constructor() { }

  getAllTasks(): Observable<Task[]> {
    return this.taskArray.getAll();
  }

  getAllCategories(): Observable<Category[]>{
    return this.categoryArray.getAll();
  }
}
