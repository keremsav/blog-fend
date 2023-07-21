import { Component } from '@angular/core';
import {BlogService} from "../../services/blog.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  categories : any[] = [];
  constructor(private blogService: BlogService) { }

  ngOnInit() : void {
    this.fetchCategories();
    console.log(this.categories);
  }

  fetchCategories() {
    this.blogService.getCategories().subscribe(
      (data) => {
         data.map((category : any) => {
          this.categories.push({name : category.name, id : category._id});
        });
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  isDropdownOpen = false;



  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
