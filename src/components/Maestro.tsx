import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Reveal } from './Reveal'
import './maestro.css'

export function Maestro() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="maestro">
      <motion.div className="maestro__bg" style={{ y }}>
        <img src="/img/andre-barrel-room.jpg" alt="André Tchelistcheff tasting from a barrel in the Beaulieu Vineyard cellar" loading="lazy" />
      </motion.div>
      <div className="maestro__veil" />
      <div className="container maestro__inner">
        <Reveal className="maestro__card glass">
          <span className="eyebrow">The Maestro</span>
          <h2 className="display display--lg">
            A microscope,
            <br />
            a laboratory,
            <br />
            <em>and a name for the dust.</em>
          </h2>
          <p>
            Georges de Latour met André Tchelistcheff at the Pasteur Institute in 1938 and persuaded him to cross the
            Pacific. The Russian-born, French-trained enologist built his own lab in Rutherford, introduced small-lot
            fermentation and malolactic fermentation for reds, and tasted a family lot of 1936 Cabernet so remarkable he
            insisted it be bottled on its own. It became the Private Reserve.
          </p>
          <p>
            He gave the signature cocoa-powder tannin of the western bench its name, <em>Rutherford Dust</em>, and
            mentored a generation that included Mondavi, Martini, Winiarski and Grgich. He led BV's winemaking until
            1971 and returned at 89 to help reinvent it for a new era.
          </p>
          <span className="maestro__note eyebrow eyebrow--muted">Chapter III, "Tchelistcheff's Legacy," arrives in March</span>
        </Reveal>
      </div>
    </section>
  )
}
