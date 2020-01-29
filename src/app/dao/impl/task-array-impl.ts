import {ITaskArray} from "../interface/itask-array";
import {Observable, of} from "rxjs";
import {Task} from "../../model/task";
import {Category} from "../../model/category";
import {Priority} from "../../model/priority";
import {TestData} from "../../data/test-data";

export class TaskArrayImpl implements ITaskArray {
  add(T): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    return undefined;
  }

  get(id: number): Observable<Task> {
    return undefined;
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);;
  }

  update(T): Observable<Task> {
    return undefined;
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return undefined;
  }
}
