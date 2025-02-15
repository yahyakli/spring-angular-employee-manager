import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../model/employee';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit {
  employeeId = input<string>();
  employee = signal<Employee | null>(null);
  onClose = output();
  employeeService = inject(EmployeeService);
  private fb = inject(FormBuilder);

  employeeForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    jobTitle: ['', Validators.required],
    imageUrl: ['', Validators.required]
  });

  ngOnInit(): void {
    const id = this.employeeId();
    if (!id) {
      console.error("Employee ID is missing!");
      return;
    }

    this.fetchEmployee(id);
  }

  fetchEmployee(id: string) {
    this.employeeService.getEmployee(id).pipe(
      catchError(err => {
        console.error('Error fetching employee:', err);
        throw err;
      })
    ).subscribe(employee => {
      this.employee.set(employee);
      this.employeeForm.patchValue({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        jobTitle: employee.jobTitle,
        imageUrl: employee.imageUrl
      });
    });
  }

  closeModal() {
    this.onClose.emit();
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    if (this.employeeForm.valid) {
      const updatedEmployee: Employee = {
        id: this.employeeId()!,
        ...this.employeeForm.value
      };

      this.employeeService.updateEmployee(updatedEmployee).pipe(
        catchError(err => {
          console.error('Error updating employee:', err);
          throw err;
        })
      ).subscribe(() => {
        this.closeModal();
      });
    }
  }
}