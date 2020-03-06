import {ICategoryArray} from "../interface/icategory-array";
import {Observable, of} from "rxjs";
import {Category} from "../../model/category";
import {TestData} from "../../data/test-data";

export class CategoryArrayImpl implements ICategoryArray {

  add(category: Category): Observable<Category> {

    // если id пустой - генерируем его
    if (category.id === null || category.id === 0) {
      category.id = this.getLastIdCategory() + 1;
    }
    TestData.categories.push(category);
    return of(category);
  }

  private getLastIdCategory(): number {
    return Math.max.apply(Math, TestData.categories.map(item => item.id));
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
    return of(TestData.categories.filter(
      cat => cat.name.toUpperCase().includes(title.toUpperCase()))
      .sort((c1, c2) => c1.name.localeCompare(c2.name)));
  }

}
