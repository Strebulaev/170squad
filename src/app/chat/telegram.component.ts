import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-telegram',
  templateUrl: './telegram.component.html',
  styleUrls: ['./telegram.component.css']
})
export class TelegramComponent implements OnInit {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  messages: string[] = [];
  newMessage: string = '';

  constructor() { }

  ngOnInit() {
  }

  sendMessage() {
    if (!this.newMessage) {
      return;
    }
    this.messages.push(this.newMessage);
    this.newMessage = '';
    this.scrollToBottom();
  }

  onScroll() {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    }, 0);
  }
}
