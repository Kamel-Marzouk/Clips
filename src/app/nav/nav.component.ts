import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private modalService: ModalService) { }

  openModal(event: Event): void {
    event.preventDefault();
    this.modalService.toggleModal()
  }
}
