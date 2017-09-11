var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');


canvas.width = 1000;
canvas.height = 600;

var level1 = function() {


  // dyno
  var angryDino = document.getElementById("dyno");
  var dynoX = (canvas.width / 2) + canvas.height / 2;
  var dynoY = (canvas.height / 2) - canvas.height / 6;
  c.drawImage(angryDino, dynoX, dynoY, canvas.height / 4, canvas.height / 4)




  // kid
  var kidX = (canvas.width / 2) + canvas.height / 2;;
  var kidY = (canvas.height / 2) - canvas.height / 2;
  var img2 = document.getElementById("kid");
  c.drawImage(img2, kidX, kidY, canvas.height / 7, canvas.height / 7);

  //dad
  // var dadImage = new Image();
  // dadImage.src = 'https://s3.amazonaws.com/sportbnb-dev/spritesheet.png'
  var dadImage = document.getElementById("dad");
  // dadImage.src = "https://github.com/newcoderua/Walking-Dad/blob/master/images/walking-dad.png"
  // dadImage.width = 600;
  // dadImage.height = 120;
  // var delta = dadImage.width / 2.6;
  // var startX = 0;
  // var startY = 0;
  // var moveX = 158;
  // var moveY = 100;
  // c.drawImage(dadImage,
  //   startX, startY, dadImage.width / 2.4, 1300,
  //   moveX, moveY, dadImage.width / 6, 360)

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
        window.int1 = setInterval(right, 200);
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
        window.int3 = setInterval(left, 200);
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
        window.int4 = setInterval(up, 200);
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
        window.int2 = setInterval(down, 200);
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
        c.drawImage(dadImage,
                          startX, startY, dadImage.width / 1.4, 540,
                          moveX, moveY, dadImage.width / 4, 130)
    }

}

  window.addEventListener('keydown', (e) => {
    console.log(moveX, moveY);
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
      // debugger
      c.drawImage(dadImage,
                          startX, startY, dadImage.width / 1.4, 560,
                          moveX, moveY, dadImage.width / 4, 130)
      }
    });

}

  $(window).ready(function() {
    // debugger
    document.getElementById("prev-inserted-code").innerHTML = window.localStorage['placeholder'].split(',').join('\n')
    $('textarea').focus();
      level1();
  });
// implementation
