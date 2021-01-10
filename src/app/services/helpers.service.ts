import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(public toastController: ToastController,
              public loadingController: LoadingController) { }


    async showToast(msg:string, col:string){
      const toast = await this.toastController.create({
        message: msg,
        cssClass: 'myToast',
        duration: 1000,
        position:"bottom"
      });
      toast.present();
    }

    async showLoading(){
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: '',
        spinner:'crescent'
      });
      await loading.present();
    }

    async showPresentLoading(ltext:string){
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: ltext,
        spinner:'crescent',
        duration: 400
      });
      await loading.present();
    }
}
