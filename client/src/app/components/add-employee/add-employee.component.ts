import { Component, inject, input, output } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { Employee } from '../../model/employee';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  toggleShowModal = output<boolean>();
  employeeService = inject(EmployeeService);
  addedEmployee = output<Employee>();
  private fb = inject(FormBuilder);

  employeeForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    phone: ['', Validators.required],
    jobTitle: ['', Validators.required],
    imageUrl: ['', Validators.required],
  })

  handleSubmit(e: Event){
    e.preventDefault();
    if(this.employeeForm.valid){
      this.employeeService.addEmployee(this.employeeForm.value).pipe(
        catchError(err => {
          console.log(err);
          throw err;
        })
      ).subscribe(employee => {
        this.addedEmployee.emit(employee);
      })
    }
  }

  closeClick(){
    this.toggleShowModal.emit(false);
  }
}
