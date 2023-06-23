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
  blogRows: any[][] = [
    // more rows...
  ];
  currentPage: number = 1; // Mevcut sayfa numarası
  pageSize: number = 12; // Sayfa başına gösterilecek blog sayısı
  totalPages: number = 0; // Toplam sayfa sayısı

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    // Blogları almak için servis yöntemini çağır
    this.blogService.getAllPosts().subscribe(
      response => {

        this.blogs = response.map(blog => {
          const createdAt = new Date(blog.createdAt);
          const formattedDate = `${createdAt.getDate()} ${createdAt.toLocaleString('default', { month: 'long' })} ${createdAt.getFullYear()}`;
          console.log(formattedDate);
          return { ...blog, formattedDate };
        });
        console.log(this.blogs);
        this.calculateTotalPages();
        this.paginateBlogs();
      },
      error => {
        console.error(error);
      }
    );
  }

  calculateTotalPages(): void {
    // Toplam sayfa sayısını hesapla
    this.totalPages = Math.ceil(this.blogs.length / this.pageSize);
  }

  paginateBlogs(): void {
    this.blogRows = [];
    const numCols = 3; // Number of columns in each row

    for (let i = 0; i < this.blogs.length; i += numCols) {
      this.blogRows.push(this.blogs.slice(i, i + numCols));
    }
  }


  navigateToBlog(blogId: number): void {
    // Blogun özel sayfasına yönlendir
    this.router.navigate(['/blog', blogId]);
  }

  previousPage(): void {
    // Önceki sayfaya git
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateBlogs();
    }
  }

  nextPage(): void {
    // Sonraki sayfaya git
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateBlogs();
    }
  }

}
