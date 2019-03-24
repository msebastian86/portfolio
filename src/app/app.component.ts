import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { PageDataService } from './page-data.service';
import { InteractiveChart } from './functions/interactive-chart';
import { TypingEffects } from './functions/typingEffect';

declare let $: any;
declare let L: any;
declare let tomtom: any;
let swiper: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit, OnInit {
  iconsData: any = {};
  type;
  types: [];

  constructor(private pageData: PageDataService) {}

  ngOnInit() {
    // ======---====== get data for svg chart ======---======
    this.iconsData = this.pageData.getChartData();

    // ======---====== init tooltips from bootstrap ======---======
    $('[data-toggle="tooltip"]').tooltip();

    // ======---====== tomtom map options ======---======
    const map = tomtom.L.map('map', {
      key: 'Gr8VhNU45tscqiW8AYSPAco8qA9TqcdD',
      basePath: 'https://msebastian86.github.io/portfolio/assets/sdk',
      style: 'night',
      layer: 'basic',
      center: [ 50.05472, 19.95783 ],
      zoom: 12.76,
      source : 'vector'
    });
  }

  ngAfterViewInit(): void {
    
    
    // ======---====== init Swiper ======---======
    swiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      flipEffect: {
        rotate: 30,
        slideShadows: false,
      },
      shortSwipes: false,
      longSwipesRatio: 0.1,
      longSwipesMs: 100,
      grabCursor: true,
      hashNavigation: {
        replaceState: true,
        watchState: true,
      },
      speed: 550,
      loop: true,
      pagination: {
        el: '.pagination',
        clickable: true,
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          return current + ' / ' + total;
        }
      },
      keyboard: true,
      navigation: {
        nextEl: '.page-next',
        prevEl: '.page-prev',
      },
      on: {
        init: function (e) {
          let activeSlide = document.querySelector('.swiper-slide-active');
          let titles = activeSlide.querySelectorAll('.type-js');

          titles.forEach(element => {
            const el = new TypingEffects({elContainer: element, speed: 120});
          });
        },
        slideChange: function (e) {
          // ======---====== mark active slide ======---======
          // this.wrapperEl.classList.add(`active-index`);

          // ======---====== collapse menu after click ======---======
          $('.nav-body').collapse('hide');

          // ======---====== mark active menu title ======---======
          const menuItems = document.querySelectorAll('.nav-item');

          menuItems.forEach((menuItem, index) => {
            if (index == this.realIndex) {
              menuItems[index].classList.add('nav-item-active');
            } else {
              menuItems[index].classList.remove('nav-item-active');
            }
          });

        },
        slideChangeTransitionStart: function (e) {
          let activeSlide = document.querySelector('.swiper-slide-active');
          let titles = activeSlide.querySelectorAll('.type-js');

          titles.forEach(element => {
            const el = new TypingEffects({elContainer: element, speed: 120});
          });
        }
      }
    });

    

    // ======---====== init interactive SVG Chart ======---======
    InteractiveChart(this.iconsData);

    // ======---====== random Cat :P ======---======
    fetch('https://api.thecatapi.com/api/images/get?format=json&results_per_page=4')
      .then(response => response.json())
      .then(response => {
        response.forEach(cat => {
          document.querySelector('.add-cat').insertAdjacentHTML('afterbegin', `<div class="col-sm-6 col-md-3 text-center"><img src="${cat.url}" style="height:210px; max-width: 100%;"/></div>`);
        });
      });
  }
}
