import { Component, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar, LoadingController, ModalController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { EditNotaPage } from '../pages/edit-nota/edit-nota.page';
import { NotasService } from '../services/notas.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { HelpersService } from '../services/helpers.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{

  @ViewChild('search',{static:false})search:IonSearchbar;

  public listaNotas = [];
  public notas:any;

  constructor(private notasS: NotasService,
    private modalController:ModalController,
    private nativeStorage: NativeStorage,
    private authS:AuthService,
    private router:Router,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private themeService:ThemeService,
    private translate:TranslateService,
    private helpersS:HelpersService) {  }

  public async logout(){
    await this.authS.logout();
    if(!this.authS.isLogged()){
      this.router.navigate(['/login'])
    }
  }

  async ngOnInit(){
    this.nativeStorage.getItem('themeColor')
    .then((like) => {
      console.log(like);
      this.themeService.setThemeOnInit(like.theme);
    })

    this.nativeStorage.getItem('appLanguage')
    .then((language)=>{
      this.changeLang(language.lang)
    })

    await this.presentLoading();
  }

   async ionViewWillEnter(){
    console.log("ENTRO SIEMPRE");

    this.notasS.cargarColeccion();
    this.cargaDatos();
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
   * Function that gets all the items from our database.
   * @param $event 
   */
  public cargaDatos($event=null){
    try {
      this.notasS.leeNotas()
        .subscribe((info:firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          //Ya ha llegado del servidor
          this.listaNotas=[];
          info.forEach((doc)=>{
            let nota={
              id:doc.id,
              ...doc.data()
            }
            this.listaNotas.push(nota);
            this.notas = this.listaNotas;
         
          });
          //Ocultar el loading
          console.log(this.listaNotas);
          if($event){
            $event.target.complete();
          }
        })
    } catch (err) {
      //Error
    }
  }

  /**
   * Function that deletes a selected note.
   * @param id id of the note.
   */
  public borraNota(id:any){
    this.notasS.borraNota(id)
    .then(()=>{
      //ya está borrada allí
      let tmp=[];
      this.listaNotas.forEach((nota)=>{     
        if(nota.id!=id){
         tmp.push(nota);
        }
      })
      this.listaNotas=tmp;
      this.notas = this.listaNotas;
    })
    .catch(err=>{

    })
  }

  /**
   * Function that allows the user to edit a selected note.
   * @param nota note selected to edit.
   */
  public async editaNota(nota:Nota){
    const modal = await this.modalController.create({
      component: EditNotaPage,
      cssClass: 'my-custom-class',
      componentProps:{
        nota:nota
      }
    });
    modal.present();
    
    return await modal.onDidDismiss()
    .then((onEdit)=>{
      this.cargaDatos();
    })
  }

  /**
   * Function that allows the user to search a note
   * @param ev 
   */
  public searchNota(ev:any){
    const val = ev.target.value;
    this.notas = this.listaNotas;
    if(val && val.trim()!= ''){
      this.notas = this.notas.filter((nota)=>{
        return (nota.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1 || nota.texto.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  async presentLoading() {
    let loadingText:string;

    this.translate.get('LOADINGTEXT').subscribe((res:string)=>{
      loadingText=res;
    })
    this.helpersS.showPresentLoading(loadingText);  
  }

  /**
   * Alert that makes the user confirm the delete action.
   * @param id id of the note the user wants to delete.
   */
  async confirmDeleteNote(id:any) {
    let header:string;
    let message:string;
    let buttonTextNegative:string;
    let buttonTextPositive:string;

    this.translate.get('DELETEHEADER').subscribe((res:string)=>{
      header=res;
    });

    this.translate.get('DELETEMESSAGE').subscribe((res:string)=>{
      message=res;
    });

    this.translate.get('BUTTONNEGATIVE').subscribe((res:string)=>{
      buttonTextNegative=res;
    });

    this.translate.get('BUTTONPOSITIVE').subscribe((res:string)=>{
      buttonTextPositive=res;
    });

    const alert = await this.alertController.create({
      
      cssClass: 'deleteNote',
      header: header,
      message: message,
      buttons: [
        {
          text: buttonTextNegative,
          role: 'cancel',
          cssClass: 'alertCancel',
          handler: () => {
          }
        }, {
          text: buttonTextPositive,
          cssClass: 'alertDelete',
          handler: () => {
            this.borraNota(id);
            console.log('Confirm Okay');
          }
        },
      ]
    });

    await alert.present();
  }

}
