import {ICommon} from "./icommon";
import {Category} from "../../model/category";
import {Observable} from "rxjs";

export interface ICategoryArray extends ICommon<Category> {
  search(title: string): Observable<Category[]>;
}
