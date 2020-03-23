import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    $('.chat').slideToggle(300, 'swing');
    $('.chat-message-counter').slideToggle(300, 'swing');
    $('#live-chat header').on('click', function () {

      $('.chat').slideToggle(300, 'swing');
      $('.chat-message-counter').fadeToggle(300, 'swing');

    });
    $('.chat-close').on('click', function (e) {
      e.preventDefault();
      $('#live-chat').fadeOut(300);

    });
  }

}
