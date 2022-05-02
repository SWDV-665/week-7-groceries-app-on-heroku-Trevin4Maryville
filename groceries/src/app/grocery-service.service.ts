import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GroceryService {


  items: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "https://groceries-server-hartzler.herokuapp.com";

  constructor(public http: HttpClient) {
    console.log("Hello GroceryService Provider");

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError),
    );
    console.log(this.items)
  }
  
  private extractData(res: Response) {
    let body = res;
    this.items = body;
    return body || {};
  }
  
  getItemsLength(): number {
    // console.log(this.items)
    return this.items.length;
  }

  private handleError(error: Response | any, caught?: Observable<any>) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return throwError(errMsg);
  }
  
  removeItem(item) {
    console.log("Remove Item - ID = ",item._id);
    this.http.delete(this.baseURL + "/api/groceries/" + item._id).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    })
  }

  addItem(item) {
    this.http.post(this.baseURL + '/api/groceries/', item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    })  
  }  
  
  editItem(item, index) {
    console.log("Editing Item - ID = ", item._id);
    this.http.put(this.baseURL + '/api/groceries/' + item._id, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);

    })  
  }  


}
