import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChildren('messagesContainer') messagesContainer: QueryList<any>;

  sessionId;

  loading = false;
  clientMessage;
  messages = [];

  constructor(private appService: AppService) {

  }

  ngOnInit() {
    this.initSession();
  }

  ngAfterViewInit() {
    this.messagesContainer.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      window.scrollTo(0, document.body.scrollHeight);
    } catch (err) {
      console.log(err);
    }
  }

  initSession() {
    this.appService.createSession().subscribe((res: any) => {
      this.sessionId = res.sessionId;
    });
  }

  send() {
    if (!this.loading) {
      this.loading = true;
      this.appService.sendMessage(this.sessionId, this.clientMessage).subscribe((res: any) => {
        console.log(res);
        console.log(JSON.stringify(res));

        this.messages.push({ from: 'client', message: this.clientMessage });
        this.clientMessage = null;

        this.messages.push({ from: 'server', ...res });

        this.loading = false;
      });
    }
  }

  getDate() {
    return new Date();
  }

}
