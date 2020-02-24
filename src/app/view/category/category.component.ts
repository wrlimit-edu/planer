import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/category';
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {OperType} from "../../dialog/oper-type.enum";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  @Input()
  private categories: Category[];

  // выбрали категорию из списка
  @Output()
  selectCategory = new EventEmitter<Category>();

  // удалили категорию
  @Output()
  deleteCategory = new EventEmitter<Category>();

  // изменили категорию
  @Output()
  updateCategory = new EventEmitter<Category>();

  // добавить категорию
  @Output()
  addCategory = new EventEmitter<string>();

  // поиск категории
  @Output()
  searchCategory = new EventEmitter<string>(); // передаем строку для поиска

  @Input()
  selectedCategory: Category;

  searchCategoryTitle: string;

  constructor(private dataHandlerService: DataHandlerService, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  private showTasksByCategory(category: Category) {
    if (this.selectedCategory === category) {
      return;
    }
    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
  }

  private openAddDialog() {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {data: ['', 'Добавление категории'], width: '400px'});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory.emit(result as string); // вызываем внешний обработчик
      }
    });
  }

  private openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.name, 'Редактирование категории', OperType.EDIT],
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCategory.emit(category);
        return;
      }
      if (typeof (result) === 'string') {
        category.name = result as string;
        this.updateCategory.emit(category);
        return;
      }
    });
  }

  // поиск категории

  // поиск категории
  private search() {
    if (this.searchCategoryTitle == null ) {
      return;
    }
    this.searchCategory.emit(this.searchCategoryTitle);
  }

  showEditIcon(param) {

  }
}
