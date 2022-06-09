import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Realm from 'realm-web';
import { AtlasSettings } from './atlas.settings';

@Injectable({
  providedIn: 'root'
})
export class AtlasService {

  private app =  new Realm.App({ id: AtlasSettings.APP_ID });
  private credentials = Realm.Credentials.apiKey(AtlasSettings.APIKEY);
  private user!: Realm.User;

  private changeStream = new BehaviorSubject(<any>{});
  private changeStreamWatching = false;

  constructor() { }

  async login() {
    const credentials = Realm.Credentials.apiKey(AtlasSettings.APIKEY);
    try {
      this.user = await this.app.logIn(credentials);
    } catch (err) {
      console.error('Failed to log in', err);
    }
    return this.user;
  }

  async find(query: any, options: any = {}) {
    const mongodb = this.user?.mongoClient(AtlasSettings.MONGODBCLIENT);
    const collection = mongodb?.db(AtlasSettings.DB).collection(AtlasSettings.COLLECTION);
    return await collection?.find(query, options);
  }

  changeStreamSubscription(): Observable<any> {
    return this.changeStream.asObservable();
  }

  async changeStreamStart() {
    const mongo = this.user?.mongoClient(AtlasSettings.MONGODBCLIENT);
    const collection = mongo?.db(AtlasSettings.DB).collection(AtlasSettings.COLLECTION);
    if (collection) {
      for await (const change of collection.watch()) {
        switch (change.operationType) {
          case 'insert':
          case 'update': 
          {
            const { documentKey, fullDocument } = change;
            this.changeStream.next(fullDocument);
            break;
          }
        }
      }
    }
  }

}