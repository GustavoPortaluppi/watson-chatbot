import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  createSession() {
    return this.http.post(`${environment.BASE_URL_API}/sessions`, null);
  }

  sendMessage(sessionId: string, message: string) {
    return this.http.post(`${environment.BASE_URL_API}/messages`, { sessionId, message });
  }
}
