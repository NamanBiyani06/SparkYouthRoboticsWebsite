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

