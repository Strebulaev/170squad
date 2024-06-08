import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  sendMessage(message: string): void {
    this.socket.emit('chat message', message);
  }

  onMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('chat message', (message) => {
        observer.next(message);
      });

      return () => {
        this.socket.off('chat message');
      };
    });
  }
}
