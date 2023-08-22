import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
//import  User  from '../student.json';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  private showModalSubject = new BehaviorSubject<boolean>(false);
  public showModal$: Observable<boolean> = this.showModalSubject.asObservable();
  private currentPage = 0;
  private pageSize = 10; 
  public userD: User[] = [];

  constructor(private http: HttpClient) {}

  loadMoreData(): Observable<User[]> {
    const url = `/api/users?page=${this.currentPage}&pageSize=${this.pageSize}`; // Adjust the URL
    return this.http.get<User[]>(url);
  }
  // Method to determine whether more data can be loaded
  canLoadMoreData(): boolean {
    return this.userD.length < (this.currentPage + 1) * this.pageSize;
  }

   // Increment the current page and return its value
   incrementPage(): number {
    this.currentPage++;
    return this.currentPage;
  }


  showAddStudentModal() {
    this.showModalSubject.next(true);
  }

  hideModal() {
    this.showModalSubject.next(false);
  }
}
