import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.css']
})
export class TapComponent {
  @Input() tabTitle: string = '';
  @Input() active: boolean = false;

}
