import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-calculator',
  standalone: false,
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  constructor(private userService: UserService) { }

  // User Inputs
  name: string = '';
  phoneNumber: string = '';
  email: string = '';
  tnbBill: number | null = null;
  location: string = '';

  // Calculation Results
  savings: number = 0;
  systemSize: number = 0;
  totalSystemCost: number = 0;
  targetMonthlyPayment: number = 0;
  loanTerm: number = 0;
  calculated: boolean = false;

  // Constants
  readonly TNB_TARIFF: number = 0.509;  // RM per kWh
  readonly SOLAR_PANEL_COST: number = 3000;  // RM per kWp
  readonly PEAK_SUN_HOURS: number = 3;  // hours per day
  readonly SYSTEM_LOSS_FACTOR: number = 0.8;  // 80% efficiency
  readonly INTEREST_RATE: number = 0.05;  // 5% per annum
  readonly TARGET_SAVINGS_PERCENT: number = 0.3;  // 30% of current bill

  calculateSavings() {
    if (this.tnbBill && this.tnbBill >= 50) {
      // Calculate Monthly Energy Consumption (kWh)
      const monthlyEnergy = this.tnbBill / this.TNB_TARIFF;

      // Calculate Daily Energy Consumption (kWh)
      const dailyEnergy = monthlyEnergy / 30;

      // Calculate Required System Size (kWp)
      this.systemSize = dailyEnergy / (this.PEAK_SUN_HOURS * this.SYSTEM_LOSS_FACTOR);

      // Calculate Total System Cost
      this.totalSystemCost = this.systemSize * this.SOLAR_PANEL_COST;

      // Calculate Target Monthly Payment
      this.targetMonthlyPayment = this.tnbBill * (1 - this.TARGET_SAVINGS_PERCENT);

      // Calculate Loan Term using Loan Formula
      this.loanTerm = this.calculateLoanTerm(this.totalSystemCost, this.targetMonthlyPayment, this.INTEREST_RATE);

      // Calculate Savings
      this.savings = this.tnbBill * this.TARGET_SAVINGS_PERCENT;

      this.calculated = true;

      //Save User Input To Database
      this.saveUserData();
    }
  }

  calculateLoanTerm(principal: number, targetPayment: number, interestRate: number): number {
    const monthlyRate = interestRate / 12;
    let n = 12;

    while (true) {
      const payment = (principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
        (Math.pow(1 + monthlyRate, n) - 1);

      if (payment <= targetPayment || n > 300) { // Max 25 years (300 months)
        return n / 12;
      }
      n += 12;
    }
  }

  saveUserData() {
    const userData = {
      name: this.name,
      phoneNumber: this.phoneNumber,
      email: this.email,
    };

    this.userService.saveUser(userData).subscribe(
      response => console.log('User data saved:', response),
      error => console.error('Error saving user data:', error)
    );
  }

  resetForm() {
    this.calculated = false;
    this.name = '';
    this.phoneNumber = '';
    this.email = '';
    this.tnbBill = null;
    this.location = '';
    this.savings = 0;
    this.systemSize = 0;
    this.totalSystemCost = 0;
    this.targetMonthlyPayment = 0;
    this.loanTerm = 0;
  }
}
