import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../auth.inteface';
import { catchError, tap, throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../user';

interface SignUpAuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

interface SigninAuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered: boolean
}

@Injectable({
    providedIn : 'root'
})
export class AuthRestAPIService {
    constructor(private auth:HttpClient) {}
    
    authData = new Subject<User>();
    currentTime = new Subject<number>();

    signUpData(body:AuthModel){
        body.returnSecureToken = true;
        return this.auth.post<SignUpAuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEo1LTZxMxST0qDTN1iduJsuHAJ6uA0g4',body)
        .pipe(catchError((errorRes)=>{
            let errorMessage = 'An error has been ocurred';
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                errorMessage = 'Email already exists';
            }
            return throwError(errorMessage);
        }),
        // tap((response)=>{
        //     let expiresDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
        //     let user = new User(
        //         response.email,
        //         response.localId,
        //         response.idToken,
        //         expiresDate
        //     );

        // }))


        // We are taking reference of User class from user.ts not of this service class that's why, we used
        // bind() method. Using arrow functions it was not possible. So, we're taking regular function
        tap(this.handleUser.bind(this)));
    }

    signinData(body:AuthModel){
        body.returnSecureToken = true;
        return this.auth.post<SigninAuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEo1LTZxMxST0qDTN1iduJsuHAJ6uA0g4',body)
        .pipe(
        //     catchError((errorRes)=>{
        //     let errorMessage = 'An Error has been ocurred';
        //     if(!errorRes.error || !errorRes.error.error){
        //         return throwError(errorMessage);
        //     }
        //     switch(errorRes.error.error.message){
        //         case 'EMAIL_NOT_FOUND':
        //             errorMessage = "EmailID didn't found";
        //             break;
        //         case 'INVALID_PASSWORD':
        //             errorMessage = 'Incorrect password';
        //             break;
        //     }
        //     return throwError(errorMessage);
        // }),
        // tap((response)=>{
        //     let expireDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
        //     let user = new User(
        //         response.email,
        //         response.localId,
        //         response.idToken,
        //         expireDate
        //     );
        // })
        
        // -------- Short way --------
        catchError(this.getErrorHandler), tap(this.handleUser.bind(this))
        )
    }


    handleUser(response: SignUpAuthResponseData){
        let expireDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
            let user = new User(
                response.email,
                response.localId,
                response.idToken,
                expireDate
            );

            // ------ Sending data using Subject ------
            this.authData.next(user);
            this.currentTime.next(+response.expiresIn*1000);
    }


    // If handling errors separately
    getErrorHandler(errorRes:HttpErrorResponse){
        let errorMessage = 'An Error has been ocurred';
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_NOT_FOUND':
                    errorMessage = "EmailID didn't found";
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'Incorrect password';
                    break;
                case 'EMAIL_EXISTS':
                    errorMessage = 'Email already exists';
                    break;
            }
            return throwError(errorMessage);
    }

}