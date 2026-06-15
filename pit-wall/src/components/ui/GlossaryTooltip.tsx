"use client"

import { useState, useRef, useEffect } from "react"
import { getGlossaryEntry } from "@/lib/glossary"

interface GlossaryTooltipProps {
  term: string
  children?: React.ReactNode
}

export default function GlossaryTooltip({
  term,
  children,
}: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const entry = getGlossaryEntry(term)

  if (!entry) return <>{children ?? term}</>

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <span className="inline-flex items-center gap-1">
      {children ?? <span>{entry.term}</span>}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-asphalt text-silver hover:bg-scarlet hover:text-white transition-colors text-[10px] font-bold leading-none flex-shrink-0"
        aria-label={`Learn about ${entry.term}`}
        type="button"
      >
        ⓘ
      </button>
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-50 mt-1 w-72 p-3 rounded-lg bg-pit border border-asphalt shadow-xl text-sm text-white"
          style={{ top: "100%", left: "0" }}
        >
          <p className="font-semibold text-scarlet text-xs uppercase tracking-wider mb-1">
            {entry.term}
          </p>
          <p className="text-silver leading-relaxed">{entry.definition}</p>
        </div>
      )}
    </span>
  )
}
