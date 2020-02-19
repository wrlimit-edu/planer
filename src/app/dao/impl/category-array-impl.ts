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

  delete(id: number): Observable<Category> {
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null;
      }
    });
    const tmpCategory = TestData.categories.find(t => t.id === id); // удаляем по id
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);
    return of(tmpCategory);
  }

  update(category: Category): Observable<Category> {
    const tmpCategory = TestData.categories.find(t => t.id === category.id); // обновляем по id
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category);
    return of(tmpCategory);
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return undefined;
  }

}
