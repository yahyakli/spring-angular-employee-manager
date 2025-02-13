import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  imports: [],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  toggleShowModal = output<boolean>();

  closeClick(){
    this.toggleShowModal.emit(false);
  }
}
