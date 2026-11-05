import type { Wine } from '../content'

/**
 * Lightweight bottle display used when the 3D scene is skipped or still
 * loading. The selected bottle steps forward; on narrow screens the row
 * slides so it stays centered.
 */
export function BottleRow({ wines, selected, onSelect }: { wines: Wine[]; selected: string; onSelect: (id: string) => void }) {
  const index = Math.max(0, wines.findIndex((w) => w.id === selected))
  const offset = index - (wines.length - 1) / 2

  return (
    <div className="bottle-row" style={{ '--offset': offset } as React.CSSProperties} aria-hidden>
      <div className="bottle-row__track">
        {wines.map((w) => (
          <button
            key={w.id}
            className={`bottle-row__item ${w.id === selected ? 'is-active' : ''}`}
            onClick={() => onSelect(w.id)}
            aria-label={w.name}
            tabIndex={-1}
          >
            <img src={w.image} alt="" draggable={false} />
          </button>
        ))}
      </div>
    </div>
  )
}
