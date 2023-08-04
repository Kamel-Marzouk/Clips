import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<User> = this.db.collection('users');

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) { }

  public async createUser(userData: User): Promise<void> {
    if (!userData.password) throw new Error('Password is not provided!')
    const userCredentials = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password);
    await this.usersCollection.add({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    })
  }
}
