export const ruler = () => {
  var selected = false;

  var mouse = { x: 0, y: 0, down: false, setXPos: 0, setYPos: 0 }
    
  window.onmousemove = (e) => {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    console.log(mouse.x);
    console.log(mouse.y);
    if (getDistance(mouse.x, mouse.y, rulerX, rulerY) < 60) {
      // debugger
      window.onmousedown = () => {
        // debugger
        window.localStorage["drag"] = "true";
        window.localStorage["rulerInUse"] = "false";
      }
    }
    if (window.localStorage["drag"] === "true") {
      // debugger
      keepPaintRuler()
    }
  };

  function keepPaintRuler(click = null) {
    c.clearRect(mouse.x, mouse.y, 70, 70);
    c.drawImage(background, 0, 0, 1000, 600);
    // c.drawImage(ruler, rulerX, rulerY, 60, 60);
    c.drawImage(angryDino, dynoX, dynoY, canvas.height / 4, canvas.height / 4)
    c.drawImage(img2, kidX, kidY, canvas.height / 7, canvas.height / 7);
    c.drawImage(dadImage,
      startX, startY, dadImage.width / 1.4, 560,
      moveX, moveY, dadImage.width / 4, 130)
    c.drawImage(ruler, mouse.x - 40, mouse.y - 40, 70, 70);
    // debugger
    if (posXclick !== 0) {
      c.drawImage(ruler, posXclick, posYclick, 70, 70);
    }
  }

  window.onclick = () => {
    if ((window.localStorage["drag"] === "true") && ((getDistance(mouse.x, mouse.y, rulerX, rulerY)) > 120) && (posXclick !== 0)) {
      posXclick = 0;
      keepPaintRuler();
    } else if ((window.localStorage["drag"] === "true") && ((getDistance(mouse.x, mouse.y, rulerX, rulerY)) > 120)) {
      posXclick = mouse.x - 40;
      posYclick = mouse.y - 40;
    }
  };

  window.onmouseup = () => {
    // window.localStorage["drag"] = 'false';
    // c.drawImage(ruler, mouse.x - 40, mouse.y - 40, 70, 70);
  };
}
