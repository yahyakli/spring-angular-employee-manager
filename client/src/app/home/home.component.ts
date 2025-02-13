import { Component, inject, OnInit, signal } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  public employees = signal<Employee[]>([]);
  private employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().pipe(
      catchError(err => {
        console.log(err);
        alert(err.message);
        throw err;
      })
    ).subscribe(employees => {
      this.employees.set(employees);
    })
  }

}
