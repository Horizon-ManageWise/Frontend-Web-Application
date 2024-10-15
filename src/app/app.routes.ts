  import { Routes } from '@angular/router';



import { MeetingManagementComponent } from './meeting/pages/meeting-management/meeting-management.component'; // Cambia TimeLine a Timeline
import { RecordingManagementComponent } from './meeting/components/recording-management/recording-management.component'; // Cambia TimeLine a Timeline

  export const routes: Routes = [

    { path: 'meeting', component: MeetingManagementComponent },
{ path: 'recordings', component: RecordingManagementComponent},
    { path: '', redirectTo: 'project', pathMatch: 'full' }, // Redirección por defecto


  ];

