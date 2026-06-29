import { Component, OnInit } from '@angular/core';

interface BudgetItem {
  stage: string;
  module: string;
  task: string;
  allocation: string;
  standardHours: number;
  budget: number;
  actualHours: number;
  completion: number;
  expenses: number;
  actual: number;
}

@Component({
  selector: 'app-project-budget',
  templateUrl: './project-budget.component.html',
  styleUrls: ['./project-budget.component.scss']
})
export class ProjectBudgetComponent implements OnInit {

  allRows: BudgetItem[] = [
    { stage: "Prototyping", module: "Chasis", task: "Welding", allocation: "KK", standardHours: 30, budget: 15000, actualHours: 15, completion: 40, expenses: 1200, actual: 19950 },
    { stage: "Prototyping", module: "Chasis", task: "Cutting", allocation: "RK", standardHours: 20, budget: 10000, actualHours: 10, completion: 50, expenses: 800, actual: 12500 },
    { stage: "Prototyping", module: "Body", task: "Painting", allocation: "MK", standardHours: 40, budget: 20000, actualHours: 22, completion: 55, expenses: 3200, actual: 28000 },
    { stage: "Prototyping", module: "Body", task: "Priming", allocation: "SK", standardHours: 15, budget: 8000, actualHours: 8, completion: 53, expenses: 1100, actual: 10200 },
    { stage: "Design", module: "Electrical", task: "Wiring", allocation: "PK", standardHours: 50, budget: 25000, actualHours: 20, completion: 40, expenses: 4500, actual: 30000 },
    { stage: "Design", module: "Electrical", task: "Circuit Layout", allocation: "AK", standardHours: 35, budget: 18000, actualHours: 14, completion: 40, expenses: 2800, actual: 22000 },
    { stage: "Design", module: "Mechanical", task: "CAD Modeling", allocation: "VK", standardHours: 60, budget: 30000, actualHours: 25, completion: 42, expenses: 5000, actual: 36000 },
    { stage: "Testing", module: "QA", task: "Functional Test", allocation: "DK", standardHours: 25, budget: 12000, actualHours: 8, completion: 32, expenses: 900, actual: 15000 },
    { stage: "Testing", module: "QA", task: "Load Test", allocation: "BK", standardHours: 20, budget: 9000, actualHours: 5, completion: 25, expenses: 700, actual: 11000 },
  ];

  displayedRows: BudgetItem[] = [];
  stages: string[] = [];
  modules: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.stages = [...new Set(this.allRows.map(r => r.stage))];
    this.modules = [...new Set(this.allRows.map(r => r.module))];
    this.displayedRows = [...this.allRows];
  }

  applyFilters(stage: string, module: string): void {
    this.displayedRows = this.allRows.filter(r =>
      (!stage || stage === 'Any' || r.stage === stage) &&
      (!module || module === 'Any' || r.module === module)
    );
  }

  fmt(n: number): string {
    return new Intl.NumberFormat("en-IN").format(n);
  }

  getCompColor(val: number): string {
    if (val >= 50) return '#4caf50'; // Green
    if (val >= 35) return '#ff9800'; // Orange
    return '#f44336'; // Red
  }









    goBack(): void {
  window.history.back();
}
}