import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { GlobalStatsComponent } from './components/global-stats/global-stats.component';
import { ApiDocumentationComponent } from './components/api-documentation/api-documentation.component';
import { CompanyComponent } from './components/company/company.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'global-stats', component: GlobalStatsComponent },
  { path: 'api-documentation', component: ApiDocumentationComponent },
  { path: 'company', component: CompanyComponent }
];
