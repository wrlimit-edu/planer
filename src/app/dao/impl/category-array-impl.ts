import {ICategoryArray} from "../interface/icategory-array";
import {Observable, of} from "rxjs";
import {Category} from "../../model/category";
import {TestData} from "../../data/test-data";

export class CategoryArrayImpl implements ICategoryArray {

  add(category: Category): Observable<Category> {
    return undefined;
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  update(category: Category): Observable<Category> {
    return undefined;
  }

  delete(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return undefined;
  }

}
