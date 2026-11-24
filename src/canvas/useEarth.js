// Ported from js/math/sphere.js - mathematically perfect textured sphere
// Renders a rotating earth using pixel-level canvas manipulation

const X = 0, Y = 1, Z = 2

export function useEarth(canvasEl, options = {}) {
  const width = options.width || 40
  const height = options.height || 40
  const textureUrl = options.textureUrl || '/images/earth512.jpg'

  const size = Math.min(width, height)
  const ctx = canvasEl.getContext('2d')
  const canvasImageData = ctx.createImageData(size, size)

  const hs = 30  // horizontal scale of viewing area
  const vs = 30  // vertical scale of viewing area
  const F = [0, 0, 0]  // focal point
  const S = [0, 30, 0]  // centre of sphere
  const r = 12  // radius

  const f = 30
  const fpr = 800  // frames per rotation

  let RY = 0, RZ = 0
  let ry, rz
  let textureWidth, textureHeight
  let textureImageData
  let animFrameId = null

  const hs_ch = hs / size
  const vs_cv = vs / size
  const hhs = 0.5 * hs
  const hvs = 0.5 * vs

  const VY2 = f * f
  const V = new Array(3)
  const L = new Array(3)

  const bx = F[X] - S[X]
  const by = F[Y] - S[Y]
  const bz = F[Z] - S[Z]
  const c = F[X]*F[X] + S[X]*S[X] + F[Y]*F[Y] + S[Y]*S[Y] + F[Z]*F[Z] + S[Z]*S[Z]
          - 2*(F[X]*S[X] + F[Y]*S[Y] + F[Z]*S[Z]) - r*r
  const c4 = c * 4

  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = function() {
    // Copy image to buffer
    const offscreen = document.createElement('canvas')
    textureWidth = img.naturalWidth
    textureHeight = img.naturalHeight
    offscreen.width = textureWidth
    offscreen.height = textureHeight
    const offCtx = offscreen.getContext('2d')
    offCtx.drawImage(img, 0, 0)
    textureImageData = offCtx.getImageData(0, 0, textureWidth, textureHeight)

    ry = 90 + 40  // tilt
    rz = 180 + 20  // turn
    RY = 90 - ry
    RZ = 180 - rz

    V[Y] = f

    const b = 2 * (-f * V[Y])
    const b2 = Math.pow(b, 2)

    const firstFramePos = Date.now() * (textureWidth / (20 * 1000))

    function calculateVector(h, v) {
      V[X] = hs_ch * h - hhs
      V[Z] = vs_cv * v - hvs

      const a = V[X]*V[X] + VY2 + V[Z]*V[Z]
      const s = b2 - a * c4

      if (s > 0) {
        const m1 = ((-b) - Math.sqrt(s)) / (2 * a)
        L[X] = m1 * V[X]
        L[Y] = by + m1 * V[Y]
        L[Z] = m1 * V[Z]

        const lx = L[X]
        const srz = Math.sin(rz)
        const crz = Math.cos(rz)
        L[X] = lx * crz - L[Y] * srz
        L[Y] = lx * srz + L[Y] * crz

        const lz = L[Z]
        const sry = Math.sin(ry)
        const cry = Math.cos(ry)
        L[Z] = lz * cry - L[Y] * sry
        L[Y] = lz * sry + L[Y] * cry

        const lh = textureWidth + textureWidth * (Math.atan2(L[Y], L[X]) + Math.PI) / (2 * Math.PI)
        const lv = textureWidth * Math.floor(textureHeight - 1 - (textureHeight * (Math.acos(L[Z] / r) / Math.PI) % textureHeight))
        return { lv: lv, lh: lh }
      }
      return null
    }

    // Pre-compute vectors
    const cache = new Array(size * size)
    for (let pixel = 0; pixel < size * size; pixel++) {
      const v = Math.floor(pixel / size)
      const h = pixel - v * size
      cache[pixel] = calculateVector(h, v)
    }

    function renderFrame(time) {
      const rx = RY * Math.PI / 180
      ry = 90 + 40
      rz = RZ * Math.PI / 180

      const posDelta = textureWidth / (20 * 1000)
      const turnBy = 24*60*60 + firstFramePos - time * posDelta

      const canvasData = canvasImageData.data
      const textureData = textureImageData.data

      for (let pixel = size * size - 1; pixel >= 0; pixel--) {
        const vector = cache[pixel]
        if (vector !== null) {
          let lh = Math.floor(vector.lh + turnBy) % textureWidth
          if (lh < 0) lh = textureWidth + lh

          const idxC = pixel * 4
          const idxT = (lh + vector.lv) * 4

          canvasData[idxC + 0] = textureData[idxT + 0]
          canvasData[idxC + 1] = textureData[idxT + 1]
          canvasData[idxC + 2] = textureData[idxT + 2]
          canvasData[idxC + 3] = 255
        }
      }
      ctx.putImageData(canvasImageData, 0, 0)
      animFrameId = requestAnimationFrame(renderFrame)
    }

    animFrameId = requestAnimationFrame(renderFrame)
  }
  img.src = textureUrl

  return function cleanup() {
    if (animFrameId) cancelAnimationFrame(animFrameId)
  }
}
