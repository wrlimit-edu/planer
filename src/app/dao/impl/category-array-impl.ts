import { Common } from "../interface/common";
import { Category } from "../../model/category";
import { Observable } from "rxjs";

export class CategoryArrayImpl implements Common<Category> {
  add(T): Observable<Category> {
    return undefined;
  }

  delete(id: number): Observable<Category> {
    return undefined;
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return undefined;
  }

  update(T): Observable<Category> {
    return undefined;
  }
}
