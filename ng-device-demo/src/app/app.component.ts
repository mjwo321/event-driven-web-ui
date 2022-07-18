import { Component } from '@angular/core';
import { AtlasService } from './atlas.service';
import { Device } from './types/device';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authStatus = 'Pending';
  devices: Device[] = [];
  subscriptionStarted = false;
  subscriptionLog = '';

  constructor(
    private atlasService: AtlasService
  ) { }

  ngOnInit(): void {
    this.atlasService.login().then(user => {
      if (user != null) {
        // if login is successful get device data
        this.authStatus = 'Successful'
        this.getDevices();
      }
      else {
        this.authStatus = 'Failed'
      }
    });
  }


  async getDevices() {
    // run a simple query to load all devices
    this.devices = await this.atlasService.find({});
  }

  async startSubscription() {
    // subscribe to the Observable to receive updates
    this.atlasService.getChangeSubject().subscribe(this.dataUpdateReceived);
    // watch for updates (opens Change Stream)
    this.atlasService.watchForUpdates();
    this.subscriptionStarted = true;
  }

  dataUpdateReceived = (document: Device): void => {
    // add new document to subscription log
    this.subscriptionLog += JSON.stringify(document,null,2)+'\n';
    // search for device and update data
    this.devices.forEach((device) => {
      if (device._id.equals(document._id)) {
        device.battery_level = document.battery_level;
      }
    });
  }

}
