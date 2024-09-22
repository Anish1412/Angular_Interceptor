import { Component,OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthRestAPIService } from '../Services/AuthRestAPI.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit{
  constructor(private auth:AuthRestAPIService, private route: Router) {}
  
  ngOnInit(): void {

  }

  isSignUp:boolean = false;
  isFormType:string = "Login";
  formChange(){
    if(this.isSignUp){
      this.isFormType = "Login";
      this.isSignUp = false;
    }
    else {
      this.isFormType = "Signup";
      this.isSignUp = true;
    }
  }

  @ViewChild("InterceptForm") interceptData !: NgForm;

  loading:boolean = false;
  error:string | null = null;
  onSubmit(){
    if(this.interceptData.invalid){
      return
    }
    this.loading = true;
    if(this.isSignUp){
      this.loading = false;
      this.auth.signUpData(this.interceptData.value).subscribe((res)=>{
       console.log(res);
      },(errorMessage)=>{
        this.loading = false;
        this.error = errorMessage;
        setTimeout(()=>{
          this.error = '';
        },3000);
      })
    }
    else {
      this.loading = false;
      this.auth.signinData(this.interceptData.value).subscribe((res)=>{
        console.log(res);
      },(errorMessage)=>{
        this.loading = false;
        this.error = errorMessage;
        setTimeout(()=>{
          this.error = '';
        },3000);
      })
    }
  }

  passwordError(input:any){
    if(input.touched && input?.errors?.['minlength']){
      return `Password must be minimum of 6 characters...`;
    }

    if(input.touched && input?.errors?.['required']){
      return `Password is required...`;
    }
    return null;
  }
}
