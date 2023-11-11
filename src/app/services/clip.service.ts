import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import Clip from '../models/clip.model';

@Injectable({
  providedIn: 'root',
})
export class ClipService {
  public clipsCollection: AngularFirestoreCollection<Clip>;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {
    this.clipsCollection = db.collection('clips');
  }

  createClip(data: Clip): Promise<DocumentReference<Clip>> {
    return this.clipsCollection.add(data);
  }

  getUsersClips(sort$: BehaviorSubject<string>): Observable<any> {
    return combineLatest([this.auth.user, sort$]).pipe(
      switchMap((values: any[]) => {
        const [user, sort] = values;
        if (!user) return of([]);
        const query: firebase.firestore.Query<Clip> = this.clipsCollection.ref
          .where('uid', '==', user.uid)
          .orderBy('timestamp', sort == '1' ? 'desc' : 'asc');
        return query.get();
      }),
      map((snapshot: any) => (snapshot as QuerySnapshot<Clip>).docs)
    );
  }

  updateClip(id: string, title: string): Promise<void> {
    return this.clipsCollection.doc(id).update({
      title,
    });
  }

  async deleteClip(clip: Clip): Promise<void> {
    const clipRef: AngularFireStorageReference = this.storage.ref(`clips/${clip.fileName}`);
    clipRef.delete();
    await this.clipsCollection.doc(clip.docID).delete();
  }
}
