import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {MatCardModule} from "@angular/material/card";
import { HomeComponent } from './home/home.component';
import { AllBlogsComponent } from './blog/all-blogs/all-blogs.component';
import {CdkListbox} from "@angular/cdk/listbox";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PostManagmentComponent } from './admin-panel/post-managment/post-managment.component';
import { UserManagmentComponent } from './admin-panel/user-managment/user-managment.component';
import { CategoriesManagmentComponent } from './admin-panel/categories-managment/categories-managment.component';
import { CommentsManagmentComponent } from './admin-panel/comments-managment/comments-managment.component';
import { ContactManagmentComponent } from './admin-panel/contact-managment/contact-managment.component';
import { BlogCategoryComponent } from './blog/blog-category/blog-category.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import { EditUserDialogComponent } from './admin-panel/user-managment/edit-user-dialog/edit-user-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import { EditPostComponent } from './admin-panel/post-managment/edit-post-dialog/edit-post.component';
import { CreatePostDialogComponent } from './admin-panel/post-managment/create-post-dialog/create-post-dialog.component';
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    BlogDetailComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    BlogItemComponent,
    CommentListComponent,
    CommentItemComponent,
    RecentBlogsComponent,
    HomeComponent,
    AllBlogsComponent,
    AboutUsComponent,
    ContactUsComponent,
    AdminPanelComponent,
    PostManagmentComponent,
    UserManagmentComponent,
    CategoriesManagmentComponent,
    CommentsManagmentComponent,
    ContactManagmentComponent,
    BlogCategoryComponent,
    EditUserDialogComponent,
    EditPostComponent,
    CreatePostDialogComponent,
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
        MatCardModule,
        AppRoutingModule,
        CdkListbox,
        FontAwesomeModule,
        NgbModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatListModule,
        MatTableModule,
        MatDialogModule,
        MatSelectModule,
        MatPaginatorModule,
        MatLegacyChipsModule,
        MatChipsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
