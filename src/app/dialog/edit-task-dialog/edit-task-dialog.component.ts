import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../model/task";
import {Category} from "../../model/category";
import {Priority} from "../../model/priority";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {PriorityService} from "../../service/priority.service";
import {CategoryService} from "../../service/category.service";
import {TaskService} from "../../service/task.service";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})

export class EditTaskDialogComponent implements OnInit {

  private dialogTitle: string;
  private task: Task;
  private tmpTitle: string;
  private tmpPriority: Priority;
  private tmpCategory: Category;
  private tmpDate: Date;
  private priorities: Priority[];
  private categories: Category[];


  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string],
    private categoryService: CategoryService,
    private priorityService: PriorityService,
    private taskService: TaskService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.tmpTitle = this.task.name;
    this.tmpPriority = this.task.priority;
    this.tmpCategory = this.task.category;
    this.tmpDate = this.task.date;
    this.categoryService.getAllCategories().subscribe(items => this.categories = items);
    this.priorityService.getAllPriorities().subscribe(items => this.priorities = items);
  }

  private onConfirm(): void {
    this.task.name = this.tmpTitle;
    this.task.priority = this.tmpPriority;
    this.task.category = this.tmpCategory;
    this.task.date = this.tmpDate;
    this.dialogRef.close(this.task);
  }

  private onCancel(): void {
    this.dialogRef.close(null);
  }

  private delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${this.task.name}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  complete() {
    this.dialogRef.close('complete');
  }

  activate() {
    this.dialogRef.close('activate');
  }
}
