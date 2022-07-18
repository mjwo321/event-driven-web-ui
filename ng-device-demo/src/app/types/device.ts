import { BSON } from 'realm-web';

export interface Device {
    _id: BSON.ObjectID,
    name: string,
    battery_level: number
  }
  