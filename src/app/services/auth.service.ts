import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import User from '../models/user.model';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<User> = this.db.collection('users');
  public isAuthenticated$:Observable<boolean>;
  public isAuthenticatedWithDelay$:Observable<boolean>;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.isAuthenticated$= auth.user.pipe(
      map((user:any)=> !!user)
    );
    this.isAuthenticatedWithDelay$=this.isAuthenticated$.pipe(
      delay(1000)
    )
   }

  public async createUser(userData: User): Promise<void> {
    if (!userData.password) throw new Error('Password is not provided!')
    const userCredentials = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password);
    if(!userCredentials.user) throw  new Error("User can't be found");
    await this.usersCollection.doc(userCredentials.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    })
    await userCredentials.user.updateProfile({
      displayName:userData.name
    })
  }
}
