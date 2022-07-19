import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AtlasSettings } from './atlas.settings';
import * as Realm from 'realm-web';

@Injectable({
  providedIn: 'root'
})
export class AtlasService {

  private app =  new Realm.App({ id: AtlasSettings.APP_ID });
  private user!: Realm.User;
  private changeSubject = new Subject();

  constructor() { }

  // login with api key (hardcoded key, to be used for demonstration purpose only)
  async login() {
    const credentials = Realm.Credentials.apiKey(AtlasSettings.APIKEY);
    try {
      this.user = await this.app.logIn(credentials);
    } catch (err) {
      console.error('Failed to log in', err);
    }
    return this.user;
  }

  // run a simple find query
  async find(query: any, options: any = {}) {
    const mongodb = this.user?.mongoClient(AtlasSettings.MONGODBCLIENT);
    const collection = mongodb?.db(AtlasSettings.DB).collection(AtlasSettings.COLLECTION);
    return await collection?.find(query, options);
  }

  // watches a Change Stream and in case of inserts or updates feed the full document to the changeSubject
  async watchForUpdates() {
    const mongo = this.user?.mongoClient(AtlasSettings.MONGODBCLIENT);
    const collection = mongo?.db(AtlasSettings.DB).collection(AtlasSettings.COLLECTION);
    if (collection) {
      for await (const change of collection.watch()) {
        switch (change.operationType) {
          case 'insert':
          case 'update': 
          {
            const { documentKey, fullDocument } = change;
            this.changeSubject.next(fullDocument);
            break;
          }
        }
      }
    }
  }

  // returns the changeSubject as obversable for event subscription
  getChangeSubject(): Observable<any> {
    return this.changeSubject.asObservable();
  }

}