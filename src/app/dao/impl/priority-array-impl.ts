import {IPriorityArray} from "../interface/ipriority-array";
import {Observable, of} from "rxjs";
import {Priority} from "../../model/priority";
import {TestData} from "../../data/test-data";

export class PriorityArrayImpl implements IPriorityArray{

  add(priority: Priority): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  update(priority: Priority): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

}
