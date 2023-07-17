import { Component } from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {BlogService} from "../services/blog.service";
import {Router} from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent {
  contactForm : FormGroup;
  maxMessageCount: number = 2;

  constructor (private blogService : BlogService , private router : Router,private formBuilder: FormBuilder, private snackBar : MatSnackBar) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required, this.maxLengthValidator(100)]
    });
  }

  sendContactMessage () {
    if(this.contactForm.valid) {
      const { name, email, subject, message } = this.contactForm.value;
      const messageCount = localStorage.getItem('messageCount');
      const currentCount = messageCount ? parseInt(messageCount, 10) : 0;

      if (currentCount >= this.maxMessageCount) {
        this.snackBar.open('You have reached the maximum message limit.', 'Close', { duration: 3000 });
        return;
      }

      this.blogService.createContact(name, subject, email, message)
        .subscribe(
          response => {
            this.contactForm.reset();
            this.snackBar.open('Message sent!', 'Close', { duration: 9000 });
            localStorage.setItem('messageCount', (currentCount + 1).toString());
          },
          error => {
            console.log(error);
            // Handle error case (e.g., show an error message)
          }
        );
    } else {
      this.markFormFieldsAsTouched();
    }
  }
  markFormFieldsAsTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);

    if (control?.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }

      if (control.errors['email']) {
        return 'Invalid email address';
      }
      if (control.errors['maxLengthExceeded']) {
        return 'Maximum length exceeded.';
      }
    }

    return '';
  }


  maxLengthValidator(maxLength: number): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        if (control.value && control.value.length > maxLength) {
          resolve({ maxLengthExceeded: true });
        } else {
          resolve(null);
        }
      });
    };
  }


}
