import { Injectable, Inject } from '@angular/core';
import * as signalR from "@aspnet/signalr"; 
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data= {};
  private hubConnection: signalR.HubConnection 
  constructor(@Inject('BASE_URL') private baseUrl: string) {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(this.baseUrl +'SignalR')
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    return new Observable((observer: Observer<object>) => {
      this.hubConnection.on('transferData', (data) => {
        observer.next(data);
      });
    }); 
  }
}
