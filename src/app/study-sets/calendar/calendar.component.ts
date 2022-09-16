import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DailyRecord } from 'src/app/entitiy/daily-record';
import { DailyRecordService } from 'src/app/service/daily-record.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private service: DailyRecordService) { }

  records: DailyRecord[] | undefined;
  now: Date = new Date();;
  month: Date[] = [];
  monthNames: string[] = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  selectedMonth = new FormGroup({
    month: new FormControl(new Date().getMonth())
  })

  ngOnInit(): void {

    this.service.getDailyRecords().subscribe(res => {

      this.records = res;
      this.month = this.getAllDaysInMonth(this.now.getFullYear(), this.now.getMonth())

    });

    this.selectedMonth.valueChanges.subscribe(res => {

      if (res.month != null || res.month != undefined)
        this.month = this.getAllDaysInMonth(2022, res.month)
    })


  }



  getAllDaysInMonth(year: number, month: number) {
    const date = new Date(year, month, 1);

    const dates = [];

    while (date.getMonth() == month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }

  isTasksDone(day: Date):string {

    let record = this.records?.find(element => {return element.date == day.toLocaleDateString()})

    if(record == undefined) return "white"

    return record?.tasks.find(element => element.isDone) != undefined ? "green" : "yellow"

  }




}
