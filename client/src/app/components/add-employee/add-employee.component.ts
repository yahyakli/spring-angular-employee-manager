import { Component, inject, input, output } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  imports: [],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  toggleShowModal = output<boolean>();
  employeeService = inject(EmployeeService);

  handleSubmit(e: Event){
    e.preventDefault();
    
  }

  closeClick(){
    this.toggleShowModal.emit(false);
  }
}
