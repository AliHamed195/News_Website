import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44332/articleHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
  }

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch((err) =>
        console.log('Error while starting SignalR connection: ' + err)
      );
  };

  public addReceiveNewArticleListener = (callback: (article: any) => void) => {
    this.hubConnection.on('ArticlePublished', callback);
  };
}
