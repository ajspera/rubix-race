import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultiplayerService {
  localConnection: RTCPeerConnection = new RTCPeerConnection();
  remoteConnection: RTCPeerConnection = new RTCPeerConnection();

  sendChannel: RTCDataChannel = this.localConnection.createDataChannel('sendChannel');


  constructor() {
    this.sendChannel.onopen = (e: Event) => {
      console.log( 'opened', this.sendChannel, e );
      return;
    };
    this.sendChannel.onclose = (e: Event) => {
      console.log( 'closed', this.sendChannel, e);
    };
  }
}
