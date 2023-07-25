import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {BlogService} from "../../services/blog.service";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-categories-managment',
  templateUrl: './categories-managment.component.html',
  styleUrls: ['./categories-managment.component.css']
})
export class CategoriesManagmentComponent {
  isMobile = false;
  categories : [] = [];
  newCategoryName = '';

  constructor(private breakpointObserver: BreakpointObserver,private blogService : BlogService) {
    // Use breakpointObserver to check if the screen is mobile-sized
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }
  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.blogService.getCategories().subscribe((category) => {
      this.categories = category;
    }, error => {
      console.log(error);
    })
  }

  createCategory() {
    if(this.newCategoryName) {
      this.blogService.creatCategories(this.newCategoryName).subscribe(blog => {
        this.getCategories();
        this.newCategoryName = '';

      }, error => {
        console.log(error);
      })
    }


  }

  deleteCategory(id:string) {

    this.blogService.deleteCategories(id).subscribe(() => {
      this.getCategories(); // Refresh the categories after deleting one
    });
  }
  confirmDeleteCategory(category: any): void {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${category.name}?`);

    if (isConfirmed) {
      this.deleteCategory(category._id);
      window.location.reload();
    }
  }


  updateCategory(name:string,id:string) {
    this.blogService.updateCategories(name,id).subscribe(category => {
      console.log(category);
    },error => {
      console.log(error);
    })
  }

}


