import { Component, AfterViewInit } from '@angular/core';
import { ParallaxMenu } from '../functions/parallax-menu';
let menu: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {

    // ======---====== init menu ======---======
    menu = new ParallaxMenu({
      menuUl: '.navbar-nav',
      menuItem: '.nav-item',
      toggler: '.navbar-toggle-main',
      menuBody: '.nav-body'
    });
  }

}
