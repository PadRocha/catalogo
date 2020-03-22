import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  public ngOnInit(): void {
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
