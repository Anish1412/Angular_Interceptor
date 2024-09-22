import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { PostsComponent } from './posts/posts.component';
import { InterceptGuard } from './Services/intercept.guard'

const routes: Routes = [
  {
    path:'authenticate',
    component: AuthenticateComponent
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[InterceptGuard]
  },
  {
    path:'users',
    component:UsersComponent,
    canActivate:[InterceptGuard]
  },
  {
    path:'categories',
    component:CategoriesComponent,
    canActivate:[InterceptGuard]
  },
  {
    path:'template',
    component:TemplateFormComponent,
    canActivate:[InterceptGuard]
  },
  {
    path:'posts',
    component:PostsComponent,
    canActivate:[InterceptGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
