import {ICommon} from "./icommon";
import {Task} from "../../model/task";
import {Category} from "../../model/category";
import {Priority} from "../../model/priority";
import {Observable} from "rxjs";

export interface ITaskArray extends ICommon<Task> {
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;
  getCompletedCountInCategory(category: Category): Observable<number>;
  getUncompletedCountInCategory(category: Category): Observable<number>;
  getTotalCountInCategory(category: Category): Observable<number>;
  getTotalCount(): Observable<number>;
}
