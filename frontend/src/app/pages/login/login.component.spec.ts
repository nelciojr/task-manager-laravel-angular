import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 👈 importa FormsModule aqui

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // 👈 importa aqui dentro também
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Depois vamos chamar o AuthService aqui
  }
}
