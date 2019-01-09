import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PageDataService {

  constructor() { }

  private chartData = {
    'js': {
      'aroundCenter': 0,
      'aroundSelf': 0,
      'description': 'JavaScript',
      'points': [ 'ES2015', 'Angular 6+', 'jQuery']
    },
    'tools': {
      'aroundCenter': 45,
      'aroundSelf': 0,
      'description': 'Tools',
      'points': [ 'Npm / Yarn / Composer', 'Gulp / Webpack', 'Timber', 'Twig', 'Handlebars.js']
    },
    'bulb': {
      'aroundCenter': 90,
      'aroundSelf': 0,
      'description': 'Other',
      'points': [ 'OOP', 'DRY', 'KISS', 'SEO', 'REST']
    },
    'pacman': {
      'aroundCenter': 135,
      'aroundSelf': 0,
      'description': 'User Experience',
      'points': [ 'Animation', 'SVG', 'UI']
    },
    'dna': {
      'aroundCenter': 180,
      'aroundSelf': 0,
      'description': 'Essentials',
      'points': [ 'HTML5', 'CSS3', 'SCSS', 'Foundation', 'Bootstrap']
    },
    'cms': {
      'aroundCenter': 225,
      'aroundSelf': 0,
      'description': 'CMS',
      'points': [ 'WordPress', 'WooCommerce', 'PrestaShop']
    },
    'versionCtrl': {
      'aroundCenter': 270,
      'aroundSelf': 0,
      'description': 'Version Control',
      'points': [ 'GIT']
    },
    'backendGroup': {
      'aroundCenter': 315,
      'aroundSelf': 0,
      'description': 'Back-End',
      'points': [ 'PHP', 'MySQL']
    }
  };

  getChartData() {
    return this.chartData;
  }
}
