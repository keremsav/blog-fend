import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

