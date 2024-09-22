import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, switchMap, take } from 'rxjs';
import { AuthRestAPIService } from '../Services/AuthRestAPI.service';

interface Posts {
  title: string;
  content: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  constructor(private http: HttpClient, private auth: AuthRestAPIService) {}

  Posts: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  error: string = '';
  onSubmit() {
    console.log(this.Posts.value);
    return this.auth.authData.subscribe((response) => {
      console.log(response.token);
    });

    // return this.auth.authData
    //   .subscribe((response)=>{
    //     console.log(response.token);
    //   },(errorRes)=>{
    //         let errorMessage = "An error has been ocurred";
    //         if(!errorRes.error || !errorRes.error.error){
    //           this.error = errorMessage;
    //         }
    //         switch(errorRes.error.error){
    //           case 'Permission denied':
    //           errorMessage = "Permission has been denied";
    //         }
    //         this.error = errorMessage;
    //         setTimeout(()=>{
    //           this.error = '';
    //         },3000);
    //       });

    // let posts = this.Posts.value;
    //   let searchParams = new HttpParams();
    //   searchParams = searchParams.append('auth',response.token);
    //   return this.http.post(`https://angularinterceptorformdata-default-rtdb.firebaseio.com/posts.json`,posts,{
    //     params: searchParams
    //   }).subscribe((response)=>{
    //     console.log(response);
    //     // this.getPosts();
    //   },(errorRes)=>{
    //     let errorMessage = "An error has been ocurred";
    //     if(!errorRes.error || !errorRes.error.error){
    //       this.error = errorMessage;
    //     }
    //     switch(errorRes.error.error){
    //       case 'Permission denied':
    //       errorMessage = "Permission has been denied";
    //     }
    //     this.error = errorMessage;
    //     setTimeout(()=>{
    //       this.error = '';
    //     },3000);
    //   })
  }

  posts: Posts[] = [];
  getPosts() {
    return this.auth.authData.pipe(
      map((response:any)=>{
        let posts: Posts[] = [];
        for(let key in response){
          posts.push({ ...response[key], key})
        }
        return posts;
      }))

      // take(1),
      // switchMap((res:any)=>{
      //   let searchParams = new HttpParams();
      //   searchParams = searchParams.append('auth',res.token)
      //   return this.http.get(`https://angularinterceptorformdata-default-rtdb.firebaseio.com/posts.json`,
      //   {
      //     params: searchParams
      //   })
      //   .subscribe((response)=>{
      //     console.log(response);
      //   })
      // }),

    // return this.auth.authData.subscribe(
    //   (response) => {
    //     console.log(response.token);
    //   },
    //   (errorRes) => {
    //     let errorMessage = 'An error has been ocurred';
    //     if (!errorRes.error || !errorRes.error.error) {
    //       this.error = errorMessage;
    //     }
    //     switch (errorRes.error.error) {
    //       case 'Permission denied':
    //         errorMessage = 'Permission has been denied';
    //     }
    //     this.error = errorMessage;
    //     setTimeout(() => {
    //       this.error = '';
    //     }, 3000);
    //   }
    // );
  }

  ngOnInit(): void {
    this.getPosts();
  }
}
