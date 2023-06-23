import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  username: string = '';
  password: string = '';

  email : string = '';
  usernameError: string = '';
  passwordError: string = '';
  emailError: string = '';


  constructor(private authService: AuthService, private router: Router) {
  }

  signup(): void {
    // Send signup request to the server
    this.authService.signup(this.username,this.email, this.password).subscribe(
      response => {
        // Redirect if signup is successful
        this.router.navigate(['/']);
      },
      error => {
        // Handle errors during signup
        console.error(error);
        // Perform necessary operations to show the error status to the user
      }
    );
  }

}
