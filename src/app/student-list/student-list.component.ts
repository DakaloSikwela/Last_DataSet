//import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ModalService } from '../modal.service'
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import  User  from '../../student.json';

//import { User } from '../user.model';

// Import your User model or interface




import { AddStudentModalComponent } from '../add-student-modal-component/add-student-modal-component.component';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import form related classes

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  userD: any[] = [];
  editingIndex: number | null = null;
  editedStudent: any = {
    name: '',
    Surname: '',
    email: '',
    Age: 0
  };

    // New properties for infinite scrolling
    pageSize = 10; // Number of items per page
    currentPage = 0; // Current page index

      // Add ViewChild reference to the paginator
      @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  


    // Method to load more data on scrolling

     // Method to determine whether more data can be loaded
  canLoadMoreData(): boolean {
    return this.userD.length < (this.currentPage + 1) * this.pageSize;
  }

   // Method to track items in ngFor
   trackByFn(index: number, item: any): number {
    return item.id; // Use a unique identifier here
  }

  isAddFormVisible = false;

  // Add a FormGroup for the new student form
  newStudentForm: FormGroup;

  constructor(
    private userS: UserService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private modalService: ModalService
  ) {
    // Initialize the new student form
    this.newStudentForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [0, Validators.min(0)],
    });
  }

  ngOnInit(): void {
    this.userD = this.userS.getUsers();
  
    
    this.modalService.showModal$.subscribe(showModal => {
      if (showModal) {
        // Logic to open the modal here
        // You can use a library like Angular Material's MatDialog or a custom solution
      }
    });
    
  }
  loadData() {
    this.modalService.loadMoreData().subscribe(newData => {
      this.userD = this.userD.concat(newData);
    });
  }
  loadMoreData() {
    if (this.modalService.canLoadMoreData()) {
      this.modalService.incrementPage(); // Increment the current page
      this.loadData();
    }
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


  // Pagination event handler
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
  }

  toggleAddForm() {
    // Toggle the value to show/hide the form
    this.isAddFormVisible = !this.isAddFormVisible;
    if (!this.isAddFormVisible) {
      this.newStudentForm.reset(); // Reset the form when hiding
    }
  }


    /////////////////////////////////add student modal//////////////////////////////////////////////////////
    addStudent(): void {
      
      const dialogRef = this.dialog.open(AddStudentModalComponent, {
        width: '400px', // Set the width as needed
        data: {
          callback: (newStudent: any) => {
            this.userD.push(newStudent);
            console.log(newStudent)
          }
        }
      });
  
    }
    // dialogRef: any.afterClosed().subscribe(() => {
    //   // Handle any actions after the modal is closed
    //   // For example, you can reset the form here
    //   // this.newStudentForm.reset();
    // });
  


    // Callback function to add a new student
    addNewStudent(newStudent: any) {
      // Add the new student to tconshe userD array
      console.log(newStudent)
      this.userD.push(newStudent);
    }

    // saving student model
    onSave() {
      // Handle form submission logic here
      // You can emit an event or perform API calls to save the new student data
      // After saving, you can close the modal
      this.modalService.hideModal();
    }
  
    onCancel() {
      this.modalService.hideModal();
    }
  
 
}
