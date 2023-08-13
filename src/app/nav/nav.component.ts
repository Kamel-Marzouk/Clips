import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(
    private modalService: ModalService,
    public authService: AuthService,
    private aFAuth: AngularFireAuth
  ) {}

  openModal(event: Event): void {
    event.preventDefault();
    this.modalService.toggleModal('auth');
  }

  async logout($event: Event): Promise<any> {
    $event.preventDefault();
    await this.aFAuth.signOut();
  }

}
