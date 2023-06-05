import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
//import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { WorkspaceComponent } from './admin/workspace/workspace.component';
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BlogItemComponent } from './blog/blog-list/blog-item/blog-item.component';
import { CommentListComponent } from './blog/blog-detail/comment-list/comment-list.component';
import { CommentItemComponent } from './blog/blog-detail/comment-list/comment-item/comment-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { RecentBlogsComponent } from './blog/recent-blogs/recent-blogs.component';


@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    BlogDetailComponent,
    SignInComponent,
    SignUpComponent,
    WorkspaceComponent,
    HeaderComponent,
    FooterComponent,
    BlogItemComponent,
    CommentListComponent,
    CommentItemComponent,
    RecentBlogsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    // AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
