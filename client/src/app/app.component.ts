import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './model/employee';
import { EmployeeService } from './services/employee.service';
import { catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Employees Manager';

  public employees = signal<Employee[]>([]);
  private employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().pipe(
      catchError(err => {
        console.log(err);
        alert(err.message)
        throw err;
      })
    ).subscribe(employees => {
      this.employees.set(employees);
      console.log(employees);
    })
  }

}
