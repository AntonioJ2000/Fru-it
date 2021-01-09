import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { ThemeService } from '../services/theme.service';
import { ActionSheetController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';

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
              private nativeStorage: NativeStorage,
              private translate:TranslateService) {}

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

    enablePink(){
      this.themeService.enablePink();
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

    changeLang(lang:string){
      this.translate.use(lang);
    }

    async presentActionSheet() {
      let textThemeSelect:string;
      let defaultTheme:string;
      let darkTheme:string;
      let cancelThemePicker:string;

      this.translate.get('SELECTTHEMETEXT').subscribe((res:string)=>{
        textThemeSelect=res;
      });

      this.translate.get('DEFAULTTHEME').subscribe((res:string)=>{
        defaultTheme=res;
      });
      
      this.translate.get('DARKTHEME').subscribe((res:string)=>{
        darkTheme=res;
      });

      this.translate.get('CANCELTHEMEPICKER').subscribe((res:string)=>{
        cancelThemePicker=res;
      });

      const actionSheet = await this.actionSheetController.create({
        header: textThemeSelect,
        cssClass: 'editLeaveMenu',
        mode: 'md',
        buttons: [{
          text: defaultTheme,
          icon: 'assets/sun.svg',
          cssClass: 'editLeaveMenu',
          handler: () => {
            this.enableLight();
            
            this.nativeStorage.setItem('themeColor', {theme:'default-theme'})
            .then((like) =>{
              console.log("El tema guardado será el por defecto.")
            })

            
          }
        }, {
          text: darkTheme,
          icon: 'assets/moon-phase.svg',
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
          text: 'Berry',
          icon: 'assets/berry.svg',
          cssClass: 'editLeaveMenu',
          handler: () => {
            this.enableRed();
            this.nativeStorage.setItem('themeColor', {theme:'red-theme'})
          }
        }, {
          text: 'Lychee',
          icon: 'assets/lychee.svg',
          cssClass: 'editLeaveMenu',
          handler: () => {
            this.enablePink();
            this.nativeStorage.setItem('themeColor', {theme:'pink-theme'})
          }
        }, {
          text: 'Blueberry',
          icon: 'assets/blueberry.svg',
          cssClass: 'editLeaveMenu',
          handler: () => {
            this.enableBlue();
            this.nativeStorage.setItem('themeColor', {theme:'blue-theme'})
          }
        },{
          text: 'Orange',
          icon: 'assets/orange.svg',
          cssClass: 'editLeaveMenu',
          handler: () => {
            this.enableOrange();
            this.nativeStorage.setItem('themeColor', {theme:'orange-theme'})
          }
        },{
          text: 'Lemon',
          icon: 'assets/lemon.svg',
          cssClass: 'editLeaveMenu',
          handler: () => {
            this.enableYellow();
            this.nativeStorage.setItem('themeColor', {theme:'yellow-theme'})
          }
        },{
          text: 'Kiwi',
          icon: 'assets/kiwi.svg',
          cssClass: 'editLeaveMenu',
          handler: () => {
            this.enableGreen();
            this.nativeStorage.setItem('themeColor', {theme:'green-theme'})
          }
        }, {
          text: cancelThemePicker,
          icon: 'assets/close.svg',
          cssClass: 'editLeaveMenu',
          role: 'cancel',
          handler: () => {
            //Salir
          }
        }]
      });
      await actionSheet.present();
    }

    async languageSheet(){
      let selectLanguageText:string;
      this.translate.get('SELECTLANGUAGE').subscribe((res:string)=>{
        selectLanguageText = res;
      })

      const actionSheet = await this.actionSheetController.create({
        header: selectLanguageText,
        cssClass: 'editLeaveMenu',
        mode: 'md',
        buttons: [{
          text: "Español",
          cssClass: 'editLeaveMenu',
          icon: 'assets/spain.svg',
          handler: () => {
            this.changeLang("es");
          }
        },{
          text: "English (UK)",
          cssClass:'editLeaveMenu',
          icon: 'assets/united-kingdom.svg',
          handler: () => {
            this.changeLang("en");
          }
        }]
      });
      await actionSheet.present();
    }

    async actionThemeOrLeave() {
      let optionsTitle:string;
      let optionTheme:string;
      let optionLanguage:string;
      let optionCloseSession:string;

      this.translate.get('OPTIONTITLE').subscribe((res:string)=>{
        optionsTitle=res;
      });

      this.translate.get('OPTIONTHEME').subscribe((res:string)=>{
        optionTheme=res;
      });

      this.translate.get('OPTIONLANGUAGE').subscribe((res:string)=>{
        optionLanguage=res;
      });

      this.translate.get('CLOSESESSION').subscribe((res:string)=>{
        optionCloseSession=res;
      });

      const actionSheet = await this.actionSheetController.create({
        header: optionsTitle,
        cssClass: 'editLeaveMenu',
        mode: 'md',
        buttons: [{
          text: optionTheme,
          cssClass: 'editLeaveMenu',
          icon: 'assets/paint-palette.svg',
          handler: () => {
            this.presentActionSheet();
          }
        },{
          text: optionLanguage,
          cssClass:'editLeaveMenu',
          icon: 'language-outline',
          handler: () => {
            this.languageSheet();
          }
        },{
          text: optionCloseSession,
          cssClass: 'editLeaveMenu',
          icon: 'assets/exit.svg',
          handler: () => {
             this.logout();
          }
        }]
      });
      await actionSheet.present();
    }
  
}
