import { Component, inject, OnInit, signal } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';
import { catchError } from 'rxjs';
import { EditEmployeeComponent } from '../components/edit-employee/edit-employee.component';
import { DeleteModalComponent } from '../components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-home',
  imports: [EditEmployeeComponent, DeleteModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private employeeService = inject(EmployeeService);
  public employees = this.employeeService.employees;
  public showModal = signal<string>('');
  public selectedDelete = signal<string>('');

  setSelectedDelete(employeeId: string){
    this.selectedDelete.set(employeeId);
  }

  public toggleShowModal(employeeId: string) {
    this.showModal.set(employeeId);
  }

  updateEmployee(employee: Employee) {
    this.employees().forEach(emp => {
      if (emp.id === employee.id) {
        emp.name = employee.name;
        emp.email = employee.email;
        emp.phone = employee.phone;
        emp.jobTitle = employee.jobTitle;
        emp.imageUrl = employee.imageUrl;
      }
    })
  }
}
