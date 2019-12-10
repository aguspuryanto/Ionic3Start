import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage:any = TabsPage;

  constructor(public platform: Platform, public toastCtrl: ToastController, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      var lastTimeBackPress = 0;
      var timePeriodToExit  = 2000;

      platform.registerBackButtonAction(() => {
            // get current active page
            let view = this.nav.getActive();
            if (view.component.name == "TabsPage") {
                //Double check to exit app
                if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                    this.platform.exitApp(); //Exit from app
                } else {
                    let toast = this.toastCtrl.create({
                        message:  'Press back again to exit App?',
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                    lastTimeBackPress = new Date().getTime();
                }
            } else {
                // go to previous page
                this.nav.pop({});
            }
      });

    });
  }
}
