import { Injectable } from '@angular/core';

interface IModal {
  id: string,
  visable: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: IModal[] = [];

  constructor() { }

  isModalOpen(id: string): boolean {
    return !!this.modals.find((modal: IModal) => modal.id === id)?.visable;
  }

  toggleModal(id: string): void {
    const modal = this.modals.find((modal: IModal) => modal.id === id);
    if (modal) modal.visable = !modal.visable;
  }

  register(id: string): void {
    this.modals.push({
      id,
      visable: false
    });
  }
}
