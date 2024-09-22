import { Component, OnInit } from '@angular/core';
import { AuthRestAPIService } from './Services/AuthRestAPI.service';
import { User } from './user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthRestAPIService, private route: Router) {}

  title = 'Interceptor_Leela';

  isAuthenticated: boolean = false;
  timerid!:any;
  ngOnInit(): void {
    let date = new Date().getTime();
      this.auth.currentTime.subscribe((res)=>{
        let expiryDate = new Date(res).getTime();
        console.log(expiryDate - date);
      });
    this.auth.authData.subscribe((user: any) => {
      console.log(user.expiryDate);
      localStorage.setItem('usertoken', JSON.stringify(user.token));
      this.isAuthenticated = user ? true : false;
      this.route.navigate(['home']);
      this.autoLogout(user.expiryDate);
    });

    this.autoLogin();

  }

  autoLogin(){
    // ------ AutoLogin -------
    if (localStorage.getItem('usertoken')) {
      this.isAuthenticated = true;
      this.route.navigate(['home']);
      let date = new Date().getTime();
      this.auth.currentTime.subscribe((res)=>{
        // console.log(res);
        let expiryDate = new Date(res).getTime();
        this.autoLogout(expiryDate - date);
      })
    }
  }

  autoLogout(expirationDate:number){
    // ------ Autologout -------
    this.timerid = setTimeout(() => {
      localStorage.removeItem('usertoken');
      this.route.navigate(['authenticate']);
      this.isAuthenticated = false;
    },expirationDate);
  }

  onAuthenticate() {
    localStorage.removeItem('usertoken');
    if (!localStorage.getItem('usertoken')) {
      this.route.navigate(['authenticate']);
      this.isAuthenticated = false;
      clearTimeout(this.timerid)
    }
  }
}
