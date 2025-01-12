var tela = 0;
let enemy = [],
  player,
  bg,
  spr1,
  spr2,
  gif,
  owner;
let score = 0;

function preload() {
  spr1 = loadImage("./assets/spr1.png");
  spr2 = loadImage("./assets/spr2.png");
  bg = loadImage("./assets/bg.png");
  owner = loadImage("./assets/me-pixel.png");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noCursor();
  player = new Player(width / 2, height * 0.875);

  for (let i = 0; i < 3; i++) {
    enemy[i] = new Enemy(int(random(0, width)), height * 0.6);
  }
}

function draw() {
  background(0);

  switch (tela) {
    case 0:
      homeGame();
      break;
    case 1:
      mainGame();
      break;
    case 2:
      loseScreen();
      break;
    case 3:
      apOwner();
      break;
  }

  mira();
  noStroke();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  player.x = width / 2; // Reposiciona o jogador ao centro
}

function mira() {
  stroke("#AE35D1");
  strokeWeight(2);
  line(mouseX - 10, mouseY, mouseX + 10, mouseY); 
  line(mouseX, mouseY - 10, mouseX, mouseY + 10);
  noFill();
}

function homeGame() {
  fill("#fafafa");
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(40);
  text("BEAM RIDER", width / 2, height / 2 - 50);

  // Botão "JOGAR"
  fill("#fafafa");
  rect(width / 4, height / 2 + 15, width / 2, 50);
  fill("#161616");
  textSize(20);
  text("JOGAR", width / 2, height / 2 + 45);

  // Botão "AP1"
  fill("#fafafa");
  rect(width / 4, height / 2 + 75, width / 2, 50);
  fill("#161616");
  text("AP1", width / 2, height / 2 + 105);

  // Interação dos botões
  if (mouseIsPressed) {
    if (mouseX >= width / 4 && mouseX <= (width / 4) + (width / 2)) {
      if (mouseY >= height / 2 + 15 && mouseY <= height / 2 + 65) {
        tela = 1; // Vai para o jogo
      } else if (mouseY >= height / 2 + 75 && mouseY <= height / 2 + 125) {
        tela = 3; // Vai para a tela de créditos
      }
    }
  }
}

function mainGame() {
  image(bg, 0, 0, width, height * 0.375);
  fill("#DB8E23");
  textAlign(CENTER);
  text("SECTION " + score, width / 2, 50);

  player.update();
  for (let i = enemy.length - 1; i >= 0; i--) {
    enemy[i].updateEnemy();

    for (let j = player.bullets.length - 1; j >= 0; j--) {
      if (enemy[i].checkCollision(player.bullets[j])) {
        enemy.splice(i, 1); // Remove o inimigo
        score += 5;
        player.bullets.splice(j, 1); // Remove o tiro
        break;
      }
    }
  }
}

function apOwner() {
  const pX = 30,
    pY = 30;
  image(owner, width / 2 - 75, height / 2 - 100, 150, 150);

  fill("#fafafa");
  textAlign(CENTER);
  textSize(25);
  text("Ingryd Duarte. M: 570661", width / 2, height / 2 + 100);

  rect(pX, pY, 80, 40);
  fill("#161616");
  textSize(15);
  text("Voltar", pX + 40, pY + 25);

  // Botão de volta
  if (mouseIsPressed) {
    if (
      mouseX >= pX &&
      mouseX <= pX + 80 &&
      mouseY >= pY &&
      mouseY <= pY + 40
    ) {
      tela = 0; // Voltar à tela inicial
    }
  }
}
