import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BlogService} from "../../../services/blog.service";
import {MatChip, MatChipEditedEvent, MatChipInputEvent, MatChipListbox} from "@angular/material/chips";
import {MatChipsModule} from "@angular/material/chips";
import {LiveAnnouncer} from "@angular/cdk/a11y";

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
  newTag: string = ''; // Store the new tag before adding it to the tags array

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.post.tags.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.post.tags.indexOf(tag);

    if (index >= 0) {
      this.post.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing fruit
    const index = this.post.tags.indexOf(tag);
    if (index >= 0) {
      this.post.tags[index].name = value;
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
