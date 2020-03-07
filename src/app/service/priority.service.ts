import { Injectable } from '@angular/core';
import {Priority} from "../model/priority";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class PriorityService {

  constructor(private http: HttpClient) { }

  addPriority(priority: Priority): Observable<Priority> {
    return this.http.post<Priority>('http://localhost:8889/api/priority/create', priority);
  }

  getPriority(id: number): Observable<Priority> {
    return this.http.get<Priority>('http://localhost:8889/api/priority/get/' + id);
  }

  updatePriority(priority: Priority): Observable<Priority> {
    return this.http.post<Priority>('http://localhost:8889/api/priority/update', priority);
  }

  deletePriority(id: number): Observable<Priority> {
    return this.http.get<Priority>('http://localhost:8889/api/priority/delete/' + id);
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.http.get<Priority[]>('http://localhost:8889/api/priority/list');
  }
}
