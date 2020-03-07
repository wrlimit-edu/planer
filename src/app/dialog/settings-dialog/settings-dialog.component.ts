import { Component, OnInit } from '@angular/core';
import {Priority} from "../../model/priority";
import {MatDialogRef} from "@angular/material/dialog";
import {PriorityService} from "../../service/priority.service";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
// диалоговое окно настроек приложения
// т.к. настройки не привязаны к другим компонентам (окнам),
// то он самостоятельно может загружать нужные данные с помощью dataHandler (а не получать их с помощью @Input)

export class SettingsDialogComponent implements OnInit {

  private priorities: Priority[];

  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>, // для возможности работы с текущим диалог. окном
    private priorityService: PriorityService // ссылка на сервис для работы с данными
  ) {
  }

  ngOnInit() {
    // получаем все значения, чтобы отобразить настроку цветов
    this.priorityService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  // нажали Закрыть
  private onClose() {
    this.dialogRef.close(false);
  }

  // добавили приоритет
  private onAddPriority(priority: Priority): void {
    this.priorityService.addPriority(priority).subscribe();
  }

  // удалили приоритет
  private onDeletePriority(priority: Priority): void {
    this.priorityService.deletePriority(priority.id).subscribe();
  }

  // обновили приоритет
  private onUpdatePriority(priority: Priority): void {
    this.priorityService.updatePriority(priority).subscribe();
  }

}
