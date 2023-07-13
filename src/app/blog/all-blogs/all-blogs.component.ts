import { Component } from '@angular/core';
import {BlogService} from "../../services/blog.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})


export class AllBlogsComponent {
  blogs : any[] = [];
  latestBlogs : any [] = [];
  blogRows: any[] = [
  ];
  posts : any [] = [];
  currentPage: number = 1; // Mevcut sayfa numarası
  pageSize: number = 6 // Sayfa başına gösterilecek blog sayısı
  totalPages: number = 0; // Toplam sayfa sayısı




  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPosts();
  }


  fetchPosts(): void {
    this.blogService.getAllPosts(this.currentPage, this.pageSize,-1).subscribe(
      (response: any) => {
        this.totalPages = response.totalPages;
        this.blogs = response.posts.map((blog : any) => {
          // Format the date as desired
          const createdAt = new Date(blog.createdAt);
          const formattedDate = `${createdAt.getDate()} ${createdAt.toLocaleString('default', { month: 'long' })} ${createdAt.getFullYear()}`;
          const truncatedContent = this.truncateContent(blog.content);
          return { ...blog, formattedDate,truncatedContent};
        });
        if(this.currentPage === 1) {
          this.latestBlogs = this.blogs;
        }
        console.log(this.blogs);
        this.splitBlogsIntoRows();
      },
      error => {
        console.error(error);
      }
    );
  }
  splitBlogsIntoRows(): void {
    this.blogRows = [];
    const totalBlogs = this.blogs.length;
    let rowIndex = 0;

    for (let i = 0; i < totalBlogs; i += 3) {
      let row: any[] = this.blogs.slice(i, i + 3);
      this.blogRows[rowIndex] = row;
      rowIndex++;
    }
  }

  navigateToBlog(blogId: number): void {
    // Blogun özel sayfasına yönlendir
    this.router.navigate(['/blog', blogId]);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchPosts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchPosts();
    }
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
