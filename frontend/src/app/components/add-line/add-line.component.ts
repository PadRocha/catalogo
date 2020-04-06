import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styleUrls: ['./add-line.component.scss']
})
export class AddLineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public hideMenu(menu): void {
    !menu.classList.contains('hide_menu') ? menu.classList.add('hide_menu') : menu.classList.remove('hide_menu');
  }
}
