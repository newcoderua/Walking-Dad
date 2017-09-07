var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var level1 = function() {
  var dadImage = new Image();
  dadImage.src = ('https://s3.amazonaws.com/sportbnb-dev/spritesheet.png')
  dadImage.width = 600;
  dadImage.height = 120;
  var delta = dadImage.width / 2.6;
  var startX = 0;
  var moveX = 258;
  var moveY = 200;
  c.drawImage(dadImage,
    startX, 0, dadImage.width / 2.3, 1300,
    258, moveY, dadImage.width / 6, 360)


  function walkRightLeft() {
    if (startX <= 1300) {
      startX += delta;
      return c.drawImage(dadImage,
      startX, 0, dadImage.width / 2.3, 1200,
      moveX, moveY, dadImage.width / 6, 360);
    }
      startX = 0;
    return c.drawImage(dadImage,
    startX, 0, dadImage.width / 2.3, 1200,
    moveX, moveY, dadImage.width / 6, 360);
  }

  function walkUpDown() {
    // debugger
    if (startX <= 1300) {
      startX += delta;
      return c.drawImage(dadImage,
      startX, 0, dadImage.width / 2.3, 1200,
      moveX, moveY, dadImage.width / 6, 360);
    }
      startX = 0;
    return c.drawImage(dadImage,
    startX, 0, dadImage.width / 2.3, 1200,
    moveX, moveY, dadImage.width / 6, 360);
  }

  window.addEventListener('submit', (e) => {
    e.preventDefault();
    // debugger


      if ($('textarea')[0].value.split(/\n/)[0] === "right 10") {
        var int = setInterval(one, 200);

        function one() {
          if (moveX >= 400) {
            clearInterval(int);
            if ($('textarea')[0].value.split(/\n/)[1] === "down 20") {
               var int2 = setInterval(two, 200);

               function two() {
                 if (moveY >= 500) {
                   clearInterval(int2);
                   falsed = false;
                 } else {
                   run();
                   clearPrevDad();
                   moveY += 30
                   walkUpDown();
                 }
               }
             }
          } else {
            run();
            clearPrevDad();
            moveX += 30
            walkRightLeft();
          }
        }
      }



  });



  //green rect
  c.fillStyle="green";
  c.fillRect(10, 10, 100, 100);

  // red rect
  c.fillStyle="red";
  c.fillRect(200, 400, 100, 100);

  //blue lines
  c.beginPath();
  c.moveTo(600, 0);
  c.lineTo(600, 300);
  c.lineTo(800, 300);
  c.lineTo(800, 0);
  c.strokeStyle="blue";
  c.closePath();
  c.stroke();



  //icecream
  var icecreamXcoord = 990;
  var icecreamYcoord = 60;
  var img2 = document.getElementById("image2");
  c.drawImage(img2, icecreamXcoord, icecreamYcoord, 100, 100);

  function clearPrevDad() {
    c.clearRect(moveX, moveY, 120, 155);
  }


  window.addEventListener('keydown', (e) => {
    run();
    clearPrevDad();
    // const change = 20;
    switch (e.which) {
      case 37:
        moveX -= 30;
        walkRightLeft();
        break;
      case 40:
        // moveY += 30;
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
      // case 13:
      //   // debugger
      //   break;
      default:
      c.drawImage(dadImage,
        startX, 0, dadImage.width / 2.3, 1300,
        258, moveY, dadImage.width / 6, 360)
    }
  });

  function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
  }

  function run() {
    if (getDistance(moveX, moveY, icecreamXcoord, icecreamYcoord) < 65) {
      handleModal();
      window.addEventListener('click', () => $("#modal").removeClass("is-active"));
    }
  }

  function handleModal(){
      $(document).ready(function(){
          return $("#modal").addClass("is-active");
    });
  }
}

// implementation
level1();
