import { User, AuthProvider, AuthOptions } from './auth.types';


import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { FacebookAuthProvider } from "firebase/auth";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$: Observable<any>;

  constructor(private afAuth: AngularFireAuth) {
    this.authState$ = this.afAuth.authState;
    //this.logout();
  }

  get isAuthenticate(): Observable<boolean>{
    return this.authState$.pipe(map(user => user !== null));
  }

  authenticate({isSignIn, provider, user}: AuthOptions): Promise<any>{
    let operation: Promise<any>;

    if(provider !== AuthProvider.Email){
      operation = this.signInWithPopup(provider);
    }else{
      operation = isSignIn ? this.signInWithEmail(user) : this.signUpWithEmail(user);
    }

    return operation;
  }

  logout(): Promise<void>{
    return this.afAuth.signOut();
    }


  private signInWithEmail({ email, password }: User): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  private signUpWithEmail({ email, password, name }: User): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(credentials =>
        credentials.user
          .updateProfile({ displayName: name, photoURL: null })
          .then(() => credentials)

      );
  }

  private signInWithPopup(provider: AuthProvider): Promise<any> {
    let signInProvider = null;

    switch (provider) {
      case AuthProvider.Facebook:
        signInProvider = new FacebookAuthProvider()
        break;
    }

    return this.afAuth.signInWithPopup(signInProvider);
  }


}
