import { Component, OnInit } from '@angular/core';
import { BlogService } from "../../services/blog.service";

@Component({
  selector: 'app-recent-blogs',
  templateUrl: './recent-blogs.component.html',
  styleUrls: ['./recent-blogs.component.css']
})
export class RecentBlogsComponent implements OnInit {
  recentBlogs: any[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.fetchRecentBlogs();
  }

  fetchRecentBlogs(): void {
    this.blogService.getRecentPosts(4).subscribe(
      (response: any) => {
        this.recentBlogs = response.posts.map((blog: any) => {
          const createdAt = new Date(blog.createdAt);
          const formattedDate = `${createdAt.toLocaleString('default', { month: 'long' })} ${createdAt.getDate()}, ${createdAt.getFullYear()}`;
          return { ...blog, formattedDate };
        });
      },
      error => {
        console.error(error);
      }
    );
  }
}
