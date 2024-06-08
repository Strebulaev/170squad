import { Component, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @ViewChild('messagesContainer', { static: false }) messagesContainer!: ElementRef;
  messages: string[] = [];
  newMessage = '';

  constructor(private chatService: ChatService) {
    this.chatService.onMessage().subscribe((message) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.chatService.sendMessage(this.newMessage);
      this.newMessage = '';
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer?.nativeElement) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
