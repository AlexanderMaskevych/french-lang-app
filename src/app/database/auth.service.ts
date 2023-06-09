import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUser } from '../database/user';

import { MenuPage } from '../menu/menu.page';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  appUser$: Observable<IUser | null | undefined>;
  isLoggedIn : boolean;

  constructor(
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore) {

    // Get the auth state, then fetch the Firestore user document or return null
    this.appUser$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // If the user is logged in, return the user details.
        if (user) {
          this.isLoggedIn = true;
          console.log(this.isLoggedIn);
          return this.db.doc<IUser>(`appusers/${user.uid}`).valueChanges();
        } else {
          this.isLoggedIn = false;
          console.log(this.isLoggedIn);
          // If the user is NOT logged in, return null.
          return of(null);
        }
      })
    );
    this.getAuthState();
  }

  getAuthState() {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.isLoggedIn = true;
        console.log('user is logged in'+ res.uid);
      } else {
        this.isLoggedIn = false;
        console.log('user not logged in');
      }
    });
  }

  async googleLogin() {
    const credential = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return this.updateUserData(credential.user);
  }

  signUpWithEmail(data: any) {
    this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
     .then(data => {
        data.user!.sendEmailVerification().then(() => {
          alert('Please verify your email');
          this.afAuth.signOut();
          this.router.navigate(['login-menu']);
        })
    });
  }

  /*signUpWithEmail(data: any) {
    this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
     .then(data => {
      if (data.user!.emailVerified) {
        this.router.navigate(['/home']);
      } else {
        data.user!.sendEmailVerification().then(() => {
          alert('Please verify your email');
          this.afAuth.signOut();
        })
      }
    });
  }*/

  loginWithEmail(data: any) {
    this.afAuth.signInWithEmailAndPassword(data.email, data.password)
    .then(data => {
      if(data.user?.emailVerified){
      alert('Login successful');
      this.isLoggedIn = true;
      //this.mp.isLoggedIn = this.isLoggedIn
      console.log(this.isLoggedIn);
      this.router.navigate(['/menu']);
      }
      else{
        this.afAuth.signOut();
        alert('Please verify your email');
      }
    })

  }

  /*loginWithEmail(data: any) {
    this.afAuth.signInWithEmailAndPassword(data.email, data.password)
    .then(data => {
      alert('Login successful');
      this.router.navigateByUrl('menu');
    })

  }*/

  resetPassword(email: string) {
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      alert('Please check your email, we have emailed you a password reset link');
    }).catch((error) => {
      if (error.code === 'auth/user-not-found') {
        alert('Sorry, user not found');
      }
    });
  }


  // Save the user data to firestore on Google|facebook login
  private updateUserData(user) {
    const userRef = this.db.doc(`usersProfile/${user.uid}`);
    const data = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    };
    return userRef.set(data, { merge: true });
  }

logout() {
    this.afAuth.signOut().then(() => {
      this.isLoggedIn = false;
      //this.router.navigate(['home']);
    });
 }
}