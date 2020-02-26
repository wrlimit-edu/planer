import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CategoryComponent} from './view/category/category.component';
import {DataHandlerService} from './service/data-handler.service';
import {TaskComponent} from './view/task/task.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EditTaskDialogComponent} from './dialog/edit-task-dialog/edit-task-dialog.component';
import {FormsModule} from "@angular/forms";
import {ConfirmDialogComponent} from './dialog/confirm-dialog/confirm-dialog.component';
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
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule
} from '@angular/material';

import {TaskDatePipe} from './pipe/task-date.pipe';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {EditCategoryDialogComponent} from './dialog/edit-category-dialog/edit-category-dialog.component';
import {AboutDialogComponent} from './dialog/about-dialog/about-dialog.component';
import {FooterComponent} from "./view/footer/footer.component";
import { HeaderComponent } from './view/header/header.component';
import { StatisticComponent } from './view/statistic/statistic.component';
import { StatisticCardComponent } from './view/statistic/statistic-card/statistic-card.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    TaskComponent,
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    TaskDatePipe,
    EditCategoryDialogComponent,
    FooterComponent,
    AboutDialogComponent,
    HeaderComponent,
    StatisticComponent,
    StatisticCardComponent
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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [DataHandlerService],
  entryComponents: [EditTaskDialogComponent, ConfirmDialogComponent, EditCategoryDialogComponent, AboutDialogComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
