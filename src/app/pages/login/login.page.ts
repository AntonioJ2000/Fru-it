import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private google:GooglePlus,
             private authS:AuthService,
             private router:Router,
             private nativeStorage: NativeStorage,
             private themeService: ThemeService) { }

  ngOnInit() {
    this.nativeStorage.getItem('themeColor')
    .then((like) => {
      console.log(like);
      this.themeService.setThemeOnInit(like.theme);
    })

    if(this.authS.isLogged()){
      this.router.navigate(['/'])
    }
  }

  public async login(){
    let u=await this.authS.login();
    if(u.token!=-1){
      this.router.navigate(['/'])
    }
  }

}
