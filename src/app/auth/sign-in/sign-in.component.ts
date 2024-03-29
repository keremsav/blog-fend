import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signIn(): void {
    // Send sign-in request to the server
    this.authService.signIn(this.email, this.password).subscribe(
      response => {
        if (response) {
          localStorage.setItem('authToken',response);
          this.router.navigate(['/panel']);
        } else {
          // User is not valid, display error message
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      },
      error => {
        // Handle errors during sign-in
        console.error(error);
        if (error.error && error.error.message) {
          // Display the error message returned from the backend
          this.errorMessage = error.error.message;
        } else {
          // Handle generic error message
          this.errorMessage = 'An error occurred during sign-in. Please try again.';
        }
      }
    );
  }
  forgotPassword(): void {
    // Implement the logic for the "Forgot Password" feature
    // This could involve sending a password reset email or directing the user to a password reset page
    // You can add your own custom logic here
    console.log('Forgot Password clicked');
  }
}
