import { Component, signal } from '@angular/core';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-header',
  imports: [AddEmployeeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showModal = signal<boolean>(false);

  toggleShowModale() {
    this.showModal.set(!this.showModal());
    console.log(this.showModal());
  }
}
