import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  @Input()
  private categories: Category[];

  @Output()
  tellToSubscribes = new EventEmitter<Category>();

  selectedCategory: Category;

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit() {
  }

  showTasksByCategory(category: Category) {
    if (this.selectedCategory === category) {
      return;
    }
    this.selectedCategory = category;
    this.tellToSubscribes.emit(this.selectedCategory);
  }

}
