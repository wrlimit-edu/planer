import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'taskDate'
})

export class TaskDatePipe extends DatePipe implements PipeTransform {

  transform(date: Date | string, format: string = 'mediumDate'): string {

    if (date == null) {
      return 'Без срока';
    }

    date = new Date(date);

    const currentDate = new Date();

    return date.getSeconds().toString();

    /*
    console.log(currentDate.valueOf());

    if (date.valueOf() === currentDate.valueOf()) {
      return 'Сегодня';
    }

    /*
    if (date.getDate() === currentDate - 1) {
      return 'Вчера';
    }

    if (date.getDate() === currentDate + 1) {
      return 'Завтра';
    }
     */

    return new DatePipe('ru-RU').transform(date, format);
  }

}
