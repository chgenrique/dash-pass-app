import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryTableComponent } from './category-table/category-table.component';
import { UsersComponent } from './users/users.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: CategoryTableComponent },
  { path: 'categories', component: CategoryTableComponent },
  { path: 'create', component: CreateCategoryComponent },
  { path: 'details/:categoryId', component: EditCategoryComponent },
  { path: 'users', component: UsersComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    CategoryTableComponent,
    UsersComponent,
    CreateCategoryComponent,
    EditCategoryComponent
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
export class SettingsModule { }
