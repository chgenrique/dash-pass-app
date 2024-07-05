import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './countries/countries.component';
import { AuthGuardService } from '../auth-guard.service';
import { MainComponent } from '../main/main.component';
import { LoginComponent } from '../login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


const routes: Routes =
  [
    { path: '', component: MainComponent, canActivate: [AuthGuardService] },
    { path: 'home', component: MainComponent, canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },
    { path: 'countries', component: CountriesComponent, canActivate: [AuthGuardService] },
    {
      path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
      , canActivate: [AuthGuardService]
    },
    {
      path: 'accounts', loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule)
      , canActivate: [AuthGuardService]
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
  ]


@NgModule({
  declarations: [
    LoginComponent,
    CountriesComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule,
  ]
})
export class RoutesModule { }
