import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private backend_url = '';
  private http = inject(HttpClient)

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.backend_url}/employee`);
  }

  public getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.backend_url}/employee/${id}`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.backend_url}/employee`, employee);
  }

  public updateEmployee(employee: Employee, id: string): Observable<Employee> {
    return this.http.put<Employee>(`${this.backend_url}/employee/${id}`, employee);
  }

  public deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.backend_url}/employee/${id}`);
  }
}
