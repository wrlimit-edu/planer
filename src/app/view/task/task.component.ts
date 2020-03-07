import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from 'src/app/model/task';
import {MatSort, MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Priority} from "../../model/priority";
import {Category} from "../../model/category";
import {OperType} from "../../dialog/oper-type.enum";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit, AfterViewInit {

  private displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'check', 'operations'];
  private dataSource: MatTableDataSource<Task>;
  private searchTaskText: string;
  private selectedStatusFilter: boolean = null;
  private tasks: Task[];
  private priorities: Priority[];
  private selectedPriorityFilter: Priority = null;

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.refreshTable();
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Input()
  selectedCategory: Category;

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  filterByTitle = new EventEmitter<string>();

  @Output()
  filterByStatus = new EventEmitter<boolean>();

  @Output()
  filterByPriority = new EventEmitter<Priority>();

  @Output()
  addTask = new EventEmitter<Task>();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.refreshTable();
  }

  ngAfterViewInit(): void {
    this.addTableObjects();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*
  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }
  */

  private getPriorityColor(task: Task) {
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return 'White';
  }

  private refreshTable() {


    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)

    this.addTableObjects();

    // когда получаем новые данные..
    // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
    // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
    this.dataSource.sortingDataAccessor = (task, colName) => {

      // по каким полям выполнять сортировку для каждого столбца
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.name : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }
        case 'title': {
          return task.name;
        }
      }
    };

  }

  private addTableObjects() {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }

  onClickTask(task: Task) {
    this.updateTask.emit(task);
  }

  openEditTaskDialog(task: Task) {

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редактирование задачи'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'complete') {
        task.completed = true;
        this.updateTask.emit(task);
      }

      if (result === 'activate') {
        task.completed = false;
        this.updateTask.emit(task);
        return;
      }

      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }
    });
  }

  openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitle: 'Подтвердите действие', message: `Вы действительно хотите удалить задачу: "${task.name}"?`},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ОК
        this.deleteTask.emit(task);
      }
    });
  }

  onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  // фильтрация по названию
  private onFilterByTitle() {
    this.filterByTitle.emit(this.searchTaskText);
  }

  private onFilterByStatus(value: boolean) {
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  private onFilterByPriority(value: Priority) {
    if (value !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = value;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }

  private openAddTaskDialog() {
    const task = new Task(null, '', this.selectedCategory, null, false, new Date);
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Добавление задачи', OperType.ADD ]});
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ОК и есть результат
        this.addTask.emit(task);
      }
    });
  }
}
