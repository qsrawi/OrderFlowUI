import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-supplier-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './supplier-home.component.html',
  styleUrl: './supplier-home.component.css'
})

export class SupplierHomeComponent {

}
