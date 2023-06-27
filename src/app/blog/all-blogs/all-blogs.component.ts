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
    this.blogService.getAllPosts(this.currentPage, this.pageSize).subscribe(
      (response: any) => {
        this.totalPages = response.totalPages ;
        this.blogs = response.posts.map((blog : any) => {
          // Format the date as desired
          const createdAt = new Date(blog.createdAt);
          const formattedDate = `${createdAt.getDate()} ${createdAt.toLocaleString('default', { month: 'long' })} ${createdAt.getFullYear()}`;
          return { ...blog, formattedDate };
        });
        console.log(this.blogs);
        this.splitBlogsIntoRows();
      },
      error => {
        console.error(error);
      }
    );
  }


  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.blogs.length / this.pageSize);
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

  paginateBlogs(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.blogRows = this.blogs.slice(startIndex, endIndex);
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


}
