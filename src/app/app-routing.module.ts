import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {AllBlogsComponent} from "./blog/all-blogs/all-blogs.component";
import {BlogDetailComponent} from "./blog/blog-detail/blog-detail.component";

import {HomeComponent} from "./home/home.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";

const routes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: SignInComponent},
  { path: 'blogs', component: AllBlogsComponent},
  { path: 'blog/:id', component: BlogDetailComponent},
  {path: 'about-us',component: AboutUsComponent},
  {path: 'contact-us', component: ContactUsComponent}

  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

