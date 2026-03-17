export interface particle {
    x: number,
    y: number,
    vx: number,
    vy?: number
    startvy: number,
    scale: number,
    lifetime: number,
    age: number,
    finalScale: number
}

export type color = [number, number, number]

export type particleOptions = {
    minVx?: number
    maxVx?: number
    minVy?: number
    maxVy?: number
    minScale?: number
    maxScale?: number
    minLifetime?: number
    maxLifetime?: number
};

export type preDrownCallBack = (deltaTime: number, particles: particle[]) => void