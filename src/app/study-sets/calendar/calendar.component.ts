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
getNextDate(_t43: number): any {
throw new Error('Method not implemented.');
}
getAfterDate(_t43: number): any {
throw new Error('Method not implemented.');
}

  constructor(private service: DailyRecordService) { }

  records: DailyRecord[] | undefined;
  now: Date = new Date();
  month: Date[] = [];
  monthNames: string[] = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  selectedMonth = new FormGroup({
    month: new FormControl(new Date().getMonth())
  })

  ngOnInit(): void {

    this.service.getMonthlyRecords().subscribe(res => {

      this.records = res.find(el => el.name == (this.now.getMonth()+1) + "-" + this.now.getFullYear())?.days;
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

    const today = new Date();

    let record = this.records?.find(element => {return element.date == day.toLocaleDateString()})

    if(record == undefined || record.tasks.length == 0) return "white"

    if(record?.tasks.find(element => !element.isDone) == undefined) return "green"

    if(day.getMonth() < today.getMonth()){

      return "red"

    }else{

      if(day.getMonth() == today.getMonth() && day.getDate() < today.getDate()) return "red"

      return "yellow"

    }



  }

  getIsDateTasks(day:Date , i : number):boolean{
    var date = new Date()
    date.setDate(day.getDate() + i)
    let record = this.records?.find(element => {return element.date == date.toLocaleDateString()})
    if(record == undefined || record.tasks.length == 0) return true
    return false
  }
}
