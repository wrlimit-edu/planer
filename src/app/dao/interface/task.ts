import { Common } from "./common";
import { Category } from "../../model/category";
import { Priority } from "../../model/priority";
import { Observable } from "rxjs";

export interface Task extends Common<Task> {

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

  getCompletedCountInCategory(category: Category): Observable<number>;

  getUncompletedCountInCategory(category: Category): Observable<number>;

  getTotalCountInCategory(category: Category): Observable<number>;

  getTotalCount(): Observable<number>;
}
