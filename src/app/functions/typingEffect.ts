declare let $: any;

export class TypingEffects {
    element: any = document.querySelector('.type-js');
    elementInner = this.element.querySelector('.text-js');
    typingSpeed: number = 200;
    elementContainer;

    constructor(args) {
        if (args.elContainer) { this.element = args.elContainer; }
        if (args.speed) { this.typingSpeed = args.speed; }

        this.init();
    }

    init() {
        this.element.style.display = 'inline-block';
        this.elementInner = this.element.querySelector('.text-js');
        this.elementInner.style.opacity = '0';
        this.elementInner.style.width = '0';
        console.log(this.element.getAttribute('data-text'));

        let text = this.element.getAttribute('data-text');
        text = text.toString().split('');
        let amntOfChars = text.length;
        let newString = '';

        setTimeout(() => {
            this.elementInner.style.opacity = '1';
            this.elementInner.style.width = 'auto';
            this.elementInner.innerHTML = '\u00A0';

            for(let i = 0; i < amntOfChars; i++){
                ((i, char) => {
                    setTimeout( () => {
                        newString += char;
                        this.elementInner.innerHTML = newString;
                    }, i * this.typingSpeed);
                }) (i + 1, text[i]);
            }
        }, 1250);
    }
}
