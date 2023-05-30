import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

interface Appointment {
  date: Date;
  title: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  selectedDate?: Date;
  time: string[];
  appointments: { [key: string]: string } = {};
  displayedColumns: string[] = ['horario', 'compromisso'];

  constructor(public dialog: MatDialog) {
    this.time = [];
  }

  onDateSelected(date: Date) {
    this.time = [];

    for (let i = 1; i <= 24; i++) {
      this.time.push(i + 'am');
    }
  }

  openFormDialog(horario: string) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '250px',
      data: { title: this.appointments[horario] || '' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appointments[horario] = result;
      }
    });
  }

  removeAppointment(horario: string) {
    delete this.appointments[horario];
  }
}
