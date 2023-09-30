import { clsx, ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inp: ClassValue[]) {
  return twMerge(clsx(inp))
}

export function getRandomInt() {
  return Math.floor(Math.random() * 10_000_000)
}
