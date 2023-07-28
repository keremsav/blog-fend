import {Component} from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {ActivatedRoute, Router} from "@angular/router";
import { faArrowUpRightDots } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent {
  blog : any ;
  blogs : any[] = [];
  posts : any [] = [];
  currentPage: number = 1; // Mevcut sayfa numarası
  pageSize: number = 6 // Sayfa başına gösterilecek blog sayısı
  totalPages: number = 0; // Toplam sayfa sayısı
  paragraphs: any = [];
  faArrow = faArrowUpRightDots;

  constructor(private blogService: BlogService, private router: Router,private route:ActivatedRoute) {}

  splitToParagraphs(content: string): string[] {
    return content.split('\n\n'); // Veya başka bir ayraca göre bölme yapabilirsiniz.
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogService.getPostById(id).subscribe(
        (blog: any) => {
          this.blog = blog;
            const createdAt = new Date(blog.createdAt);
          this.blog.createdAt = `${createdAt.getDate()} ${createdAt.toLocaleString('default', {month: 'long'})} ${createdAt.getFullYear()}`;
          this.paragraphs = this.splitToParagraphs(blog.content);
          console.log(blog);
        },
        (error: any) => {
          console.error('Error fetching blog:', error);
        }
      );
    }
    this.fetchPosts();
  }
  fetchPosts(): void {
    this.blogService.getAllPosts(this.currentPage, this.pageSize,-1,'').subscribe(
      (response: any) => {
        this.totalPages = response.totalPages ;
        this.blogs = response.posts.map((blog : any) => {
          // Format the date as desired
          const createdAt = new Date(blog.createdAt);
          const formattedDate = `${createdAt.getDate()} ${createdAt.toLocaleString('default', { month: 'long' })} ${createdAt.getFullYear()}`;
          return { ...blog, formattedDate };
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  navigateToBlog(blogId: number): void {
    // Blogun özel sayfasına yönlendir
    this.router.navigate(['/blog', blogId])
      .then(()=> {
        window.location.reload();
      })
  }

}


