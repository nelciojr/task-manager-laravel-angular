import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: any = { name: '', email: '' };
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe({
        next: (data) => {
          this.user = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar usuário', error);
          this.notificationService.error('Erro ao carregar usuário.');
          this.loading = false;
        }
      });
    }
  }

  onSubmit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.updateUser(Number(userId), this.user).subscribe({
        next: () => {
          this.notificationService.success('Usuário atualizado com sucesso!');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Erro ao atualizar usuário', error);
          this.notificationService.error('Erro ao atualizar usuário.');
        }
      });
    }
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
