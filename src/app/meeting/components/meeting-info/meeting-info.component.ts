import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { Meeting } from '../../model/meeting.entity';

@Component({
  selector: 'app-meeting-info',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './meeting-info.component.html',
  styleUrls: ['./meeting-info.component.css']
})
export class MeetingInfoComponent {
  meeting: Meeting;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Meeting, private dialogRef: MatDialogRef<MeetingInfoComponent>) {
    this.meeting = data; // Asigna los datos recibidos directamente
  }

  onClose(): void {
    this.dialogRef.close(); // Cierra el diálogo
  }

  copyLink(): void {
    const link = this.meeting.link;
    navigator.clipboard.writeText(link).then(() => {
      console.log('Link copied to clipboard'); // Mensaje de éxito (puedes personalizarlo)
    }).catch(err => {
      console.error('Could not copy link: ', err); // Manejo de errores
    });
  }
}
