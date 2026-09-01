export function currentYear(now: Date = new Date()): number {
  return now.getFullYear()
}

export function isExpired(year: number, now: Date = new Date()): boolean {
  return year < currentYear(now)
}

export function isExpiringSoon(year: number, now: Date = new Date()): boolean {
  return year === currentYear(now)
}
