import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { GroceryService } from '../grocery-service.service';
import { InputDialogService } from '../input-dialog.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public navCtrl: NavController, public toastController: ToastController, public inputDialogService: InputDialogService, private socialSharing: SocialSharing, public dataService: GroceryService) {
    dataService.dataChanged$.subscribe((dataChagned: boolean) => {
      this.loadItems();
    });
  }

  title = "Grocery List";

  items = [];
  errorMessage: string;

  ngOnInit() {
    this.loadItems();
  }

  loadItems(event?) {
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);
    if (event) {
      event.target.complete();
    }
  }

  getItemsLength() {
    return this.items.length;
  }

  async removeItem (item, index) {
      var oldItem: String = item.name;
      
      this.dataService.removeItem(item);

      const toast = await this.toastController.create({
      message: oldItem.charAt(oldItem.length-1)==='s' ? oldItem + " were purchased" : oldItem + " was purchased",
      duration: 3000,
      icon: "checkmark-circle-outline",
      position: "bottom"
    });
    toast.present();

  }

  editItem(item, index) {

    console.log("This item is being edited", item);

    this.inputDialogService.showPrompt(item, index);
  }

  shareItem(item) {
    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Grocery app";

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared successfully!");
    }).catch((error) => {
      console.error("Error while sharing ", error);
    });
    
  }

  addItem() {
    console.log("An item is being added to the grocery list");
    this.inputDialogService.showPrompt();
  }

}
