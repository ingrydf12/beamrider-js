class Player {
    constructor(x, y) {
      this.pos = createVector(x, y);
      this.vel = 5;
      this.sprite = spr1;
      this.bullets = [];
      this.tam = 32;
      this.mouseHeld = false;
    }
  
    update() {
      this.show();
      this.move();
      this.checkParede();
      this.verificaAtaque();
      
    }
  
    show() {
      image(this.sprite, this.pos.array()[0] - this.tam, this.pos.array()[1]);
    }
  
    move() {
      if (keyIsDown(RIGHT_ARROW)) this.pos.x += this.vel;
      if (keyIsDown(LEFT_ARROW)) this.pos.x -= this.vel;
      // if (keyIsDown(DOWN_ARROW)) this.pos.y += this.vel;
      // if (keyIsDown(UP_ARROW)) this.pos.y -= this.vel;
    }
  
    verificaAtaque() {
      if (mouseIsPressed && mouseButton == LEFT && !this.mouseHeld) {
        this.bullets.push(new Bullet(this));
        this.mouseHeld = true;
      } else if (!mouseIsPressed) {
        this.mouseHeld = false;
      }
  
      //atualiza cada valor dentro do array bullets
      for (let tiro of this.bullets) {
        tiro.update();
      }
    }
  
    //TODO: Colisão com parede
    checkParede() {
      if (this.pos.x + this.tam >= width) {
        this.pos.x = width - this.tam / 2;
      } else if (this.pos.x - this.tam <= 0) {
        this.pos.x = this.tam;
      }
    }
  }
  
  class Enemy {
    constructor(x, y) {
      this.pos = createVector(x, y);
      this.vel = 1;
      this.sprite = spr2;
      this.tam = 32;
    }
  
    updateEnemy() {
      this.show();
      this.move();
    }
  
    show() {
      image(this.sprite, this.pos.array()[0] - this.tam, this.pos.array()[1]);
    }
  
    move() {
      this.pos.y += this.vel;
  
      if (this.pos.y > height) {
        this.pos.y = 150;
      }
    }
  
    //Colisão tiro - inimigo
    checkCollision(bullet) {
      return (
        bullet.x > this.pos.x - this.tam &&
        bullet.x < this.pos.x + this.tam &&
        bullet.y > this.pos.y - this.tam &&
        bullet.y < this.pos.y + this.tam
      );
    }
  }
  
  class Bullet {
    constructor(objJogador) {
      this.x = objJogador.pos.x;
      this.y = objJogador.pos.y;
      this.vel = 1.5;
    }
  
    update() {
      this.show();
      this.y -= this.vel;
    }
  
    show() {
      rect(this.x, this.y, 5, 10);
    }
    
    foraDeZona(){
      
    }
  
    //TODO: Colisão tiro - inimigo
  }
  