var backToTop = document.getElementById("to-top-button");
// show the button when the user scroll 200px down
window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTop.classList.remove("hidden");
    } else {
        backToTop.classList.add("hidden");
    }
}
// scroll to top of page when user clicks the button
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
  
