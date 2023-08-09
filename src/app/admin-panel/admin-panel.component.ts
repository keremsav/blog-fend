import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver,private router : Router) {
    // Use breakpointObserver to check if the screen is mobile-sized
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }
  logOut() {
    const isConfirmed = window.confirm('Are you sure you want to logOut?')
    if(isConfirmed) {
      localStorage.removeItem('authToken');
      this.router.navigate(['/panel/login']);
    }
  }
}
