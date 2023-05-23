import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './landing/home/home.component';
import { BlogListComponent } from './landing/blog-list/blog-list.component';
import { BlogDetailComponent } from './landing/blog-detail/blog-detail.component';
import { SignInComponent } from './landing/sign-in/sign-in.component';
import { SignUpComponent } from './landing/sign-up/sign-up.component';
import { WorkspaceComponent } from './landing/workspace/workspace.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogListComponent,
    BlogDetailComponent,
    SignInComponent,
    SignUpComponent,
    WorkspaceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
