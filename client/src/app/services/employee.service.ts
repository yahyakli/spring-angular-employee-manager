import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Employee } from '../model/employee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private backend_url = environment.backend_url;
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

  public getEmployeesfunc(): Observable<Employee[]> {
    return this.getEmployees().pipe(
      catchError(err => {
        console.error(err);
        alert(err.message);
        return throwError(() => err);
      })
    );
  }

  public
}

