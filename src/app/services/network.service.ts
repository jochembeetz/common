import { Injectable } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { ConnectionStatus, Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private _listener: PluginListenerHandle;
  constructor() {}

  startListening(
    options: {
      toastOnConnectionMade: boolean;
      toastOnConnectionLost: boolean;
    } = { toastOnConnectionLost: true, toastOnConnectionMade: false }
  ) {
    this._listener = Network.addListener(
      'networkStatusChange',
      (status: ConnectionStatus) => {
        if (status.connected && options.toastOnConnectionMade) {
          this.showConnectionToast(true);
        }
        if (!status.connected && options.toastOnConnectionLost) {
          this.showConnectionToast(false);
        }
      }
    );
  }

  stopListening() {
    this._listener.remove();
  }

  getStatus(): Promise<ConnectionStatus> {
    return Network.getStatus();
  }

  private async showConnectionToast(connected: boolean) {
    // Show toast or alert
  }
}
