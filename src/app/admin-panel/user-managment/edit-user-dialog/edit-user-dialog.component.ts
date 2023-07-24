import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {BlogService} from "../../../services/blog.service";

interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
  isAdmin: boolean;
  isVerified: boolean;
  bio: string;
}

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  editedUser : User;
  constructor(
    public blogService : BlogService,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.editedUser = data;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.blogService.updateUser(this.editedUser._id,this.editedUser.username,this.editedUser.email,this.editedUser.isVerified,this.editedUser.isAdmin)
      .subscribe()
    this.dialogRef.close(this.editedUser);
  }
}
