import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nota } from '../model/nota';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private myCollection:AngularFirestoreCollection<any>;

  constructor(private fire:AngularFirestore, private usuario:AuthService) { 
    console.log(usuario.user.email);
    this.myCollection=fire.collection<any>(usuario.user.email);   
  }

  cargarColeccion(){
      console.log(this.usuario.user.email);
      this.myCollection = this.fire.collection<any>(this.usuario.user.email);
  }

  agregaNota(nuevaNota:Nota):Promise<any>{
    return this.myCollection.add(nuevaNota);
  }

  leeNotas():Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>{
    return this.myCollection.get();
  }

  leeNota(id:any):Observable<any>{
    return this.myCollection.doc(id).get();
  }

  actualizaNota(id:any,nuevaNota:Nota):Promise<void>{
    console.log("EESTOY AQUUI "+id)
    console.log(nuevaNota)
    return this.myCollection.doc(id).update({titulo:nuevaNota.titulo,texto:nuevaNota.texto});
  }
  borraNota(id:any):Promise<void>{
    return this.myCollection.doc(id).delete();
  }
  //FIN CRUD BASICO
  leeNotasPorCriterio(){
    //Por implementar
  }
}
