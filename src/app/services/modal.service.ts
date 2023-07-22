import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private visable: boolean = false;

  constructor() { }

  isModalOpen(): boolean {
    return this.visable;
  }

  toggleModal(): void {
    this.visable = !this.visable;
  }
}
