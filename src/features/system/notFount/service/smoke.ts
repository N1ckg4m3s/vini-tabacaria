'use client'

import { color, particle, particleOptions, preDrownCallBack } from "../type/service.types";

var opacities = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 5, 5, 7, 4, 4, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 17, 27, 41, 52, 56, 34, 23, 15, 11, 4, 9, 5, 1, 0, 0, 0, 0, 0, 0, 1, 45, 63, 57, 45, 78, 66, 52, 41, 34, 37, 23, 20, 0, 1, 0, 0, 0, 0, 1, 43, 62, 66, 64, 67, 115, 112, 114, 56, 58, 47, 33, 18, 12, 10, 0, 0, 0, 0, 39, 50, 63, 76, 87, 107, 105, 112, 128, 104, 69, 64, 29, 18, 21, 15, 0, 0, 0, 7, 42, 52, 85, 91, 103, 126, 153, 128, 124, 82, 57, 52, 52, 24, 1, 0, 0, 0, 2, 17, 41, 67, 84, 100, 122, 136, 159, 127, 78, 69, 60, 50, 47, 25, 7, 1, 0, 0, 0, 34, 33, 66, 82, 113, 138, 149, 168, 175, 82, 142, 133, 70, 62, 41, 25, 6, 0, 0, 0, 18, 39, 55, 113, 111, 137, 141, 139, 141, 128, 102, 130, 90, 96, 65, 37, 0, 0, 0, 2, 15, 27, 71, 104, 129, 129, 158, 140, 154, 146, 150, 131, 92, 100, 67, 26, 3, 0, 0, 0, 0, 46, 73, 104, 124, 145, 135, 122, 107, 120, 122, 101, 98, 96, 35, 38, 7, 2, 0, 0, 0, 50, 58, 91, 124, 127, 139, 118, 121, 177, 156, 88, 90, 88, 28, 43, 3, 0, 0, 0, 0, 30, 62, 68, 91, 83, 117, 89, 139, 139, 99, 105, 77, 32, 1, 1, 0, 0, 0, 0, 0, 16, 21, 8, 45, 101, 125, 118, 87, 110, 86, 64, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 28, 79, 79, 117, 122, 88, 84, 54, 46, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 6, 55, 61, 68, 71, 30, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 23, 25, 20, 12, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 12, 9, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0]
var smokeSpriteSize = 20

const floatInRange = (start: number, end: number): number => start + Math.random() * (end - start);

const makeSmokeSprite = (color?: color) => {
    const applyColor: color = color || [26, 46, 48];

    let smokeSprite = document.createElement('canvas')

    smokeSprite.width = smokeSpriteSize
    smokeSprite.height = smokeSpriteSize

    const ctx = smokeSprite.getContext('2d')

    const data = ctx.createImageData(smokeSpriteSize, smokeSpriteSize)
    const dt = data.data

    for (let i = 0; i < dt.length; i += 4) {
        dt[i] = applyColor[0]
        dt[i + 1] = applyColor[1]
        dt[i + 2] = applyColor[2]
        dt[i + 3] = opacities[i / 4] ?? 0
    }

    ctx.putImageData(data, 0, 0);

    return smokeSprite
}

const createParticle = (x: number, y: number, opt: particleOptions): particle => {
    const options: particleOptions = opt || {}
    let particle: particle = {
        x, y,
        vx: floatInRange(options.minVx || -1 / 100, options.maxVx || 4 / 100),
        startvy: floatInRange(options.minVy || -4 / 10, options.maxVy || -1 / 10),
        scale: floatInRange(options.minScale || 0, options.maxScale || 0.5),
        lifetime: floatInRange(options.minLifetime || 2000, options.maxLifetime || 8000),
        age: 0,
        finalScale: 0
    }

    particle.finalScale = floatInRange(
        options.minScale || 25 + particle.scale,
        options.maxScale || 30 + particle.scale
    )
    particle.vy = particle.startvy

    return particle
}

const updateParticle = (particle: particle, deltaTime: number) => {
    particle.x += particle.vx * deltaTime
    particle.y += particle.vy * deltaTime
    var frac = Math.sqrt(particle.age / particle.lifetime)
    particle.vy = (1 - frac) * particle.startvy
    particle.age += deltaTime
    particle.scale = frac * particle.finalScale
}

const drawParticle = (particle: particle, smokeParticleImage: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    context.globalAlpha = (1 - Math.abs(1 - 2 * particle.age / particle.lifetime)) / 8
    const off = particle.scale * smokeSpriteSize / 2
    const xmin = particle.x - off
    const xmax = xmin + off * 2
    const ymin = particle.y - off
    const ymax = ymin + off * 2
    context.drawImage(smokeParticleImage, xmin, ymin, xmax - xmin, ymax - ymin)
}

export const SmokeMachine = (context: CanvasRenderingContext2D, color?: color) => {
    const smokeParticleImage: HTMLCanvasElement = makeSmokeSprite(color)
    let particles = [];
    let preDrownCallBack: preDrownCallBack;

    const updateAndDrawParticles = (deltaTime: number) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        particles.forEach((p) => updateParticle(p, deltaTime))
        particles = particles.filter((p) => p.age < p.lifetime)

        particles.forEach((p) => drawParticle(p, smokeParticleImage, context))
        preDrownCallBack?.(deltaTime, particles)
    }

    let running = false
    let lastFrame = performance.now()

    const frame = (time: number) => {
        if (!running) return;
        const dt = time - lastFrame
        lastFrame = time;

        updateAndDrawParticles(dt)
        window.requestAnimationFrame(frame)
    }

    const addParticles = (x: number, y: number, numParticles: number = 10, options?: particleOptions) => {
        if (numParticles < 1) return Math.random() <= numParticles && particles.push(createParticle(x, y, options));
        for (var i = 0; i < numParticles; i++) particles.push(createParticle(x, y, options))
    }

    return {
        step: (dt: number = 16) => {
            console.log(dt)
            updateAndDrawParticles(dt)
        },
        start: () => {
            running = true
            lastFrame = performance.now()
            window.requestAnimationFrame(frame)
        },
        setPreDrawCallback: (func: preDrownCallBack) => {
            preDrownCallBack = func
        },
        stop: () => {
            running = false
        },
        addSmoke: addParticles
    }
}