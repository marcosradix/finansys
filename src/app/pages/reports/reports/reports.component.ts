import { EntryService } from './../../entries/shared/entry.service';
import { EntryModel } from './../../entries/shared/model/entry.model';
import { CategoryService } from './../../categories/shared/category.service';
import { CategoryModel } from './../../categories/shared/category.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  expensiveTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;
  expensiveChartData: any = 0;
  revenueChartdata: any = 0;
  chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  categories: Array<CategoryModel> = [];
  entries: Array<EntryModel> = [];
  @ViewChild("month") month: ElementRef = null;
  @ViewChild("year") year: ElementRef = null;

  constructor(
    private categoryService: CategoryService,
    private entryService: EntryService
  ) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }
  generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;
    if (!month || !year) {
      alert("Você deve informar o mês e ou ano para gerar esse relatório.");
    } else {
      this.entryService.getByMonthAndYear(month, year).subscribe(this.setValues.bind(this))
    }
  }
  private setValues(entries: Array<EntryModel>) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let expensiveTotal = 0;
    let revenueTotal = 0;
    this.entries.forEach(entry => {
      if (entry.type == 'revenue') {
        revenueTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL' });
      } else {
        expensiveTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL' });
      }
    });
    this.expensiveTotal = currencyFormatter.format(expensiveTotal, { code: 'BRL' });
    this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL' });
    this.balance = currencyFormatter.format(revenueTotal - expensiveTotal, { code: 'BRL' });
  }
  private setChartData() {
    this.revenueChartdata = this.getChartData("revenue", "GRÁFICO DE RECEITAS", "#9ccc65");
    this.revenueChartdata = this.getChartData("expensive", "GRÁFICO DE DESPESAS", "#e03131");


  }

  private getChartData(entryType: string, title: string, color: string ){
    const chartData = []; 
    this.categories.forEach(category => {
      const filteredEntries = this.entries.filter(entry => {
        (entry.categoryId == category.id) && (entry.type == entryType)
      });
      if (filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce(
          (total, entry) => total + currencyFormatter.unformat(entry.amount, { code: 'BRL' }), 0
        )
        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount
        });
      }
    });
    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [
        {
          label: title,
          backgroundColor: color,
          data: chartData.map(item => item.totalAmount)
        }
      ]
    }
  }
}
