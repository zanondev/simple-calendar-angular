import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSaveClick(): void {
    // Lógica para salvar o título do compromisso
    // Pode ser uma chamada a um serviço ou manipulação local dos dados
    this.dialogRef.close(this.data.title);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}