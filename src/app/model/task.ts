import {Priority} from './Priority';
import {Category} from './Category';

export class Task {
  id: number;
  name: string;
  category: Category;
  priority: Priority;
  completed: boolean;
  date: Date;

  constructor(id: number, name: string, category: Category, priority: Priority, completed: boolean, date: Date) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.priority = priority;
    this.completed = completed;
    this.date = date;
  }
}
