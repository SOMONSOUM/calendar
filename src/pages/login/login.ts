import { GoogleApiProvider } from './../../providers/google-api/google-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private plt: Platform, private googleApiProvider: GoogleApiProvider) {
    this.plt.ready().then(() => {
      this.googleApiProvider.silentLogin().then(data => {
        this.googleApiProvider.setUser(data);
        this.navCtrl.setRoot('TabsPage');
      });
    });
  }

  loginWithGoogle() {
    this.googleApiProvider.login().then(data => {
      this.googleApiProvider.setUser(data);
      this.navCtrl.setRoot('TabsPage');
    });
  }

}

