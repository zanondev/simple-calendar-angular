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
  selectedDate: Date | null = null;
  appointments: Appointment[] = [];
  titulo: string = '';
  isFormVisible = false;

  constructor(private dialog: MatDialog) {}

  onDateSelected(event: any): void {
    this.selectedDate = event.value;
    this.isFormVisible = true;
    if (this.selectedDate !== null) {
      this.openDialog();
    }
  }

  onDeleteSelected(): void {
    this.selectedDate = null;
  }

  onAddAppointment(title: string): void {
    if (this.selectedDate) {
      const appointment: Appointment = {
        date: this.selectedDate,
        title: this.titulo
      };
      this.appointments.push(appointment);
      this.titulo = '';
      this.selectedDate = null;
      this.isFormVisible = false;
    }
  }

  dateClass = (date: Date): string => {
    const appointment = this.getAppointment(date);
    return appointment ? 'has-appointment' : '';
  };

  public getAppointment(date: Date): Appointment | undefined {
    return this.appointments.find(a => a.date.toDateString() === date.toDateString());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '300px',
      data: { date: this.selectedDate },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.titulo = result;
        this.onAddAppointment(result);
      }
    });
  }
}
