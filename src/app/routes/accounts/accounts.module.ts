import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTableComponent } from './account-table/account-table.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { RouterModule, Routes } from '@angular/router';
import { RoutesModule } from '../routes.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: AccountTableComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'details/:accountId', component: EditAccountComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AccountTableComponent,
    CreateAccountComponent,
    EditAccountComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [
    RouterModule
  ]
})
export class AccountsModule { }
