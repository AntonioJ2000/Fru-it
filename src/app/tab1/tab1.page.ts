import { Component, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar, LoadingController, ModalController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { EditNotaPage } from '../pages/edit-nota/edit-nota.page';
import { NotasService } from '../services/notas.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';


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
    private themeService:ThemeService) {  }

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
    await this.presentLoading();
  }

   async ionViewWillEnter(){
    console.log("ENTRO SIEMPRE");

    this.notasS.cargarColeccion();
    this.cargaDatos();
  }

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
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Las notas estan cargando, por favor, espere.',
      spinner:'crescent',
      duration: 400
    });
    await loading.present();
  }

  async confirmDeleteNote(id:any) {
    const alert = await this.alertController.create({
      cssClass: 'deleteNote',
      header: 'Está a punto de borrar la nota',
      message: '¿Está seguro de que desea borrar la nota indicada? No la podrá recuperar posteriormente.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alertCancel',
          handler: () => {
          }
        }, {
          text: 'Borrar',
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
