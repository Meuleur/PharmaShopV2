"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export type MarqueeItem = {
  label: string
  href: string
  image?: string
}

type Props = {
  items: MarqueeItem[]
  cardWidth?: number
  cardHeight?: number
  speedSec?: number
  direction?: "ltr" | "rtl"
  className?: string
  fullBleed?: boolean
  gutterPx?: number
  edgeFade?: boolean
}

export default function MarqueeCategories({
  items,
  cardWidth = 240,
  cardHeight = 176,
  speedSec = 24,
  direction = "ltr",
  className = "",
  fullBleed = true,
  gutterPx = 8,
  edgeFade = true,
}: Props) {
  const doubled = [...items, ...items]

  return (
    <div
      className={`relative overflow-hidden group pause-parent ${fullBleed ? "full-bleed" : ""} ${className}`}
      style={
        {
          "--mw": `${cardWidth}px`,
          "--mh": `${cardHeight}px`,
          "--dur": `${speedSec}s`,
          "--gutter": `${gutterPx}px`,
        } as React.CSSProperties
      }
      data-dir={direction}
    >
      {edgeFade && (
        <div
          className="pointer-events-none absolute top-0 bottom-0"
          style={{
            left: "var(--gutter)",
            right: "var(--gutter)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
            maskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        />
      )}

      <div className="flex w-max gap-4 will-change-transform marquee-track" style={{ paddingInline: "var(--gutter)" }}>
        {doubled.map((c, i) => {
          const isClone = i >= items.length
          return (
            <Link
              key={`${isClone ? "b" : "a"}-${c.label}-${i}`}
              href={c.href}
              className="group/card block"
              aria-hidden={isClone || undefined}
              tabIndex={isClone ? -1 : undefined}
            >
              <Card
                className="rounded-2xl transition hover:shadow-lg overflow-hidden p-0"
                style={{ width: "var(--mw)", height: "var(--mh)" }}
              >
                <CardContent className="relative h-full w-full p-0">
                  {/* Image de fond qui remplit tout */}
                  {c.image && (
                    <Image
                      src={c.image || "/placeholder.svg"}
                      alt={c.label}
                      fill
                      sizes="240px"
                      className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                    />
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  {/* Contenu positionné en bas */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-4 pb-5">
                    <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500" />
                    </div>
                    <div className="font-semibold text-white text-lg drop-shadow-md group-hover/card:text-emerald-200 transition-colors text-center">
                      {c.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <style jsx>{`
        .full-bleed{
  position:relative;
  left:50%;
  transform:translateX(-50%);
  width:100vw;
}

        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        .marquee-track {
          animation-duration: var(--dur);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-name: marquee-left;
        }
        :global([data-dir="rtl"]) .marquee-track {
          animation-name: marquee-right;
        }

        .pause-parent:hover .marquee-track {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .marquee-track { animation-duration: calc(var(--dur) * 0.83); }
        }
      `}</style>
    </div>
  )
}
