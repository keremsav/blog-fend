import { Component } from '@angular/core';
import {BlogService} from "../../services/blog.service";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  categories : any [] = []

  constructor(private blogService : BlogService) {
  }

  ngOnInit () {
    this.getCategories();
  }

  getCategories() {
    this.blogService.getCategories().subscribe((category) => {
      this.categories = category
    },error => {
      console.log(error);
    })
  }

}
