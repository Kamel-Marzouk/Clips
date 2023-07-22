import { ModalService } from 'src/app/services/modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.register('auth');
  }

}
