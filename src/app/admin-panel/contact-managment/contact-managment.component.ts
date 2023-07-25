import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {BlogService} from "../../services/blog.service";
import {PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-contact-managment',
  templateUrl: './contact-managment.component.html',
  styleUrls: ['./contact-managment.component.css']
})
export class ContactManagmentComponent {
  isMobile = false;
  contacts : any [] = [];

  searchData : string = "";
  selectedContact : any;
  pageSize = 5; // Number of items to show per page
  currentPage = 0; // Current page index

  pagedContacts: any[] = []; // Contacts array for the current page

  constructor(private breakpointObserver: BreakpointObserver, private blogService : BlogService) {
    // Use breakpointObserver to check if the screen is mobile-sized
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  private searchSubject: Subject<string> = new Subject<string>();

  ngOnInit() {
    this.getContacts();
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.getContacts(searchValue);
    });
    this.updatePagedContacts();
  }



  // ... other methods

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updatePagedContacts();
  }

  updatePagedContacts() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedContacts = this.contacts.slice(startIndex, endIndex);
  }

  onSearch() {
    try {
      this.searchSubject.next(this.searchData);
    } catch (err) {
      console.log(err);
    }
  }
  getContacts(searchQuery: string = '') {
    this.blogService.getAllContacts(searchQuery).subscribe((allContacts) => {
      this.contacts = allContacts;
      this.updatePagedContacts();
    }, (error) => {
      console.log(error);
    })
  }

  deleteContact(contactId : string) {
    if(contactId) {
      this.blogService.deleteContact(contactId).subscribe((contact) => {

      }, (error) => {
        console.log(error);
      })
    }
  }
  setSelectedContact(contact: any) {
    this.selectedContact = contact;
  }

  truncateMessage(message: string, maxWords: number): string {
    const words = message.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return message;
  }

  confirmDelete(contact: any): void {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${contact.email}?`);
    if (isConfirmed) {
      this.deleteContact(contact._id);
      window.location.reload();
    }
  }

}
