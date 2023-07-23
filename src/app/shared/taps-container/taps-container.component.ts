import { Component, ContentChildren, AfterContentInit, QueryList } from '@angular/core';
import { TapComponent } from '../tap/tap.component';
@Component({
  selector: 'app-taps-container',
  templateUrl: './taps-container.component.html',
  styleUrls: ['./taps-container.component.css']
})
export class TapsContainerComponent implements AfterContentInit {

  @ContentChildren(TapComponent) tabs: QueryList<TapComponent> = new QueryList();

  ngAfterContentInit(): void {
    const activeTabs = this.tabs?.filter((tab: TapComponent) => tab.active);
    if (!activeTabs || !activeTabs.length) this.selectTab(this.tabs!.first);
  }

  selectTab(tab: TapComponent): boolean {
    this.tabs?.forEach((tab: TapComponent) => tab.active = false);
    tab.active = true;
    return false
  }
}
