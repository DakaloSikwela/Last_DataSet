import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userD: any[] = []; // Your user data array
  // ... Other properties ...

  editingIndex = -1;
  editedStudent: any = {};

  editStudent(index: number) {
      this.editingIndex = index;
      this.editedStudent = { ...this.userD[index] };
  }

  saveEdit() {
      if (this.editingIndex !== -1) {
          // Update the existing student in userD array
          this.userD[this.editingIndex] = { ...this.editedStudent };
          this.cancelEdit();
      }
  }

  cancelEdit() {
      this.editingIndex = -1;
      this.editedStudent = {};
  }

  // ... Other functions ...
}
