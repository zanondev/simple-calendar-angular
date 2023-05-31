import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

interface Appointment {
  date: Date;
  hour: number;
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
  appointments: Appointment[] = [];
  displayedColumns: string[] = ['hour', 'actions', 'appointment'];

  constructor(public dialog: MatDialog) {
    this.time = [];
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    this.time = [];

    for (let i = 1; i <= 24; i++) {
      this.time.push(i + 'am');
    }
  }

  openFormDialog(hour: string) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '250px',
      data: { title: this.getAppointmentForHour(hour)?.title || '' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const appointment: Appointment = {
          date: this.selectedDate!,
          hour: parseInt(hour),
          title: result
        };
        this.appointments.push(appointment);
      }
    });
  }

  removeAppointment(hour: string) {
    const appointmentIndex = this.appointments.findIndex(a =>
      a.date.toDateString() === this.selectedDate!.toDateString() && a.hour === parseInt(hour)
    );
    
    if (appointmentIndex > -1) {
      this.appointments.splice(appointmentIndex, 1);
    }
  }

  getAppointmentForHour(hour: string): Appointment | undefined {
    return this.appointments.find(a =>
      a.date.toDateString() === this.selectedDate!.toDateString() && a.hour === parseInt(hour)
    );
  }

  getAppointmentsForSelectedDate(): Appointment[] {
    return this.appointments.filter(a => a.date.toDateString() === this.selectedDate!.toDateString());
  }
}
