import { Injectable } from '@angular/core';
import studentData from '../student.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers(){
  return studentData.users;

  }
  
}
// user.model.ts

