import { CalculatorService } from './calculator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: []
})
export class CalculatorComponent implements OnInit {

  txaResult = "";

  number1 = null;
  number2 = null;
  resultId = "";
  txtId = "";

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit(): void {
  }

  createSum(): void{
    this.calculatorService.createSum({number1: this.number1 || 0, number2: this.number2 || 0})
    .subscribe(
      data => {
        this.resultId = data.id;
      },
      error => {
        alert('Error to create sum. Please try again');
        console.error(error);
    });
  }

  getResult(): void {
    this.calculatorService.getResult(this.txtId)
    .subscribe(
      data => {
        this.structureResult(data);
      },
      error => {
        alert('Error to create sum. Please try again');
        console.error(error);
    });
  }

  private structureResult(data: any): void{
    this.txaResult = `
      Number 1: ${data.number1},
      Number 2: ${data.number2},
      Result: ${data.result ? data.result : null},
      Status: ${data.status ? data.status : null}
      Creation Date: ${data.creationDateTime}`;
  }
}
