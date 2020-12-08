import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { ThemeService } from '../services/theme.service';
import { ActionSheetController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  urlTwitter:string = "https://twitter.com/antoniojl2000";
  urlInstagram:string = "https://www.instagram.com/antoniojl2k";

  constructor(private authS:AuthService,
              private router:Router,
              private inAppBrowser: InAppBrowser,
              private themeService: ThemeService,
              private actionSheetController:ActionSheetController,
              private nativeStorage: NativeStorage) {}

  public userProfile={
    token: -1,
    name: "",
    avatar: ""
  }

  ionViewWillEnter(){
    this.nativeStorage.getItem('themeColor')
    .then((like) => {
      console.log(like);
      this.themeService.setThemeOnInit(like.theme);
    })
    this.userProfile={
      token: this.authS.user.token,
      name: this.authS.user.name,
      avatar: this.authS.user.avatar
    }
  }

    public async logout(){
      await this.authS.logout();
      if(!this.authS.isLogged()){
        this.router.navigate(['/login'])
      }    
    }

    openTwitterPage(){
      const options: InAppBrowserOptions = {
        toolbar: 'yes',
        zoom: 'no'
      }
      const browser = this.inAppBrowser.create(this.urlTwitter, '_system', options);

    }
    
    openInstagramPage(){
      const options: InAppBrowserOptions = {
        toolbar: 'yes',
        zoom: 'no'
      }
      const browser = this.inAppBrowser.create(this.urlInstagram, '_system', options);

    }


    enableLight(){
      this.themeService.enableLight();
    }
  
    enableDark(){
      this.themeService.enableDark();
    } 

    enableRed(){
      this.themeService.enableRed();
    }
  
    enableBlue(){
     this.themeService.enableBlue();
    }
  
    enableOrange(){
      this.themeService.enableOrange();
    }
  
    enableYellow(){
      this.themeService.enableYellow();
    }
  
    enableGreen(){
      this.themeService.enableGreen();
    }

    async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Seleccione un tema:',
        cssClass: 'editLeaveMenu',
        mode: 'md',
        buttons: [{
          text: 'Tema por defecto',
          icon: 'sunny-outline',
          cssClass: 'editLeaveMenu',
          handler: () => {
            this.enableLight();
            
            this.nativeStorage.setItem('themeColor', {theme:'default-theme'})
            .then((like) =>{
              console.log("El tema guardado será el por defecto.")
            })

            
          }
        }, {
          text: 'Modo oscuro',
          icon: 'moon-outline',
          cssClass: 'editLeaveMenu',
          handler: () => {
            this.enableDark();
            this.nativeStorage.setItem('themeColor', {theme:'dark-theme'})
            .then((like)=>{
              console.log("El tema guardado será el oscuro")
              console.log(like)
            })
          }
        }, {
          text: 'Cherry',
          icon: 'chevron-forward-outline',
          cssClass: 'editLeaveMenu',
          handler: () => {
            this.enableRed();
            this.nativeStorage.setItem('themeColor', {theme:'red-theme'})
          }
        }, {
          text: 'Blueberry',
          icon: 'chevron-forward-outline',
          cssClass: 'editLeaveMenu',
          handler: () => {
            this.enableBlue();
            this.nativeStorage.setItem('themeColor', {theme:'blue-theme'})
          }
        },{
          text: 'Orange',
          icon: 'chevron-forward-outline',
          cssClass: 'editLeaveMenu',
          handler: () => {
            this.enableOrange();
            this.nativeStorage.setItem('themeColor', {theme:'orange-theme'})
          }
        },{
          text: 'Lemon',
          icon: 'chevron-forward-outline',
          cssClass: 'editLeaveMenu',
          handler: () => {
            this.enableYellow();
            this.nativeStorage.setItem('themeColor', {theme:'yellow-theme'})
          }
        },{
          text: 'Kiwi',
          icon: 'chevron-forward-outline',
          cssClass: 'editLeaveMenu',
          handler: () => {
            this.enableGreen();
            this.nativeStorage.setItem('themeColor', {theme:'green-theme'})
          }
        }, {
          text: 'Cancel',
          icon: 'backspace-outline',
          cssClass: 'editLeaveMenu',
          role: 'cancel',
          handler: () => {
            //Salir
          }
        }]
      });
      await actionSheet.present();
    }

    async actionThemeOrLeave() {
      const actionSheet = await this.actionSheetController.create({
        header: '¿Que desea hacer?',
        cssClass: 'editLeaveMenu',
        mode: 'md',
        buttons: [{
          text: 'Cambiar tema',
          cssClass: 'editLeaveMenu',
          icon: 'color-palette',
          handler: () => {
            this.presentActionSheet();
          }
        }, {
          text: 'Cerrar sesión',
          cssClass: 'editLeaveMenu',
          icon: 'arrow-back-outline',
          handler: () => {
             this.logout();
          }
        }]
      });
      await actionSheet.present();
    }
  
}
