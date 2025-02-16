import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { Employee } from '../model/employee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private backend_url = environment.backend_url;
  private http = inject(HttpClient);
  private employeesSignal = signal<Employee[]>([]);

  public employees = computed(() => this.employeesSignal());

  constructor() {
    this.loadEmployees();
  }

  private loadEmployees(): void {
    this.getEmployeesFromApi().subscribe();
  }

  private getEmployeesFromApi() {
    return this.http.get<Employee[]>(`${this.backend_url}/employee`).pipe(
      tap(employees => this.employeesSignal.set(employees)),
      catchError(err => {
        console.error('Error loading employees:', err);
        throw err;
      })
    );
  }

  public getEmployee(id: string) {
    return this.http.get<Employee>(`${this.backend_url}/employee/${id}`);
  }

  public addEmployee(employee: Employee) {
    return this.http.post<Employee>(`${this.backend_url}/employee`, employee).pipe(
      tap(newEmployee => {
        this.employeesSignal.update(employees => [...employees, newEmployee]);
      })
    );
  }

  public updateEmployee(employee: Employee, id: string) {
    return this.http.put<Employee>(`${this.backend_url}/employee/${id}`, employee).pipe(
      tap(updatedEmployee => {
        this.employeesSignal.update(employees =>
          employees.map(emp => emp.id === id ? updatedEmployee : emp)
        );
      })
    );
  }

  public deleteEmployee(id: string) {
    return this.http.delete<void>(`${this.backend_url}/employee/${id}`).pipe(
      tap(() => {
        this.employeesSignal.update(employees =>
          employees.filter(emp => emp.id !== id)
        );
      })
    );
  }

  public refreshEmployees() {
    return this.getEmployeesFromApi();
  }

}