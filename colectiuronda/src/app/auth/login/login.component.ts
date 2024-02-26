import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = 'admin';
  password: string = 'Proves123';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (token: any) => {
        console.log('Login exitoso', token);
        this.router.navigate(['/ca/home']);
      },
      error: (error: any) => {
        console.error('Error en login', error);
        this.errorMessage = 'Credenciales incorrectas o error de servidor';
      },
    });
  }
}
