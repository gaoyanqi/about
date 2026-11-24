// Ported from js/math/heart.js - parametric heart curve canvas animation
// Heart curve: x = 16sin^3(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)

export function useHeart(canvasEl, options = {}) {
  const width = options.width || 100
  const height = options.height || 100
  const scale = options.scale || 2

  const ctx = canvasEl.getContext('2d')
  ctx.strokeStyle = 'red'
  ctx.beginPath()

  let t = -3
  let x = 0
  let y = 0
  let animFrameId = null

  function drawHeart() {
    if (t > 3) {
      setTimeout(redraw, 1000)
      return
    }
    x = 16 * Math.pow(Math.sin(t), 3)
    y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)

    const halfWidth = width / 2
    const halfHeight = height / 2
    const nx = halfWidth + x * scale
    const ny = height - (halfHeight + y * scale)

    ctx.lineTo(nx, ny)
    ctx.stroke()

    t += 0.025
    animFrameId = requestAnimationFrame(drawHeart)
  }

  function redraw() {
    ctx.clearRect(0, 0, width, height)
    t = -3
    ctx.beginPath()
    drawHeart()
  }

  drawHeart()

  return function cleanup() {
    if (animFrameId) cancelAnimationFrame(animFrameId)
  }
}
