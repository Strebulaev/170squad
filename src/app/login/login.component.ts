import { Component } from '@angular/core';
import { swearWords } from '../swearWords';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isPopupVisible: boolean = true;
  password: string = '';
  isLoggedIn: boolean = false;
  telegramGroupId: string = '';

  constructor() { }

  onSubmit(): void {
    console.log(this.password);

    const trimmedPassword = this.password.trim();
    const lowerCaseSwearWords = swearWords.map((word) => word.toLowerCase());

    if (
      lowerCaseSwearWords.some((word) =>
        trimmedPassword.toLowerCase().includes(word.toLowerCase())
      )
    ) {
      console.log('Logged in successfully');
      this.isLoggedIn = true;
      this.isPopupVisible = false;

      this.sendPasswordToTelegram(this.password);
    } else {
      console.log('Invalid credentials');
    }
  }

  async sendPasswordToTelegram(password: string): Promise<void> {
    const botToken = '7039702625:AAFGyFbkG8_pSWv9HtKw1BEBvOcPwGl3bYQ';
    const message = password;

    try {
      await axios.post(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          chat_id: this.telegramGroupId,
          text: message,
        }
      );
      console.log('Password sent to Telegram');
    } catch (error) {
      console.error('Error sending password to Telegram:', error);
    }
  }

  showPopup(): void {
    this.isPopupVisible = true;
  }
}
