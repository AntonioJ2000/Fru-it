import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Nota } from '../model/nota';
import { HelpersService } from '../services/helpers.service';
import { NotasService } from '../services/notas.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public tasks:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private notasS:NotasService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private nativeStorage: NativeStorage,
    private themeService: ThemeService,
    private translate: TranslateService,
    private helpersS: HelpersService
  ) {
    this.tasks=this.formBuilder.group({
      title:['',Validators.required],
      description:['']
    })
  }

  ngOnInit(){
    this.nativeStorage.getItem('themeColor')
    .then((like) => {
      console.log(like);
      this.themeService.setThemeOnInit(like.theme);
    })

    this.nativeStorage.getItem('appLanguage')
    .then((language)=>{
      this.changeLang(language.lang)
    })
  }

  /**
   * Function that allows the app to change the language based on the user selected language.
   * @param lang language
   */
  changeLang(lang:string){
    console.log(lang)
    this.translate.use(lang);
  }

  /**
   * Function that save the new note created.
   */
  public async sendForm(){
    await this.presentLoading();
    let msgsuccesful:string;
    let msgerror:string;

    this.translate.get('TOASTSUCCESS').subscribe((res:string)=>{
      msgsuccesful=res;
    })
    this.translate.get('TOASTFAILURE').subscribe((res:string)=>{
      msgerror=res;
    })

    
    let data:Nota={
      titulo:this.tasks.get('title').value,
      texto:this.tasks.get('description').value
    }
    this.notasS.agregaNota(data)
    .then((respuesta)=>{
      this.tasks.setValue({
        title:'',
        description:''
      })
      this.loadingController.dismiss();
      this.presentToast(msgsuccesful,"success");
    })
    .catch((err)=>{
      this.loadingController.dismiss();
      this.presentToast(msgerror,"danger");
      console.log(err);
    })
  }

  async presentLoading() {
    this.helpersS.showLoading();
  }

  async presentToast(msg:string,col:string) {
    this.helpersS.showToast(msg,col);
  }

}
