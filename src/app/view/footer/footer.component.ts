import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AboutDialogComponent} from "../../dialog/about-dialog/about-dialog.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private year: Date;
  private site = 'https://itstep.org/';
  private blog = 'https://itstep.org/';
  private siteName = 'JavaAngular';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.year = new Date(); // текуший год
  }

  // окно "О программе"
  private openAboutDialog() {
    this.dialog.open(AboutDialogComponent,
      {
        autoFocus: false,
        data: {
          dialogTitle: 'О программе',
          message: 'Данное приложение было created in ITStep'
        },
        width: '400px'
      });

  }

}
