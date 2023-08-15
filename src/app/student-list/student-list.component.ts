import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  userD: any[] = []
  constructor(private userS:UserService){}

  ngOnInit(): void{
    this.userD = this.userS.getUsers();
  }
}
