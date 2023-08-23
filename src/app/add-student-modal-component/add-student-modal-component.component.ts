import { Component, Inject ,Input, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '../modal.service'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import form related classes
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';





@Component({
  selector: 'app-add-student-modal-component',
  templateUrl: './add-student-modal-component.component.html',
  styleUrls: ['./add-student-modal-component.component.css']
  

})
export class AddStudentModalComponent implements OnInit{
  @Input() userModel: any; 




  newStudent: any = {
    photo: '/assets/',
    name: '',
    Surname: '',
    email: '',
    Age: 0
  };

  
  selectedImage: SafeResourceUrl | undefined

  constructor(
    public dialogRef: MatDialogRef<AddStudentModalComponent>,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    //public activeModal: NgbActiveModal,
    @Inject(MAT_DIALOG_DATA) public data: { callback: (student: any) => void }
  ) {}

  ngOnInit(): void {
    this.newStudentForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [0, Validators.min(0)],
    });
  
  
  }

  newStudentForm!: FormGroup;


  


  onSave(): void {
    // Call the callback function to add the new student
    this.data.callback(this.newStudent);

    if (this.userModel) {
      // Perform the save logic using this.userModel
      console.log('User data to save:', this.userModel);
    }

    // Close the modal
    this.dialogRef.close();
    this.modalService.hideModal();

    // After adding a new student
    console.log(this.selectedImage )
    
   

  }

  onCancel(): void {
    // Close the modal without adding the student
    this.dialogRef.close();
   // this.activeModal.dismiss('cancel');
    this.modalService.hideModal();
  }
}
