import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-contact-managment',
  templateUrl: './contact-managment.component.html',
  styleUrls: ['./contact-managment.component.css']
})
export class ContactManagmentComponent {
  isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    // Use breakpointObserver to check if the screen is mobile-sized
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }
}
