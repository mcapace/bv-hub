import { links } from '../content'
import './footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="rule" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/brand/logo-gold.png" alt="Beaulieu Vineyard, since 1900" />
          <p>1960 St. Helena Highway, Napa, CA 94558</p>
        </div>
        <nav className="footer__links" aria-label="Beaulieu Vineyard">
          <a href={links.site} target="_blank" rel="noreferrer">
            bvwines.com
          </a>
          <a href={links.visit} target="_blank" rel="noreferrer">
            Visit
          </a>
          <a href={links.shop} target="_blank" rel="noreferrer">
            Shop the wines
          </a>
          <a href={links.club} target="_blank" rel="noreferrer">
            Wine club
          </a>
          <a href={links.instagram} target="_blank" rel="noreferrer">
            @bvwines
          </a>
        </nav>
        <div className="footer__ws">
          <span className="eyebrow eyebrow--muted">Partner content</span>
          <p>
            This feature was produced by the Wine Spectator custom content studio in partnership with Beaulieu Vineyard.
            Wine Spectator's editorial staff was not involved in its creation.
          </p>
          <a href={links.wineSpectator} target="_blank" rel="noreferrer" className="footer__wsmark">
            WineSpectator.com
          </a>
        </div>
      </div>
      <div className="container footer__legal">
        <span>Enjoy responsibly. © 2026 Beaulieu Vineyard, Napa, CA.</span>
        <span>© 2026 M. Shanken Communications, Inc.</span>
      </div>
    </footer>
  )
}
