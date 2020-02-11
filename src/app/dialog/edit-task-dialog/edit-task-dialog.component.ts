import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from "../../model/task";
import {Category} from "../../model/category";
import {Priority} from "../../model/priority";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  private dialogTitle: string;
  private task: Task;

  private categories: Category[];
  private priorities: Priority[];

  private tmpTitle: string;
  private tmpCategory: Category;
  private tmpPriority: Priority;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string],
    private dataHandler: DataHandlerService
  ) {
  }

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.tmpTitle = this.task.name;

    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;

    this.dataHandler.getAllCategories().subscribe(items => this.categories = items);
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);
  }

  private onConfirm(): void {
    this.task.name = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.dialogRef.close(this.task);
  }

  private onCancel(): void {
    this.dialogRef.close(null);
  }
}
