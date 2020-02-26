import {ITaskArray} from "../interface/itask-array";
import {Observable, of} from "rxjs";
import {Task} from "../../model/task";
import {Category} from "../../model/category";
import {Priority} from "../../model/priority";
import {TestData} from "../../data/test-data";

export class TaskArrayImpl implements ITaskArray {

  add(task: Task): Observable<Task> {
    if (task.id === null || task.id === 0) {
      task.id = this.getLastIdTask() + 1;
    }
    TestData.tasks.push(task);
    return of(task);
  }

  private getLastIdTask(): number {
    return Math.max.apply(Math, TestData.tasks.map(task => task.id));
  }

  get(id: number): Observable<Task> {
    return undefined;
  }

  update(task: Task): Observable<Task> {
    const taskTmp = TestData.tasks.find(item => item.id === task.id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);
    return of(task);
  }

  delete(id: number): Observable<Task> {
    const taskTmp = TestData.tasks.find(item => item.id === id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);
    return of(taskTmp);
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  /*
  getTaskByCategory(category: Category): Observable<Task[]> {
    return of(TestData.tasks.filter(task => task.category === category));
  }
   */

  // кол-во завершенных задач в заданной категории (если category === null, то для всех категорий)
  getCompletedCountInCategory(category: Category): Observable<number> {
    return of(this.searchFilter(category, null, true, null).length);
  }

  // кол-во незавершенных задач в заданной категории (если category === null, то для всех категорий)
  getUncompletedCountInCategory(category: Category): Observable<number> {
    return of(this.searchFilter(category, null, false, null).length);
  }

  // кол-во всех задач в заданной категории (если category === null, то для всех категорий)
  getTotalCountInCategory(category: Category): Observable<number> {
    return of(this.searchFilter(category, null, null, null).length);
  }

  // кол-во всех задач в общем
  getTotalCount(): Observable<number> {
    return of(TestData.tasks.length);
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchFilter(category, searchText, status, priority));
  }

  private searchFilter(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {
    let allTasks = TestData.tasks;

    // поочереди применяем все условия (какие не пустые)
    if (status != null) {
      allTasks = allTasks.filter(task => task.completed === status);
    }

    if (category != null) {
      allTasks = allTasks.filter(task => task.category === category);
    }

    if (priority != null) {
      allTasks = allTasks.filter(task => task.priority === priority);
    }

    if (searchText != null) {
      allTasks = allTasks.filter(
        task =>
          task.name.toUpperCase().includes(searchText.toUpperCase()) // учитываем текст поиска (если '' - возвращаются все значения)
      );
    }

    return allTasks;
  }
}
