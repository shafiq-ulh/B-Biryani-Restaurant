import type { ReactElement, SVGProps } from 'react'

export type IconName =
  | 'whatsapp'
  | 'phone'
  | 'pin'
  | 'star'
  | 'clock'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'arrow-left'
  | 'menu'
  | 'close'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'check'
  | 'flame'
  | 'utensils'
  | 'camera'
  | 'sparkle'
  | 'instagram'
  | 'facebook'
  | 'tiktok'

/** Rendered as filled glyphs (logos / marks). */
const fillPaths: Partial<Record<IconName, ReactElement>> = {
  whatsapp: (
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.86.5 3.6 1.4 5.1L2 22l5.2-1.56a9.9 9.9 0 0 0 4.84 1.26c5.44 0 9.84-4.4 9.84-9.84S17.48 2 12.04 2Zm0 17.98a8.1 8.1 0 0 1-4.14-1.14l-.3-.18-3.08.92.94-3-.2-.32a8.06 8.06 0 0 1-1.24-4.32c0-4.5 3.66-8.16 8.16-8.16s8.14 3.66 8.14 8.16-3.66 8.04-8.28 8.04Zm4.5-5.98c-.24-.12-1.44-.72-1.66-.8-.22-.08-.38-.12-.54.12s-.62.8-.76.96c-.14.16-.28.18-.52.06a6.66 6.66 0 0 1-1.96-1.2 7.4 7.4 0 0 1-1.36-1.7c-.14-.24 0-.36.1-.48.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.5.58.19 1.1.16 1.52.1.46-.07 1.44-.58 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
  ),
  star: (
    <path d="m12 3.6 2.6 5.28 5.82.85-4.2 4.1.99 5.79L12 16.88l-5.2 2.74.99-5.79-4.2-4.1 5.82-.85L12 3.6Z" />
  ),
  flame: (
    <path d="M12.4 2.3c.4 1.9-.5 3.3-1.5 4.5-.9 1-1.8 2-1.8 3.6 0 1.1.6 2 1.4 2.5-.4-1.5.3-2.8 1.3-3.7-.1 2 1 3.4 2.4 3.4 1.1 0 2-.7 2-1.9 0-1.4-.9-2.4-1.5-3.4-.7-1.1-1.3-2.3-.9-4.2-.6.4-1.1 1-1.4 1.6-.1-1.1.1-2.1 1.5-2.4Zm-1.9 18.9h3.3c1.9 0 3.5-1.4 3.5-3.4 0-1.7-1-3.1-2.5-3.6.4 1.9-.6 3.7-2.5 3.7-1 0-1.9-.6-2.2-1.5-.6.8-1.4 1.4-2.4 1.4h2.3Z" />
  ),
  sparkle: (
    <path d="m12 3.4 1.5 5.2 5.2 1.5-5.2 1.5L12 16.8l-1.5-5.2-5.2-1.5 5.2-1.5L12 3.4ZM18.4 15l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" />
  ),
  camera: (
    <path d="M9.2 4.5h5.6l.9 1.6h2.3A2.3 2.3 0 0 1 20.3 8.4v8.4a2.3 2.3 0 0 1-2.3 2.3H6a2.3 2.3 0 0 1-2.3-2.3V8.4a2.3 2.3 0 0 1 2.3-2.3h2.3l.9-1.6ZM12 16.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z" />
  ),
  instagram: (
    <path d="M16.4 3.5H7.6A4.1 4.1 0 0 0 3.5 7.6v8.8a4.1 4.1 0 0 0 4.1 4.1h8.8a4.1 4.1 0 0 0 4.1-4.1V7.6a4.1 4.1 0 0 0-4.1-4.1Zm2.2 12.9a2.2 2.2 0 0 1-2.2 2.2H7.6a2.2 2.2 0 0 1-2.2-2.2V7.6a2.2 2.2 0 0 1 2.2-2.2h8.8a2.2 2.2 0 0 1 2.2 2.2v8.8ZM12 7.4A4.6 4.6 0 1 0 12 16.6 4.6 4.6 0 0 0 12 7.4Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.3-8.6a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
  ),
  facebook: <path d="M13.9 21v-8.2h2.7l.4-3.1h-3.1V7.7c0-.9.3-1.5 1.6-1.5h1.6V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H8.1v3.1h2.6V21h3.2Z" />,
  tiktok: (
    <path d="M16.2 3h-2.7v12.1a2.4 2.4 0 1 1-2.4-2.4c.2 0 .5 0 .7.1V10a5.3 5.3 0 1 0 4.4 5.2V8.6a6.4 6.4 0 0 0 3.6 1.1V7a3.7 3.7 0 0 1-3.6-4Z" />
  ),
}

/** Rendered as line art (stroke). */
const strokePaths: Partial<Record<IconName, ReactElement>> = {
  phone: (
    <path d="M21.5 16.9v2.8a2 2 0 0 1-2.2 2 19.6 19.6 0 0 1-8.5-3 19.2 19.2 0 0 1-5.9-5.9 19.6 19.6 0 0 1-3-8.6 2 2 0 0 1 2-2.2h2.8a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1l-1.2 1.2a15.8 15.8 0 0 0 5.9 5.9l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  ),
  pin: (
    <>
      <path d="M20 10.4c0 5.6-8 12-8 12s-8-6.4-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10.2" r="2.8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.4V12l3.2 1.9" />
    </>
  ),
  'arrow-right': <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />,
  'arrow-up-right': <path d="M7 17 17 7m0 0H8.5M17 7v8.5" />,
  'arrow-left': <path d="M20 12H5m0 0 5.5-5.5M5 12l5.5 5.5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-left': <path d="m15 6-6 6 6 6" />,
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  utensils: <path d="M7 3v7m0 0v11m0-11a2.5 2.5 0 0 0 0-5M5 3v5a2 2 0 0 0 4 0V3M17 3c-1.5 1.5-2 3.5-2 6s.7 3.5 2 3.5V21" />,
}

export function Icon({
  name,
  size = 20,
  filled = false,
  ...rest
}: { name: IconName; size?: number; filled?: boolean } & SVGProps<SVGSVGElement>) {
  const fillIcon = name in fillPaths
  const body = fillIcon ? fillPaths[name] : strokePaths[name]
  const useFill = filled || fillIcon

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      fill={useFill ? 'currentColor' : 'none'}
      fillRule="evenodd"
      stroke={useFill ? 'none' : 'currentColor'}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {body}
    </svg>
  )
}

/** Star row used for ratings — supports half steps. */
export function Stars({ value, size = 16, id = 'r' }: { value: number; size?: number; id?: string }) {
  const rounded = Math.round(value * 2) / 2
  return (
    <span className="stars" role="img" aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = rounded - i >= 1 ? 1 : rounded - i >= 0.5 ? 0.5 : 0
        const gradId = `star-half-${id}-${i}`
        return (
          <svg key={i} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
            {fill === 0.5 && (
              <defs>
                <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="currentColor" stopOpacity="0.24" />
                </linearGradient>
              </defs>
            )}
            <path
              d="m12 3.6 2.6 5.28 5.82.85-4.2 4.1.99 5.79L12 16.88l-5.2 2.74.99-5.79-4.2-4.1 5.82-.85L12 3.6Z"
              fill={fill === 1 ? 'currentColor' : fill === 0.5 ? `url(#${gradId})` : 'currentColor'}
              fillOpacity={fill === 1 ? 1 : fill === 0.5 ? 1 : 0.24}
            />
          </svg>
        )
      })}
    </span>
  )
}
