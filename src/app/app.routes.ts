  import { Routes } from '@angular/router';
  import { StatisticsPageComponent } from './statistic/pages/statistics-page/statistics-page.component'; // Importa el componente de estadísticas
  import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
  import { TimelinePageComponent } from './statistic/pages/timeline-page/timeline-page.component'; // Cambia TimeLine a Timeline

  export const routes: Routes = [
    { path: 'statistics', component: StatisticsPageComponent },
     { path: 'timeline', component: TimelinePageComponent   } ,// Ruta de estadísticas
    { path: '', redirectTo: 'project', pathMatch: 'full' }, // Redirección por defecto
    { path: '**', component: PageNotFoundComponent } // Ruta para páginas no encontradas
  ];

