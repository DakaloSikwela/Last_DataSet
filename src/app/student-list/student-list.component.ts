import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  userD: any[] = [];
  editingIndex: number | null = null; // Track the index of the student being edited

  // Initialize an empty object to hold edited student data
  editedStudent: any = {
    name: '',
    Surname: '',
    email: '',
    Age: 0
  };

  constructor(private userS: UserService) {}

  ngOnInit(): void {
    this.userD = this.userS.getUsers();
  }

  editStudent(index: number) {
    this.editingIndex = index;
    // Copy the data of the student being edited to the editedStudent object
    this.editedStudent = { ...this.userD[index] };
  }

  saveEditedStudent(index: number) {
    // Update the original student data with the edited data
    this.userD[index] = { ...this.editedStudent };
    this.cancelEdit(); // Reset editing state
  }

  cancelEdit() {
    this.editingIndex = null;
    this.editedStudent = {
      name: '',
      Surname: '',
      email: '',
      Age: 0
    };
  }

  deleteStudent(index: number) {
    // Remove the student at the specified index from the userD array
    this.userD.splice(index, 1);
  }

  addStudent() {
    // You can implement the logic for adding a new student here
  }

  // Pagination properties
  pageSize = 10;
  currentPage = 0;

  // Pagination event handler
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
  }
}
