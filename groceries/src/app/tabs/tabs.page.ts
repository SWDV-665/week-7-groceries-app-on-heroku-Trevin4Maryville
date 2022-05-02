import { Component } from '@angular/core';
import { GroceryService } from '../grocery-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {

  constructor(public dataService: GroceryService) {}

  getItemLength() {
    return this.dataService.getItemsLength();
  }

}
