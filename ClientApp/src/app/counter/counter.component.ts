import { SignalRService } from './../services/signal-r.service';
import { Component,Inject, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit, OnDestroy{
  public currentCount = 0;
  private signalRHubSubscription: Subscription;
  private signalRApiSubscription: Subscription;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private signalRService: SignalRService ) {}

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRHubSubscription = this.signalRService.addTransferChartDataListener().subscribe(data => {
      this.currentCount=data["counter"];
    });   
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.signalRApiSubscription= this.http.get(this.baseUrl + 'api/SignalR')
      .subscribe(res => {
        console.log(res);
      })
  }

  ngOnDestroy() {
      this.signalRApiSubscription.unsubscribe();
      this.signalRHubSubscription.unsubscribe();
  }

}
