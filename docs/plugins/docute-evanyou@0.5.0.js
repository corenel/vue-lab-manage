(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.evanyou = factory())
}(this, (function () { 'use strict'

var evanyou = function () {
  var c = document.getElementById('evanyou-canvas'),
      x = c.getContext('2d'),
      pr = window.devicePixelRatio || 1,
      w = window.innerWidth,
      h = window.innerHeight,
      f = 90,
      q,
      m = Math,
      r = 0,
      u = m.PI * 2,
      v = m.cos,
      z = m.random
  c.width = w * pr
  c.height = h * pr
  x.scale(pr, pr)
  x.globalAlpha = 0.6
  function i () {
      x.clearRect(0, 0, w, h)
      q = [{x: 0, y: h * .7 + f}, {x: 0, y: h * .7 - f}]
      while (q[1].x < w + f) { d(q[0], q[1]) }
  }
  function d (i, j) {
      x.beginPath()
      x.moveTo(i.x, i.y)
      x.lineTo(j.x, j.y)
      var k = j.x + (z() * 2 - 0.25) * f,
          n = y(j.y)
      x.lineTo(k, n)
      x.closePath()
      r -= u / -50
      x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
      x.fill()
      q[0] = q[1]
      q[1] = {x: k, y: n}
  }
  function y (p) {
      var t = p + (z() * 2 - 1.1) * f
      return (t > h || t < 0) ? y(p) : t
  }
  i()
  return i
}

var index = function () {
  return function (ref) {
    var router = ref.router

    var listener
    router.afterEach(function (to) {
      var isLanding = to.meta && (to.meta.name === 'landing')
      if (isLanding) {
        var canvas = document.createElement('canvas')
        canvas.id = 'evanyou-canvas'
        canvas.style.position = 'absolute'
        canvas.style.top = 0
        canvas.style.left = 0
        canvas.style.zIndex = 0
        canvas.style.width = '100%'
        canvas.style.width = '100%'
        canvas.style.pointerEvents = 'none'
        document.body.appendChild(canvas)
        listener = evanyou()
        document.addEventListener('click', listener)
      } else {
        var canvas$1 = document.getElementById('evanyou-canvas')
        if (canvas$1) {
          canvas$1.parentNode.removeChild(canvas$1)
        }
        if (listener) {
          document.removeEventListener('click', listener)
          listener = undefined
        }
      }
    })
  }
}

return index
})))
