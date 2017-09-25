
window.addEventListener("DOMContentLoaded", () => {
  var posXclick = 0;
  var posYclick = 0;
  window.localStorage['drag'] = "false";
  window.localStorage["markedPlace"] = 'false';
  window.localStorage["rulerInUse"] = "false";


  if (window.localStorage['placeholder'] !== undefined) {
    document.getElementById("prev-inserted-code").innerHTML = window.localStorage['placeholder'].split(',').join('\n')
  }
  $('textarea').focus();
  var canvas = document.querySelector('canvas');
  var c = canvas.getContext('2d');

  canvas.width = 1000;
  canvas.height = 600;
  var background = new Image();
  background.src = "https://s3.amazonaws.com/sportbnb-dev/back1.png";
  c.drawImage(background, 0, 0, 1000, 600);
  // dyno
  var angryDino = new Image();
  angryDino.src = "https://s3.amazonaws.com/sportbnb-dev/t-rex4.png";
  var dynoX = (canvas.width / 2) + canvas.height / 2;
  var dynoY = (canvas.height / 2) - canvas.height / 6;
  c.drawImage(angryDino, dynoX, dynoY, canvas.height / 4, canvas.height / 4)

  // kid
  var kidX = (canvas.width / 2) + canvas.height / 2;;
  var kidY = (canvas.height / 2) - canvas.height / 2;
  var img2 = new Image();
  img2.src = "https://s3.amazonaws.com/sportbnb-dev/Dapino-Baby-Boy-Baby-laughing.ico";
  c.drawImage(img2, kidX, kidY, canvas.height / 7, canvas.height / 7);

  //ruler
  var rulerX = 20;
  var rulerY = 20;
  var ruler = new Image();
  ruler.src = "https://s3.amazonaws.com/sportbnb-dev/ruler3.png";
  c.drawImage(ruler, rulerX, rulerY, 60, 60);

  //dad
  var dadImage = new Image();
  dadImage.src = "https://s3.amazonaws.com/sportbnb-dev/spritesheet.png";
  dadImage.width = 280;
  dadImage.height = 60;
  var delta = dadImage.width / 1.05;
  var startX = 0;
  var startY = 0;
  var moveX = 120;
  var moveY = 120;
  c.drawImage(dadImage,
                      startX, startY, dadImage.width / 1.4, 560,
                      moveX, moveY, dadImage.width / 4, 130)
  // debugger
  // check dragability

  var mouse = { x: 0, y: 0, down: false, setXPos: 0, setYPos: 0 }
  window.onmousemove = (e) => {
    // console.log(e.pageX);
    // console.log(window.innerWidth - canvas.width);
    clearPrevDad();
      c.drawImage(dadImage,
        startX, startY, dadImage.width / 1.4, 560,
        moveX, moveY, dadImage.width / 4, 130);


    if (window.innerWidth - canvas.width > 620) {
      mouse.x = e.pageX - 140;
    } else if (window.innerWidth - canvas.width > 520) {
      // debugger
      mouse.x = e.pageX - 90;
    } else if (window.innerWidth - canvas.width > 320) {
      mouse.x = e.pageX - 50;
    } else if (window.innerWidth - canvas.width > 120) {
      mouse.x = e.pageX - 20;
    } else {
      mouse.x = e.pageX;
    }
    mouse.y = e.pageY;

    // debugger
    if (getDistance(mouse.x, mouse.y, rulerX, rulerY) < 60) {
      window.onmousedown = () => {
        window.localStorage["drag"] = "true";
      }
    }
    if ((window.localStorage["drag"] === "true")) {
      keepPaintRuler()
    }
  };

  function keepPaintRuler(click = null) {
    c.clearRect(mouse.x, mouse.y, 70, 70);
    c.drawImage(background, 0, 0, 1000, 600);
    c.drawImage(angryDino, dynoX, dynoY, canvas.height / 4, canvas.height / 4)
    c.drawImage(img2, kidX, kidY, canvas.height / 7, canvas.height / 7);
    c.drawImage(dadImage,
      startX, startY, dadImage.width / 1.4, 560,
      moveX, moveY, dadImage.width / 4, 130)
    c.drawImage(ruler, mouse.x - 40, mouse.y - 40, 70, 70);
    if (posXclick !== 0) {
      c.beginPath();
      c.moveTo(posXclick + 20,posYclick + 20);
      c.lineTo(mouse.x,mouse.y);
      c.stroke();
      c.font = "30px Arial";
      var distTo = Math.floor(getDistance(mouse.x, mouse.y, posXclick, posYclick));
      c.fillText(`${distTo - 70}`, mouse.x + 10, mouse.y + 50);
    }

  }

  window.onclick = () => {
    if ((window.localStorage["drag"] === "true") && ((getDistance(mouse.x, mouse.y, rulerX, rulerY)) > 120) && (posXclick !== 0)) {
      // debugger
      posXclick = 0;
      keepPaintRuler();
    } else if ((window.localStorage["drag"] === "true") && ((getDistance(mouse.x, mouse.y, rulerX, rulerY)) > 120)) {
      // debugger
      window.localStorage["rulerInUse"] = "true";
      posXclick = mouse.x - 40;
      posYclick = mouse.y - 40;
    } else if ((window.localStorage["drag"] === "true") && ((getDistance(mouse.x, mouse.y, rulerX, rulerY)) < 120) && (window.localStorage["rulerInUse"] === "true")) {
      // debugger
      window.localStorage["drag"] = "false";
      window.localStorage["rulerInUse"] = 'false';
    }
  };



  function walkRightLeft() {
    // debugger
    if (startX <= 500) {
      startX += delta;
      return c.drawImage(dadImage,
                          startX, startY, dadImage.width / 1.4, 560,
                          moveX, moveY, dadImage.width / 4, 130);
    }
      startX = 0;
      return c.drawImage(dadImage,
                          startX, startY, dadImage.width / 1.4, 560,
                          moveX, moveY, dadImage.width / 4, 130);
  }

  function walkUpDown() {
    if (startX <= 500) {
      startX += delta;
      return c.drawImage(dadImage,
                          startX, startY, dadImage.width / 1.4, 560,
                          moveX, moveY, dadImage.width / 4, 130);
    }
      startX = 0;
    return c.drawImage(dadImage,
                        startX, startY, dadImage.width / 1.4, 560,
                        moveX, moveY, dadImage.width / 4, 130);
  }

  function clearPrevDad() {
    c.clearRect(moveX, moveY, 120, 150);
    c.drawImage(background, 0, 0, 1000, 600);
    c.drawImage(angryDino, dynoX, dynoY, canvas.height / 4, canvas.height / 4);
    c.drawImage(img2, kidX, kidY, canvas.height / 7, canvas.height / 7);
    c.drawImage(ruler, rulerX, rulerY, 60, 60);

  }

  function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
  }

  function reachGoal() {
    if (getDistance(moveX, moveY, kidX, kidY) < 100) {
      freezeDad();
      handleWinSituationModal();
      window.addEventListener('click', () => $("#modal").removeClass("is-active"));
    }
  }

  function handleWinSituationModal(){
    $(document).ready(function(){
      return $("#modal").addClass("is-active");
    });
  }

  function reachDanger() {
    window.moveX = moveX;
    window.moveY = moveY;
    if (getDistance(moveX, moveY, dynoX, dynoY) < 130) {
      freezeDad();
      handleLoseSituationModal();
      } else if (getDistance(moveX, moveY, canvas.width / 2, cb()) < 130) {
        freezeDad();
      handleLoseSituationModal();
    }
  }

  function freezeDad() {
    clearInterval(window.int1);
    clearInterval(window.int2);
    clearInterval(window.int3);
    clearInterval(window.int4);
  }

  function cb() {
    if ((moveY > ((canvas.height / 4) + 20)) && (moveY < ((canvas.height / 4) + 120))) {
      return 1000000;
    } else {
      return moveY;
    }
  }

  function handleLoseSituationModal() {
      $(document).ready(function(){
          return $("#modalLose").addClass("is-active");
    });
  }


  function runMove(moves) {
    if (moves.length < 1) {
      if ($("#modal")[0].className === "modal is-active") {
        return;
      }
      return handleLoseSituationModal();
    }
    var move = moves.shift();
    var dir = move.split(' ')[0];
    var step = move.split(' ')[1];
    useDirAndStep(dir, step);

  }

  window.addEventListener('submit', (e) => {
    e.preventDefault();
      window.moves = $('textarea')[0].value.split(/\n/);
      window.localStorage['placeholder'] = moves;
      runMove(moves);
  });

  function useDirAndStep(dir, step) {
    switch (dir) {
      case "right":
      // debugger
        function  right() {
          if (moveX - parseInt(step) >= initX) {
            clearInterval(int1);
            runMove(moves);
          } else {
            reachGoal();
            reachDanger();
            clearPrevDad();
            moveX += parseInt(step) / 10;
            walkRightLeft();
          }
        }
        window.int1 = setInterval(right, 200);
        var initX = moveX;
        break;
      case "left":
        function  left() {
          if (moveX + parseInt(step) <= initX) {
            clearInterval(int3);
            runMove(moves);
          } else {
            reachGoal();
            reachDanger();
            clearPrevDad();
            moveX -= parseInt(step) / 10;
            walkRightLeft();
          }
        }
        window.int3 = setInterval(left, 200);
        var initX = moveX;
        break;
      case "up":
        function  up() {
          // debugger
          if (moveY + parseInt(step) <= initY) {
            clearInterval(int4);
            runMove(moves);
          } else {
            reachGoal();
            reachDanger();
            clearPrevDad();
            moveY -= parseInt(step) / 10;
            walkUpDown();
          }
        }
        window.int4 = setInterval(up, 200);
        var initY = moveY;
        break;
      case "down":
        function  down() {
          // debugger
          if (moveY - parseInt(step) >= initY) {
            clearInterval(int2);
            runMove(moves);
          } else {
            reachGoal();
            reachDanger();
            clearPrevDad();
            moveY += parseInt(step) / 10;
            walkRightLeft();
          }
        }
        window.int2 = setInterval(down, 200);
        var initY = moveY;
        break;
      default:
        c.drawImage(dadImage,
                          startX, startY, dadImage.width / 1.4, 540,
                          moveX, moveY, dadImage.width / 4, 130)
    }
  }
  // window.addEventListener('keydown', (e) => {
  //   // console.log(moveX, moveY);
  //   reachGoal();
  //   reachDanger();
  //   clearPrevDad();
  //   switch (e.which) {
  //     case 37:
  //     moveX -= 30;
  //     walkRightLeft();
  //     break;
  //     case 40:
  //     moveY += 30;
  //     walkUpDown();
  //     break;
  //     case 39:
  //     moveX += 30;
  //     walkRightLeft();
  //     break;
  //     case 38:
  //     moveY -= 30;
  //     walkUpDown();
  //     break;
  //     default:
  //     c.drawImage(dadImage,
  //       startX, startY, dadImage.width / 1.4, 560,
  //       moveX, moveY, dadImage.width / 4, 130)
  //     }
  //   });
})
