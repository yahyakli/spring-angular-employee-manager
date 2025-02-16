import { Component, inject, input, output } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { finalize } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-delete-modal',
  imports: [NgIf],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  onClose = output();
  employeeId = input<string>()
  employeeService = inject(EmployeeService);
  isDeleting = false;

  closeClick(){
    this.onClose.emit()
  }

  handleDelete(e: Event) {
    e.preventDefault();
    const id = this.employeeId();
    
    if (!id) {
      console.log('No Employee Selected');
      return;
    }

    this.isDeleting = true;
    this.employeeService.deleteEmployee(id).pipe(
      finalize(() => {
        this.isDeleting = false;
        this.closeClick();
      })
    ).subscribe({
      error: (error) => {
        console.error('Error deleting employee:', error);
      }
    });
  }
}
