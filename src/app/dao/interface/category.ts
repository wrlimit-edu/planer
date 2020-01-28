import { Common } from "./common";
import { Observable } from "rxjs";

export interface Category extends Common<Category> {

  search(title: string): Observable<Category[]>;
}
