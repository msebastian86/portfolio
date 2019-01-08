export class ParallaxMenu {
  menu = <HTMLElement>document.querySelector('.navbar-nav');
  items = <NodeList>document.querySelectorAll('.nav-item');
  menuContainer = <HTMLElement>document.querySelector('.nav-body');
  menuToggler = <HTMLElement>document.querySelector('.navbar-toggle-main');
  isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  working = true;

  containerWidth = this.menuContainer.offsetWidth;
  containerHeight = this.menuContainer.offsetHeight;

  constructor(args) {
    if (args.menuUl) { this.menu = <HTMLElement>document.querySelector(args.menuUl); }
    if (args.menuItem) { this.items = <NodeList>document.querySelectorAll(args.menuItem); }
    if (args.menuBody) { this.menuContainer = <HTMLElement>document.querySelector(args.menuBody); }
    if (args.toggler) { this.menuToggler = <HTMLElement>document.querySelector(args.toggler); }

    this.updateContainerSize();
    this.updateMenu();
    this.handleResize();
  }

  handleResize() {
    if (this.isMobile) {
      this.working = false;
      this.resetMenuTransition();
    } else {
      this.working = true;
    }
  }

  resetMenuTransition() {
    this.menu.style.transform = `none`;
  }

  updateContainerSize() {
    this.containerWidth = this.menuContainer.offsetWidth,
    this.containerHeight = this.menuContainer.offsetHeight;
  }

  updateMenu() {
    window.addEventListener('mousemove', (e) => {
      // ======---====== if is NOT mobile device - parallax ON ======---======
      if (this.working) {
        this.updateContainerSize();
        const offsetX = 0.5 - e.pageX / this.containerWidth, // cursor pos X
        offsetY = 0.5 - e.pageY / this.containerHeight, // cursor pos Y
        dy = e.pageY - this.containerHeight / 2, // Y center of menu
        dx = e.pageX - this.containerWidth / 2, // X center of menu
        offsetPoster: any = this.menu.getAttribute('data-offset'),
        theta = Math.atan2(dy, dx), // angle between cursor and center in RAD
        transformPoster = 'translate3d(0, ' + -offsetX * offsetPoster + 'px, 0) rotateX(' + (offsetY * offsetPoster) + 'deg) rotateY(' + (-offsetX * (offsetPoster * 2)) + 'deg)'; // menu transform

        let angle = theta * 180 / Math.PI - 90; // convert rad in degrees

        // get angle between 0-360
        if (angle < 0) { angle = angle + 360; }

        // menu transform
        this.menu.style.transform = transformPoster;

        // parallax menu elems
        for (const item of <any>this.items) {
          const offsetLayer = item.getAttribute('data-offset');
          const transformLayer = 'translate3d(' + offsetX * offsetLayer + 'px, ' + offsetY * offsetLayer + 'px, 20px)';
          item.style.transform = transformLayer;
        }

      // ======---====== reset menu transition for mobile devices - parallax OFF ======---======
      } else {
        this.resetMenuTransition();
      }

    });
  }
}
