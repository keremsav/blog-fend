import { Component, OnInit } from '@angular/core';
import { BlogService } from "../../services/blog.service";

@Component({
  selector: 'app-recent-blogs',
  templateUrl: './recent-blogs.component.html',
  styleUrls: ['./recent-blogs.component.css']
})
export class RecentBlogsComponent implements OnInit {
  recentBlogs: any[] = [];
  leftBlogRows: any[] = [];
  rightBlogRows : any[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.fetchRecentBlogs();
  }

  fetchRecentBlogs(): void {
    this.blogService.getAllPosts(1,4,-1).subscribe(
      (response: any) => {
        this.recentBlogs = response.posts.map((blog: any) => {
          const createdAt = new Date(blog.createdAt);
          const formattedDate = `${createdAt.toLocaleString('default', { month: 'long' })} ${createdAt.getDate()}, ${createdAt.getFullYear()}`;
          return { ...blog, formattedDate };
        });
        this.splitBlogRows();
      },
      error => {
        console.error(error);
      }
    );
  }
  splitBlogRows() : void {
    this.leftBlogRows[0] = this.recentBlogs[0];
    const totalBlogs = this.recentBlogs.length;
    for (let i =1;i < totalBlogs;i +=1) {
      let z = i-1;
      this.rightBlogRows[z] = this.recentBlogs[i];
    }
  }
}


