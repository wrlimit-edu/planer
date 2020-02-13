import {Observable} from "rxjs";

export interface ICommon<T> {
  add(T): Observable<T>;
  get(id: number): Observable<T>;
  update(T): Observable<T>;
  delete(id: number): Observable<T>;
  getAll(): Observable<T[]>;
}
