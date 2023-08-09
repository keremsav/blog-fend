import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {BlogService} from "../../services/blog.service";
import {PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {EditUserDialogComponent} from "../user-managment/edit-user-dialog/edit-user-dialog.component";
import {EditPostComponent} from "./edit-post-dialog/edit-post.component";
import {CreatePostDialogComponent} from "./create-post-dialog/create-post-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-managment',
  templateUrl: './post-managment.component.html',
  styleUrls: ['./post-managment.component.css']
})
export class PostManagmentComponent {
  isMobile = false;
  blogs : any [] = [];
  posts : any [] = [];
  blogRows: any[] = [];
  currentPage: number = 1;
  pageSize: number = 6;
  totalBlogs: number = 0;
  title : string = '';

  constructor(private breakpointObserver: BreakpointObserver,private blogService:BlogService, private dialog : MatDialog,private router : Router) {
    // Use breakpointObserver to check if the screen is mobile-sized
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  ngOnInit() {
    this.fetchPosts(this.title);
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.fetchPosts(searchValue);
    });

  }
  private searchSubject: Subject<string> = new Subject<string>();
  onSearch() {
    try {
      this.searchSubject.next(this.title);
    } catch (err) {
      console.log(err);
    }

  }

  fetchPosts(title : string): void {
    this.blogService.getAllPosts(this.currentPage, this.pageSize,-1,title).subscribe(
      (response: any) => {
        this.totalBlogs = response.totalCount;
        this.blogs = response.posts.map((blog : any) => {
          // Format the date as desired
          const createdAt = new Date(blog.createdAt);
          const formattedDate = `${createdAt.getDate()} ${createdAt.toLocaleString('default', { month: 'long' })} ${createdAt.getFullYear()}`;
          const truncatedContent = this.truncateContent(blog.content);
          return { ...blog, formattedDate,truncatedContent};
        });
      },
      error => {
        console.error(error);
      }
    );
  }


  truncateContent(content: string): string {
    const maxLength = 150; // İstenilen maksimum karakter sayısı için uygun bir değer verin
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + '...';
    } else {
      return content;
    }

  }
  logOut() {
    const isConfirmed = window.confirm('Are you sure you want to logOut?')
    if(isConfirmed) {
      localStorage.removeItem('authToken');
      this.router.navigate(['/panel/login']);
    }
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchPosts(this.title);
  }

  deletePost (postId: any) {
    if(postId) {
     this.blogService.deletePost(postId).subscribe(() => {

     },error => {
       console.log(error);
     })
    }
  }

  confirmDelete(post:any) {
    const isConfirmed = window.confirm(`Are you sure want to delete ${post.title} `)
    if(isConfirmed) {
      this.deletePost(post._id);
      window.location.reload();
    }
  }
  createBlogPost (title : string,content : string, tags : string[],categoryIds : string[],image : string,author : string) {
    this.blogService.createPost(title,content,tags,categoryIds,image,author).subscribe(() => {

    }, error =>  {
      console.log(error);
    })
  }

  openEditDialog(post: any): void {
    const dialogRef = this.dialog.open(EditPostComponent, {
      width: '80%',
      height : '80%',
      data: { ...post } // Pass a copy of the user data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If the result is not null (i.e., the user clicked "Save"), update the user data
        window.location.reload();
      }
    });
  }

  openCreateDialog() : void {
    const dialogRef = this.dialog.open(CreatePostDialogComponent, {
      width : '80%',
      height : '80%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        if(result.title !== '' || result.content !== '' || result.author !== '') {
          console.log(result);
          this.createBlogPost(result.title,result.content,result.tags,result.categoryIds,result.image,result.author);
          window.location.reload();
        }
      }
    })

  };




}
