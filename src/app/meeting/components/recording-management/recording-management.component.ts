import { Component, inject, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MeetingCreateAndEditComponent } from '../../components/meeting-create-and-edit/meeting-create-and-edit.component';
import { Meeting } from '../../model/meeting.entity';
import { MeetingService } from '../../services/meeting.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MeetingInfoComponent } from '../../components/meeting-info/meeting-info.component';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-recording-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule, // Asegúrate de importar MatPaginatorModule
    MeetingCreateAndEditComponent,
    MeetingInfoComponent,
    NgClass,
    TranslateModule,
    MatTableModule
  ],
  templateUrl: './recording-management.component.html',
  styleUrls: ['./recording-management.component.css']
})
export class RecordingManagementComponent implements OnInit {
  // Atributos
  meetingData: Meeting;
  meeting!: Array<Meeting>; // Cambiamos dataSource por l
  isEditMode: boolean;

  private meetingService: MeetingService = inject(MeetingService);
  private matDialog: MatDialog = inject(MatDialog);

  // Constructor
  constructor() {
    this.isEditMode = false;
    this.meetingData = {} as Meeting;
    this.meeting = [];
  }

  // Métodos Privados
  private resetEditState(): void {
    this.isEditMode = false;
    this.meetingData = {} as Meeting;
  }

  // Acciones CRUD
  private getAllSubResources(): void {
    this.meetingService.getAll();
  }

  private getAllResources(): void {
    this.meetingService.getAll().subscribe((response: any) => {
      this.meeting = response; // Asignamos la respuesta
    });
  }

  private createResource(): void {
    this.meetingService.create(this.meetingData).subscribe(response => {
      this.meeting.push({ ...response }); // Agregamos el nuevo recurso
    });
  }

  private updateResource(): void {
    let resourceToUpdate: Meeting = this.meetingData;
    this.meetingService.update(this.meetingData.id, resourceToUpdate).subscribe(response => {
      this.meeting = this.meeting.map(resource => {
        if (resource.id === response.id) {
          return response;
        }
        return resource;
      });
    });
  }

  private deleteResource(id: number): void {
    this.meetingService.delete(id).subscribe(() => {
      this.meeting = this.meeting.filter(meeting => meeting.id !== id); // Filtramos el recurso eliminado
    });
  }

  // Controladores de Eventos de UI
  onEditItem(element: Meeting) {
    this.isEditMode = true;
    this.meetingData = element;
    this.onOpenDialog();
  }

  onAddItem() {
    this.isEditMode = false;
    this.meetingData = {} as Meeting;
    this.onOpenDialog();
  }

  onDeleteItem(element: Meeting) {
    this.deleteResource(element.id);
  }

  onOpenDialog() {
    const _matdialog = this.matDialog.open(MeetingCreateAndEditComponent, {
      width: '500px',
      height: '400px',
      data: { meeting: this.meetingData, editMode: this.isEditMode }
    });
    _matdialog.afterClosed().subscribe(() => {
      this.getAllResources();
    });
  }

  // Método para abrir un enlace
  openLink(url: string): void {
    window.open(url, '_blank');
  }

  // Método para abrir la sección de grabaciones
  openRecordings(): void {
    window.open('http://localhost:4200/recordings', '_blank'); // Ajusta la URL según la ruta de tus grabaciones
  }

  // Hooks del Ciclo de Vida
  ngOnInit(): void {
    this.getAllResources();
    this.getAllSubResources();
  }

  onViewItem(element: Meeting): void {
    const dialogRef = this.matDialog.open(MeetingInfoComponent, {
      width: '400px', // Ajusta el ancho del diálogo según sea necesario
      data: element // Pasa el objeto de la reunión seleccionada al diálogo
    });

    dialogRef.afterClosed().subscribe(() => {
      // Aquí puedes manejar cualquier acción después de cerrar el diálogo si es necesario
    });
  }
}
