import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './countries/countries.component';

const routes: Routes =
[
  {path: '', component: MainComponent, canActivate: [AuthGuardService] },
  {path: 'login', component: LoginComponent},
  {path: 'countries', component: CountriesComponent},
   // otherwise redirect to home
  {path: '**', redirectTo: '' }
]


@NgModule({
  declarations: [
    CountriesComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ]
})
export class RoutesModule { }
