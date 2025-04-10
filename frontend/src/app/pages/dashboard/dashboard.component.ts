import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { ConfirmationService } from '../../services/confirmation.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  loading = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários', error);
        this.notificationService.error('Erro ao carregar usuários.');
        this.loading = false;
      }
    });
  }

  deleteUser(id: number) {
    this.confirmationService.requestConfirmation(
      'Tem certeza que deseja excluir este usuário?',
      () => {
        // Confirmado!
        this.userService.deleteUser(id).subscribe({
          next: () => {
            this.notificationService.success('Usuário deletado com sucesso!');
            this.loadUsers();
          },
          error: (error) => {
            console.error('Erro ao excluir usuário', error);
            this.notificationService.error('Erro ao excluir usuário.');
          }
        });
      },
      () => {
        // Cancelado!
        this.notificationService.success('Ação de exclusão cancelada.');
      }
    );
  }


  logout() {
    this.authService.logout();
    this.notificationService.success('Logout realizado com sucesso!');
    this.router.navigate(['/login']);
  }

  viewUser(id: number) {
    this.router.navigate(['/user', id, 'detail']);
  }

  editUser(user: any) {
    this.router.navigate(['/user', user.id, 'edit']);
  }
}
