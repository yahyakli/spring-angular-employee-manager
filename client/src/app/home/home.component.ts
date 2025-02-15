import { Component, inject, OnInit, signal } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';
import { catchError } from 'rxjs';
import { EditEmployeeComponent } from '../components/edit-employee/edit-employee.component';

@Component({
  selector: 'app-home',
  imports: [EditEmployeeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public employees = signal<Employee[]>([]);
  private employeeService = inject(EmployeeService);
  public showModal = signal<string>('');

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

  ngOnInit(): void {
    this.employeeService.getEmployeesfunc().subscribe(employees => {
      this.employees.set(employees);
    });
  }



}
