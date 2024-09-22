import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './Services/Auth.interceptor';
import { AuthRestAPIService } from './Services/AuthRestAPI.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { PostsComponent } from './posts/posts.component';
import { AuthTokenInterceptor } from './Services/auth-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticateComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    CategoriesComponent,
    UsersComponent,
    TemplateFormComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass:AuthTokenInterceptor,
    //   multi:true
    // },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    AuthRestAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
