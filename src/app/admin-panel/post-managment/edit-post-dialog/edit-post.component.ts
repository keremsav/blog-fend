import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BlogService} from "../../../services/blog.service";

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  allCategories : any [] = [];
  post : any ;
  constructor(private blogService : BlogService,public dialogRef : MatDialogRef<EditPostComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.post = {...data};
    this.blogService.getCategories().subscribe((categories) => {
      this.allCategories = categories;
    }, error => {
      console.log(error);
    })
  }

  newTag: string = '';

  addTag() {
    if (this.newTag && this.post.tags.indexOf(this.newTag) === -1) {
      this.post.tags.push(this.newTag);
      this.newTag = '';
    }
  }

  removeTag(tag: string) {
    const index = this.post.tags.indexOf(tag);
    if (index >= 0) {
      this.post.tags.splice(index, 1);
    }
  }

  onSave() : void {
    this.blogService.updatePost(this.post._id, this.post.title, this.post.content , this.post.author,this.post.categoryIds,this.post.tags,this.post.image).subscribe(() => {

    }, error =>  {
      console.log(error);
    } )
    this.dialogRef.close(this.post);
  }

  onCancel() : void {
    this.dialogRef.close();
  }

}
