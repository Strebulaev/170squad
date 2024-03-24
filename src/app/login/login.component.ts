import { Component } from '@angular/core';
import { swearWords } from '../swearWords';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isPopupVisible: boolean = true;
  password: string = '';
  isLoggedIn: boolean = false;

  onSubmit(): void {
    console.log('Entered password:', this.password);

    const trimmedPassword = this.password.trim();
    const lowerCaseSwearWords = swearWords.map(word => word.toLowerCase());

    if (lowerCaseSwearWords.some(word => trimmedPassword.toLowerCase().includes(word.toLowerCase()))) {
      console.log('Logged in successfully');
      this.isLoggedIn = true;
      this.isPopupVisible = false;
    } else {
      console.log('Invalid credentials');
    }
  }

  showPopup(): void {
    this.isPopupVisible = true;
  }
}
