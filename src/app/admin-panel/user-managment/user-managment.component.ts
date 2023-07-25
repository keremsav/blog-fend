import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {BlogService} from "../../services/blog.service";
import {MatDialog} from "@angular/material/dialog";
import {EditUserDialogComponent} from "./edit-user-dialog/edit-user-dialog.component";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent {
  isMobile = false;
  usersData : any [] = [];

  searchData : string = "";
  displayedColumns: string[] = ['id', 'username', 'email', 'isAdmin', 'isVerified','actions'];


  constructor(private breakpointObserver: BreakpointObserver,private blogService : BlogService, public dialog: MatDialog) {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }
  private searchSubject: Subject<string> = new Subject<string>();

  ngOnInit() {
    this.getUser();
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.getUser(searchValue);
    });  }
  onSearch() {
    try {
      this.searchSubject.next(this.searchData);
    } catch (err) {
      console.log(err);
    }

  }

  getUser(searchQuery: string = '') {
    this.blogService.getUsers(searchQuery).subscribe((users) => {
      this.usersData = users;
    },(error) => {
      console.log(error);
    });
  };
  deleteUser(userId:any) {
    console.log(userId);
    this.blogService.deletedUser(userId).subscribe((users) => {
      console.log(users);
    },(error) => {
      console.log(error);
    })
  }

  openEditDialog(user: any): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '300px',
      data: { ...user } // Pass a copy of the user data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If the result is not null (i.e., the user clicked "Save"), update the user data
        window.location.reload();
      }
    });
  }


  confirmDelete(user: any): void {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${user.username}?`);

    if (isConfirmed) {
      this.deleteUser(user._id);
      window.location.reload();
    }
  }



}
