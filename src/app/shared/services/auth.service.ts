import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // save logged in user data

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(
      user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user') as string);
        } else {
          localStorage.removeItem('user');
        }
      }
    )
  }

  SignIn(email: any, password: any) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch(error => {
        window.alert(error.message)
      });
  }

  SignUp(email: any, password: any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch(error => {
        window.alert(error.message);
      })
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then(u => {
        u?.sendEmailVerification()
          .then(() => {
            this.router.navigate(['verify-email-address'])
          });
      });
  }

  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch(error => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    if (!user) {
      return false;
    }
    const fireUser = JSON.parse(user);
    return (fireUser !== null && fireUser.emailVerified !== false) ? true : false;
  }

  GoogleAuth() {
    this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then(result => {
        this.SetUserData(result.user);
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      }).catch(error => {
        window.alert(error.message);
      })
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    this.userData = userData;
    localStorage.setItem('user', JSON.stringify(this.userData));
    return userRef.set(userData, { merge: true })
  }

  SignOut() {
    return this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
      });
  }
}


