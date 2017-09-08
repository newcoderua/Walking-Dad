var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var level1 = function() {


  // dyno
  var angryDino = new Image();
  angryDino.src = "https://s3.amazonaws.com/sportbnb-dev/t-rex4.png";
  var dynoX = 1000;
  var dynoY = 300;
  c.drawImage(angryDino, dynoX, dynoY, 200, 200)



  // icecream
  var icecreamXcoord = 990;
  var icecreamYcoord = 60;
  var img2 = document.getElementById("image2");
  c.drawImage(img2, icecreamXcoord, icecreamYcoord, 100, 100);

  //dad
  var dadImage = new Image();
  dadImage.src = 'https://s3.amazonaws.com/sportbnb-dev/spritesheet.png'
  dadImage.width = 600;
  dadImage.height = 120;
  var delta = dadImage.width / 2.6;
  var startX = 0;
  var startY = 0;
  var moveX = 158;
  var moveY = 100;
  c.drawImage(dadImage,
    startX, startY, dadImage.width / 2.4, 1300,
    moveX, moveY, dadImage.width / 6, 360)


  function walkRightLeft() {
    // debugger
    if (startX <= 1300) {
      startX += delta;
      return c.drawImage(dadImage,
                          startX + 49, 0, dadImage.width / 2.89, 1200,
                          moveX, moveY, dadImage.width / 6, 360);
    }
      startX = 0;
      return c.drawImage(dadImage,
                          startX + 49, 0, dadImage.width / 2.89, 1200,
                          moveX, moveY, dadImage.width / 6, 360);
  }

  function walkUpDown() {
    if (startX <= 1300) {
      startX += delta;
      return c.drawImage(dadImage,
                          startX + 49, 0, dadImage.width / 2.89, 1200,
                          moveX, moveY, dadImage.width / 6, 360);
    }
      startX = 0;
    return c.drawImage(dadImage,
                        startX + 49, 0, dadImage.width / 2.89, 1200,
                        moveX, moveY, dadImage.width / 6, 360);
  }

  function clearPrevDad() {
    c.clearRect(moveX, moveY, 120, 155);
  }

  function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
  }

  function reachGoal() {
    if (getDistance(moveX, moveY, icecreamXcoord, icecreamYcoord) < 80) {
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
    if (getDistance(moveX, moveY, dynoX, dynoY) < 80) {
      // debugger
      handleLoseSituationModal();
      window.addEventListener('click', () => $("#modalLose").removeClass("is-active"));
    } else if (getDistance(moveX, moveY, 665, cb()) < 80) {
      handleLoseSituationModal();
      window.addEventListener('click', () => $("#modalLose").removeClass("is-active"));
    }
  }

  function cb() {
    // debugger
    if ((moveY > 200) && (moveY < 300)) {
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
    // debugger
    if (moves.length < 1) {
      return;
    }
    var move = moves.shift();
    var dir = move.split(' ')[0];
    var step = move.split(' ')[1];
    // debugger
    useDirAndStep(dir, step);

  }

  window.addEventListener('submit', (e) => {
    e.preventDefault();
      window.moves = $('textarea')[0].value.split(/\n/);
      runMove(moves);



  });

  function useDirAndStep(dir, step) {
    switch (dir) {
      case "right":
        var int1 = setInterval(right, 200);
        var initX = moveX;
        function  right() {
          // debugger
          if (moveX - parseInt(step) === initX) {
            clearInterval(int1);
            // debugger
            runMove(moves);
          } else {
            reachGoal();
            reachDanger();
            clearPrevDad();
            moveX += parseInt(step) / 10;
            walkRightLeft();
          }
        }
        break;
      case "left":
        var int3 = setInterval(left, 200);
        var initX = moveX;
        function  left() {
          // debugger
          if (moveX + parseInt(step) === initX) {
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
        break;
      case "up":
        var int4 = setInterval(up, 200);
        var initY = moveY;
        function  up() {
          // debugger
          if (moveY + parseInt(step) === initY) {
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
        break;
      case "down":
        var int2 = setInterval(down, 200);
        var initY = moveY;
        function  down() {
          // debugger
          if (moveY - parseInt(step) === initY) {
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
        break;
      default:

    }

}

  window.addEventListener('keydown', (e) => {
    reachGoal();
    reachDanger();
    clearPrevDad();
    switch (e.which) {
      case 37:
      moveX -= 30;
      walkRightLeft();
      break;
      case 40:
      moveY += 30;
      walkUpDown();
      break;
      case 39:
      moveX += 30;
      walkRightLeft();
      break;
      case 38:
      moveY -= 30;
      walkUpDown();
      break;
      default:
      c.drawImage(dadImage, startX + 49, 0, dadImage.width / 2.89, 1200,
                          moveX, moveY, dadImage.width / 6, 360)
      }
    });

}


document.addEventListener("DOMContentLoaded", () => {
    level1();
  });
// implementation
