import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../types/device';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  @Input() device: Device = {} as Device;

  constructor() { }

  ngOnInit(): void {
  }

}
