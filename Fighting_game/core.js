class FightingGame extends HTMLElement{
  constructor(){
    super();
    this.canvas = this.querySelector('canvas');
    this.c = this.canvas.getContext('2d');

    this.canvas.width = 1024;
    this.canvas.height= 576;

    this.c.fillRect(0,0,this.canvas.width,this.canvas.height);

  }
}
customElements.define('fight-game',FightingGame);