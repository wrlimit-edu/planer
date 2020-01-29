import {IPriorityArray} from "../interface/ipriority-array";
import {Observable} from "rxjs";
import {Priority} from "../../model/priority";

export class PriorityArrayImpl implements IPriorityArray{
  add(T): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return undefined;
  }

  update(T): Observable<Priority> {
    return undefined;
  }
}
