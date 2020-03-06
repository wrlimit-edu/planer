import { Injectable } from '@angular/core';
import {Priority} from "../model/priority";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class PriorityService {

  constructor(private http: HttpClient) { }

  addPriority(priority: Priority): Observable<any> {
    return this.http.post('http://localhost:8889/api/priority/create', priority);
  }

  getPriority(id: number): Observable<any> {
    return this.http.get('http://localhost:8889/api/priority/get/' + id);
  }

  updatePriority(priority: Priority): Observable<any> {
    return this.http.post('http://localhost:8889/api/priority/update', priority);
  }

  deletePriority(id: number): Observable<any> {
    return this.http.get('http://localhost:8889/api/priority/delete/' + id);
  }

  getAllPriorities(): Observable<any> {
    return this.http.get('http://localhost:8889/api/priority/list');
  }
}
