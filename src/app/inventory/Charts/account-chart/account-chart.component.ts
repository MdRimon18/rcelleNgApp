import { Component, OnInit } from '@angular/core';
import { DailyIncomeExpanseService } from '../../../@core/mock/marchandizer/daily-income-expanse.service';
import * as Chart from 'chart.js';
@Component({
  selector: 'ngx-account-chart',
  templateUrl: './account-chart.component.html',
  styleUrls: ['./account-chart.component.scss']
})
export class AccountChartComponent implements OnInit {
  accountChart: any;
  constructor(private dailyIncomeExpanseService:DailyIncomeExpanseService) { }

  ngOnInit() {
    var today = new Date();
 
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();
    
     let endDate =  yyyy+ '-' +mm + '-'+ dd ;
     
    
     var sevenDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    var dd = String(sevenDaysAgo.getDate()).padStart(2, '0');
    var mm = String(sevenDaysAgo.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = sevenDaysAgo.getFullYear();
    let startDate = yyyy+ '-' +mm + '-'+ dd ;
      //let endDate = new Date("2023-12-31").getTime();
      this.dailyIncomeExpanseService.getAccountsByDateRange(startDate,endDate ).subscribe((data:any)=>{
      let creaditedData=data.filter(f=>f.account=='Credited');
      let DebitedData=data.filter(f=>f.account=='Debited');
        let groupedData1 = creaditedData.reduce((acc, curr) => {
        let date = curr.date;
        if (!acc[date]) {
          acc[date] = {entryDate: date, totalExpense: 0};
        }
        acc[date].totalExpense +=parseFloat(curr.totalExpense);
        return acc;
      }, {});
      let groupedData2= DebitedData.reduce((acc, curr) => {
        let date = curr.date;
        if (!acc[date]) {
          acc[date] = {entryDate: date, totalExpense: 0};
        }
        acc[date].totalExpense +=parseFloat(curr.totalExpense);
        return acc;
      }, {});
      // console.log(groupedData1)
      // console.log(groupedData2)
      let result1 = Object.values(groupedData1);
      let result2 = Object.values(groupedData2);

      // console.log(result1)
      // console.log(result2)
      let shortDayNames = result1.map((item:any) => {
       
        // let date = new Date(item.entryDate);
         let days = [];
         days.push(item.entryDate);
        return days;
      });
     // console.log(shortDayNames)
    let totalAmounts1 = result1.map((item:any) => item.totalExpense);
   // console.log(totalAmounts1)

    let totalAmounts2 = result2.map((item:any) => item.totalExpense);
  //  console.log(totalAmounts2)
      this.accountChart = new Chart('accountChart', {
        type: 'line',
        data: {
          labels:shortDayNames,
          datasets: [{
              label: 'Credited Amount',
              data: totalAmounts1,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
             // backgroundColor: 'rgba(252,119,119)',
              borderColor: 'rgba(84, 230, 157)',
              borderWidth: 4
          },
          {
            label: 'Debited Amount',
            data:totalAmounts2,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            // backgroundColor: 'rgba(252,119,119)',
             borderColor: 'rgb(255, 99, 132)',
             borderWidth: 4
          }
        ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      
      });
      })
  }

}
