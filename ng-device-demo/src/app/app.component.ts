import { Component } from '@angular/core';
import { AtlasService } from './atlas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authStatus = 'Pending';
  changeStreamStatus = 'Not Started';
  devices: any = [];
  log = '';

  constructor(
    private atlasService: AtlasService
  ) { }

  ngOnInit(): void {
    this.atlasService.login().then(user => {
      if (user != null) {
        this.authStatus = 'Successful'
        this.loadDeviceData();
        this.changeStreamStart();
      }
      else {
        this.authStatus = 'Failed'
      }
    });
  }

  async loadDeviceData() {
    this.devices = await this.atlasService.find({});
  }

  async changeStreamStart() {
    this.atlasService.changeStreamSubscription().subscribe( document => {
      if (document._id) {
        this.log += JSON.stringify(document,null,2)+'\n';
        this.devices.forEach((device: any) => {
          if (device._id.equals(document._id)) {
            device.battery_level = document.battery_level;
          }
        });
      }
    });
    this.atlasService.changeStreamStart();
    this.changeStreamStatus = 'Started';
  }

}
