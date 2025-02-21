import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: false,
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  name: string = '';
  phoneNumber: string = '';
  email: string = '';
  tnbBill: number = 0;
  location: string = '';
  savings: number = 0;
  calculated: boolean = false;

  calculateSavings() {
    if (this.tnbBill > 0) {
      this.savings = this.tnbBill * 0.8; // Example: Assume 80% savings
      this.calculated = true; // Show the results section
    }
  }

  resetForm() {
    this.calculated = false; // Hide the results
    this.name = '';
    this.phoneNumber = '';
    this.email = '';
    this.tnbBill = 0;
    this.location = '';
    this.savings = 0;
  }
}
