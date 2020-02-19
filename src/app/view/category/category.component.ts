import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/category';
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {MatDialog} from "@angular/material/dialog";

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

  @Input()
  selectedCategory: Category;
  indexMouseMove: number;

  constructor(private dataHandlerService: DataHandlerService, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showTasksByCategory(category: Category) {
    if (this.selectedCategory === category) {
      return;
    }
    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
  }

  private showEditIcon(index: number) {
    this.indexMouseMove = index;
  }

  private openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.name, 'Редактирование категории'],
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
}
