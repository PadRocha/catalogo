// import { Injectable } from '@angular/core';
// import * as io from 'socket.io-client';
// import { Observable, Subscriber } from 'rxjs'
// import { environment } from '../../environments/environment'

// @Injectable({
//   providedIn: 'root'
// })
// export class SocketService {
//   socket: io;

//   constructor() {
//     this.socket = io(environment.socket);
//   }

//   listen(eventName: string): Observable<any> {
//     return new Observable((Subscriber) => {
//       this.socket.on(eventName, (data) => {
//         Subscriber.next(data);
//       });
//     });
//   }

//   emit(eventName: string, data: any) {
//     this.socket.emit(eventName, data);
//   }
// }
