import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Clip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  videoOrder: string = '1';
  clips: Clip[] = [];
  activeClip: Clip | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clipService: ClipService,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? params['sort'] : '1';
    });
    this.getUsersClips();
  }

  private getUsersClips(): void {
    this.clipService.getUsersClips().subscribe((docs: any) => {
      docs.forEach((doc: any) => {
        this.clips.push({
          docID: doc.id,
          ...doc.data(),
        });
      });
    });
  }

  sort(event: Event): void {
    const { value } = event.target as HTMLSelectElement;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value,
      },
    });
  }

  openModal(event: Event, clip: Clip) {
    event.preventDefault();
    this.activeClip = clip;
    this.modal.toggleModal('editClip');
  }

  update(event: Clip): void {
    this.clips.forEach((element: Clip, index: number) => {
      if (element.docID === event.docID) this.clips[index].title = event.title;
    });
  }
}
