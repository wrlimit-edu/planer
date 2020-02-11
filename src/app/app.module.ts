import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CategoryComponent} from './view/category/category.component';
import {DataHandlerService} from './service/data-handler.service';
import {TaskComponent} from './view/task/task.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';;
import {EditTaskDialogComponent} from './dialog/edit-task-dialog/edit-task-dialog.component';
import {FormsModule} from "@angular/forms";

import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    TaskComponent,
    EditTaskDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [DataHandlerService],
  entryComponents: [EditTaskDialogComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
