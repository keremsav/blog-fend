import { Component } from '@angular/core';
import {BlogService} from "../../../services/blog.service";
import {MatDialogRef} from "@angular/material/dialog";


export interface blogPost {
  title : string,
  content : string,
  tags : string[],
  categoryIds : string[],
  author : string,
  image : string
}

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.css']
})



export class CreatePostDialogComponent {
  allCategories : any [] = [];
  constructor(private blogService : BlogService,public dialogRef : MatDialogRef<CreatePostDialogComponent>) {
    this.blogService.getCategories().subscribe((categories) => {
      this.allCategories = categories;
    }, error => {
      console.log(error);
    })
  }
  post : blogPost = {
    title : '',
    content : '',
    tags : [],
    categoryIds : [],
    author : '',
    image : ''
  }



  onSave() {
    this.dialogRef.close(this.post);
  }
  onCancel () {
    this.dialogRef.close(this.post);
  }

}
