import { GooglePlus } from '@ionic-native/google-plus';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleApiProvider {
  userData = null;
  appSettings = {
    'scopes': 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly',
    'webClentId': '975844618573-8u76e0tbmc2go84qpu4bbq8op6jkh36a.apps.googleusercontent.com',
    'offline': true,

  }

  constructor(public http: Http, public googlePlus: GooglePlus) {

  }

  setUser(data) {
    console.log('user data', data);
    this.userData = data;

  }

  login() {
    return this.googlePlus.login(this.appSettings);
  }

  silentLogin() {
    return this.googlePlus.trySilentLogin(this.appSettings);
  }

  getGoogleCalendar() {
    let currentTime = (new Date()).toISOString();
    return this.http.get('https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token=' +
      this.userData.accessToken + '&timeMin=' + currentTime + '&maxResults=10&orderBy=startTime&singleEvents=true')
      .map(res => res.json());

  }

  logout() {
    this.userData = null;
    return this.googlePlus.logout();
  }

}
