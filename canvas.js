var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var level1 = function() {
  //green rect
  c.fillStyle="green";
  c.fillRect(10, 10, 100, 100);

  //red rect
  c.fillStyle="red";
  c.fillRect(200, 300, 100, 100);

  //blue lines
  c.beginPath();
  c.moveTo(600, 0);
  c.lineTo(600, 300);
  c.lineTo(800, 300);
  c.lineTo(800, 0);
  c.strokeStyle="blue";
  c.stroke();

  //mario
  var marioXcoord = 30;
  var marioYcoord = 280;
  var img = document.getElementById("image");
  c.drawImage(img, marioXcoord, marioYcoord, 120, 120);

  //icecream
  var icecreamXcoord = 990;
  var icecreamYcoord = 60;
  var img2 = document.getElementById("image2");
  c.drawImage(img2, icecreamXcoord, icecreamYcoord, 100, 100);

  function clearPrevMario() {
    c.fillStyle="lightyellow";
    c.fillRect(marioXcoord, marioYcoord, 120, 120);
  }


  window.addEventListener('keydown', (e) => {
    run();
    const change = 20;
    switch (e.which) {
      case 37:
        clearPrevMario();
        marioXcoord -= change;
        c.drawImage(img, marioXcoord, marioYcoord, 120, 120)
        break;
      case 40:
        clearPrevMario();
        marioYcoord += change;
        c.drawImage(img, marioXcoord, marioYcoord, 120, 120)
        break;
      case 39:
        clearPrevMario();
        marioXcoord += change;
        c.drawImage(img, marioXcoord, marioYcoord, 120, 120)
        break;
      case 38:
        clearPrevMario();
        marioYcoord -= change;
        c.drawImage(img, marioXcoord, marioYcoord, 120, 120)
        break;
      default:
        c.drawImage(img, 30, 280, 120, 120)
    }
  });

  function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
  }

  function run() {
    if (getDistance(marioXcoord, marioYcoord, icecreamXcoord, icecreamYcoord) < 65) {
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
