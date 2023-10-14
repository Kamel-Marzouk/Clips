import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import Clip from '../models/clip.model';

@Injectable({
  providedIn: 'root',
})
export class ClipService {
  public clipsCollection: AngularFirestoreCollection<Clip>;

  constructor(db: AngularFirestore) {
    this.clipsCollection = db.collection('clips');
  }

  async createClip(data: Clip): Promise<void> {
    await this.clipsCollection.add(data);
  }
}
