import { Routes } from '@angular/router';

import { TasksComponent } from "./public/pages/tasks/tasks.component";
import { TimelineComponent } from "./public/pages/timeline/timeline.component";
import { MembersComponent } from "./public/pages/members/members.component";
import { ReportsComponent } from "./public/pages/reports/reports.component";
import { ToolsComponent } from "./public/pages/tools/tools.component";
import { SettingsComponent } from "./public/pages/settings/settings.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";

export const routes: Routes = [
    { path: 'tasks', component: TasksComponent },
    { path: 'timeline', component: TimelineComponent },
    { path: 'members', component: MembersComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'tools', component: ToolsComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
  ];
