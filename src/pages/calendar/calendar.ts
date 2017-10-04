import { GoogleApiProvider } from './../../providers/google-api/google-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  events = [];
  user: any;

  constructor(public navCtrl: NavController, private googleProvider: GoogleApiProvider) {
    this.user = this.googleProvider.userData;
  }

  ionViewWillEnter() {
    this.googleProvider.getGoogleCalendar().subscribe(data => {
      console.log('my events: ', data);
      this.events = data.items;
    });
  }

  logout() {
    this.googleProvider.logout().then(() => {
      this.navCtrl.setRoot('LoginPage');
    })
  }
}
