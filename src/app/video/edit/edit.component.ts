import {
  Component,
  OnDestroy,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Clip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: Clip | null = null;
  @Output() update: EventEmitter<any> = new EventEmitter();

  clipID = new FormControl('', { nonNullable: true });
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });
  editForm = new FormGroup({
    title: this.title,
    id: this.clipID,
  });
  inSubmission: boolean = false;
  showAlert: boolean = false;
  alertColor: string = 'blue';
  alertMessage: string = 'Please wait! Updating clip.';

  constructor(private modal: ModalService, private clipService: ClipService) {}

  ngOnChanges(): void {
    if (!this.activeClip) return;
    this.inSubmission = false;
    this.showAlert = false;
    this.clipID.setValue(this.activeClip.docID as string);
    this.title.setValue(this.activeClip.title);
  }

  ngOnInit(): void {
    this.modal.register('editClip');
  }

  async updateClip(): Promise<void> {
    if (!this.activeClip) return;
    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMessage = 'Please wait! Updating clip.';
    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value);
      this.activeClip.title = this.title.value;
      this.update.emit(this.activeClip);
      this.inSubmission = false;
      this.alertColor = 'green';
      this.alertMessage = 'Success!';
    } catch (error) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMessage = 'Something went wrong. Try again later.';
      return;
    }
  }

  ngOnDestroy(): void {
    this.modal.unRegister('editClip');
  }
}
