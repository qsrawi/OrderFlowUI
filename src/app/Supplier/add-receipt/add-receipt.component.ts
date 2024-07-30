import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-receipt',
  templateUrl: './add-receipt.component.html',
  styleUrls: ['./add-receipt.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AddReceiptComponent {
  selectedTab: string = 'Cash';
  selectedSubTab: string = 'CashReceipt';

  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.selectedSubTab = tab === 'Cash' ? 'CashReceipt' : 'ChequeReceipt';
  }

  selectSubTab(subTab: string): void {
    this.selectedSubTab = subTab;
  }
}
