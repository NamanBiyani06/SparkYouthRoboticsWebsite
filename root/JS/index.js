var toTopButton = document.getElementById("to-top-button");
// When the user scrolls down 200px from the top of the document, show the button
window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        toTopButton.classList.remove("hidden");
    } else {
        toTopButton.classList.add("hidden");
    }
}

// When the user clicks on the button, smoothy scroll to the top of the document
function goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
} 

/* TEXT WRITER ANIMATION HEADER LANDING PAGE */
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

(() => {
  const genSvg = (target) => {
    target.insertAdjacentHTML(
      "afterbegin", 
      `<svg id="svg-spinner" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none" xmlns="http://www.w3.org/2000/svg"></svg>`
    );
    return target.firstChild;
  }
  
  const genRects = (svg, colors) => {
    colors.forEach((color, i) => {
      svg.insertAdjacentHTML(
        "beforeend", 
        `<rect x="2.5" y="2.5" fill="none" stroke-width="5" rx="5"/>`
      );
      svg.lastChild.style.stroke = "#" + colors[i] + "55";
      svg.lastChild.style.willChange = "stroke-dashoffset, stroke-dasharray";
    });
  }
  const setRectAttributes = (svg) => {
    const wh = {
      w: svg.clientWidth,
      h:  svg.clientHeight,
    };
    for (let child of svg.children) {
      child.style.width = wh.w - 5;
      child.style.height = wh.h - 5;
    }
  }
  
  const genKeyFrames = (css, i, len) => {
      css.insertRule(`
  @keyframes dash_${i} {
    from {
        stroke-dashoffset: ${(i + 1) * len};
  
    }
    to {
        stroke-dashoffset: ${i * len};
  
    }
  }
  `, css.cssRules.length)
  }
  
  const delAllKeyFrames = (css, len) => {
    for (let i = 0; i < len; i++) {
    console.log(css.cssRules[css.cssRules.length - 1])
      css.deleteRule(css.cssRules.length - 1);
    }
  }
  
  
  const rotateColors = (css, svg, delay, direction) => {
    const len = svg.children[0].getTotalLength() / svg.children.length;
    for (let i = 0; i < svg.children.length; i++) {
      genKeyFrames(css, i, len);
      const child = svg.children[i];
      // reset for resonsiveness/animation
      child.style.strokeDasharray = `${len}, ${len * (svg.children.length - 1)}`;
      child.style.animation = `dash_${i} ${delay * 0.001}s linear ${direction === "reverse" ? "reverse" : ""} infinite`;
    }
    const child = direction === "reverse" ? svg.lastChild : svg.firstChild;
    svg.removeChild(child);
    direction === "reverse" ? svg.insertBefore(child, svg.firstChild) : svg.appendChild(child);
  }
  
  const initiate = () => {
    const colors = ["DB4437", "0F9D58", "F4B400", "4285F4"];
    const target = document.querySelector(".xyz");
    const css = document.styleSheets[document.styleSheets.length - 1];
    const delay = 1000;
    const direction = "forward";
    const svg = genSvg(target);
    let keyFramesExist = false;
    genRects(svg, colors);
    
    const main = () => {
      keyFramesExist && delAllKeyFrames(css, svg.children.length);
      rotateColors(css, svg, delay, direction);
      keyFramesExist = true;
    }
    setRectAttributes(svg);
    main();
    setInterval(main, delay);
    setInterval(setRectAttributes, Math.max(delay * 0.1, 300), svg);
  }
  initiate();
  })();
  

/* CUSTOM CURSOR 

class GlitchEffect {
  constructor() {
    this.root = document.body
    this.cursor = document.querySelector(".curzr")

    this.distanceX = 0, 
    this.distanceY = 0,
    this.pointerX = 0,
    this.pointerY = 0,
    this.previousPointerX = 0
    this.previousPointerY = 0
    this.cursorSize = 25
    this.glitchColorB = '#00feff'
    this.glitchColorR = '#ff4f71'

    this.cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: `${ this.cursorSize / -2 }px`,
      left: `${ this.cursorSize / -2 }px`,
      zIndex: '2147483647',
      width: `${ this.cursorSize }px`,
      height: `${ this.cursorSize }px`,
      backgroundColor: '#222',
      borderRadius: '50%',
      boxShadow: `0 0 0 ${this.glitchColorB}, 0 0 0 ${this.glitchColorR}`,
      transition: '100ms, transform 0ms',
      userSelect: 'none',
      pointerEvents: 'none'
    }

    if (CSS.supports("backdrop-filter", "invert(1)")) {
      this.cursorStyle.backdropFilter = 'invert(1)'
      this.cursorStyle.backgroundColor = '#fff0'
    } else {
      this.cursorStyle.backgroundColor = '#222'
    }

    this.init(this.cursor, this.cursorStyle)
  }

  init(el, style) {
    Object.assign(el.style, style)
    this.cursor.removeAttribute("hidden")
    
    document.body.style.cursor = 'none'
    document.body.querySelectorAll("button, label, input, textarea, select, a").forEach((el) => {
      el.style.cursor = 'inherit'
    })
  }

  move(event) {
    this.previousPointerX = this.pointerX
    this.previousPointerY = this.pointerY
    this.pointerX = event.pageX + this.root.getBoundingClientRect().x
    this.pointerY = event.pageY + this.root.getBoundingClientRect().y
    this.distanceX = Math.min(Math.max(this.previousPointerX - this.pointerX, -10), 10)
    this.distanceY = Math.min(Math.max(this.previousPointerY - this.pointerY, -10), 10)

    if (event.target.localName === 'button' || 
        event.target.localName === 'a' || 
        event.target.onclick !== null ||
        event.target.className.includes('curzr-hover')) {
      this.hover()
    } else {
      this.hoverout()
    }

    this.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
    this.cursor.style.boxShadow = `
      ${+this.distanceX}px ${+this.distanceY}px 0 ${this.glitchColorB}, 
      ${-this.distanceX}px ${-this.distanceY}px 0 ${this.glitchColorR}`
    this.stop()
  }

  hover() {
  }

  hoverout() {
  }

  click() {
    this.cursor.style.transform += ` scale(0.75)`
    setTimeout(() => {
      this.cursor.style.transform = this.cursor.style.transform.replace(` scale(0.75)`, '')
    }, 35)
  }

  stop() {
    if (!this.moving) {
      this.moving = true
      setTimeout(() => {
        this.cursor.style.boxShadow = ''
        this.moving = false
      }, 50)
    }
  }

  remove() {
    this.cursor.remove()
  }
}

(() => {
  const cursor = new GlitchEffect()
  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.onmousemove = function (event) {
      cursor.move(event)
    }
    document.onclick = function () {
      cursor.click()
    }
  } else {
    cursor.remove()
  }
})() */

