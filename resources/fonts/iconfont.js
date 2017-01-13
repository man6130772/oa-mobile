;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-yonghu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M903.917 911.282c0 9.86-2.465 9.126-1.522 29.214 0 21.903-26.782 19.17-26.782 0v-29.214c0-175.697-212.604-290.892-303.313-321.335 92.465-27.992 188.265-144.33 188.265-262.918 0-117.224-100.696-233.7-248.564-233.7S265.297 208.31 265.297 327.034c0 117.354 96.231 233.035 186.418 262.913-88.124 28.314-303.328 147.165-303.328 321.335v29.214c0 19.17-28.304 27.384-28.304 0v-29.214c0-150.804 133.47-271.86 271.333-321.335-86.653-52.501-152.586-161.603-152.586-262.918 0-145.2 123.326-261.117 273.176-261.117S787.023 181.83 787.023 327.028c0 101.314-67.771 210.417-154.425 262.918 137.87 49.476 271.319 170.531 271.319 321.336z m0 0"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-mima" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M510.867 526.813c-29.502 0-53.407 23.904-53.407 53.409 0 15.816 6.875 30.022 17.802 39.8v49.207c0 19.666 15.94 35.607 35.606 35.607 19.662 0 35.606-15.941 35.606-35.607v-49.207c10.927-9.778 17.804-23.984 17.804-39.8-0.001-29.505-23.908-53.409-53.41-53.409zM760.11 366.596h-35.607v-89.01c0-117.993-95.637-213.626-213.635-213.626s-213.634 95.633-213.634 213.626v89.01h-35.606c-49.168 0-89.015 39.847-89.015 89.01V793.85c0 49.16 39.847 89.006 89.015 89.006h498.48c49.15 0 89.015-39.843 89.015-89.006V455.607c0.001-49.165-39.866-89.01-89.013-89.01zM510.867 99.565c98.316 0 178.029 79.708 178.029 178.02v89.01H332.862v-89.01h-0.023c0-98.312 79.713-178.02 178.028-178.02z m302.65 694.281c0 29.502-23.907 53.404-53.408 53.404H261.628c-29.503 0-53.409-23.902-53.409-53.404v-338.24c0-29.502 23.907-53.408 53.409-53.408h498.48c29.503 0 53.408 23.907 53.408 53.409v338.24z m0 0"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)