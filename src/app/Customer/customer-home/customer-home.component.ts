import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-home.component.html',
  styleUrl: './customer-home.component.css'
})
export class CustomerHomeComponent {

}
