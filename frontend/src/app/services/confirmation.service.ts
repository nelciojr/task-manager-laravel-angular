import { Injectable } from '@angular/core';

interface Confirmation {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  confirmation: Confirmation | null = null;

  requestConfirmation(message: string, onConfirm: () => void, onCancel: () => void) {
    this.confirmation = { message, onConfirm, onCancel };
  }

  confirm() {
    if (this.confirmation) {
      this.confirmation.onConfirm();
      this.confirmation = null;
    }
  }

  cancel() {
    if (this.confirmation) {
      this.confirmation.onCancel();
      this.confirmation = null;
    }
  }
}
