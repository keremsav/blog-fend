import { Component, OnInit } from '@angular/core';
import { BlogService } from "../../services/blog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recent-blogs',
  templateUrl: './recent-blogs.component.html',
  styleUrls: ['./recent-blogs.component.css']
})
export class RecentBlogsComponent implements OnInit {
  backgroundImage = 'assets/background.jpeg';

  recentBlogs: any[] = [];
  leftBlogRows: any[] = [];
  rightBlogRows : any[] = [];

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.fetchRecentBlogs();
  }

  fetchRecentBlogs(): void {
    this.blogService.getAllPosts(1,4,-1,'').subscribe(
      (response: any) => {
        this.recentBlogs = response.posts.map((blog: any) => {
          const createdAt = new Date(blog.createdAt);
          const formattedDate = `${createdAt.toLocaleString('default', { month: 'long' })} ${createdAt.getDate()}, ${createdAt.getFullYear()}`;
          const truncatedContent = this.truncateContent(blog.content);
          return { ...blog, formattedDate,truncatedContent };
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
  navigateToBlog(blogId: number): void {
    // Blogun özel sayfasına yönlendir
    this.router.navigate(['/blog', blogId]);
  }

  truncateContent(content: string): string {
    const maxLength = 250; // İstenilen maksimum karakter sayısı için uygun bir değer verin
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + '...';
    } else {
      return content;
    }

  }
}


