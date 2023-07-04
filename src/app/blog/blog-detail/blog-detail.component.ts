import {Component} from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent {
  blog : any ;

  constructor(private blogService: BlogService, private router: Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogService.getPostById(id).subscribe(
        (blog: any) => {
          this.blog = blog;
            const createdAt = new Date(blog.createdAt);
          this.blog.createdAt = `${createdAt.getDate()} ${createdAt.toLocaleString('default', {month: 'long'})} ${createdAt.getFullYear()}`;

          console.log(blog);
        },
        (error: any) => {
          console.error('Error fetching blog:', error);
        }
      );
    }
  }




}
