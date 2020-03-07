import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Category} from "../model/category";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(category: Category):Observable<Category>{
    return this.http.post<Category>('http://localhost:8889/api/category/create', category);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>('http://localhost:8889/api/category/get/' + id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:8889/api/category/update', category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.get<Category>('http://localhost:8889/api/category/delete/' + id);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:8889/api/category/list');
  }

  searchCategories(name: string): Observable<Category[]> {
    return undefined;
    /*
    return of(TestData.categories.filter(
      cat => cat.name.toUpperCase().includes(name.toUpperCase()))
      .sort((c1, c2) => c1.name.localeCompare(c2.name)));
    */
  }

}
