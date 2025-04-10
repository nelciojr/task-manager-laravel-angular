import { Injectable } from '@angular/core';

interface Notification {
  type: 'success' | 'error';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public notifications: Notification[] = [];

  getNotifications(): Notification[] {
    return this.notifications;
  }

  success(message: string): void {
    this.addNotification('success', message);
  }

  error(message: string): void {
    this.addNotification('error', message);
  }

  private addNotification(type: 'success' | 'error', message: string): void {
    const notification: Notification = { type, message };
    this.notifications.push(notification);

    setTimeout(() => {
      this.notifications = this.notifications.filter(n => n !== notification);
    }, 3000); // Tempo de exibição
  }
}
