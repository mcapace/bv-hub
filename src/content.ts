/**
 * All copy and data for the BV hub.
 * Sources: BV 2026 Press Kit, BV Brand Guidelines 2025, Katelyn Garzon's
 * "BV WS Brand Hub Brief", and the signed Wine Spectator IO (Nov 2026 - Jun 2027).
 *
 * TODO (confirm with Katelyn Garzon before launch): the exact destination URLs for
 * Visit, Shop, Wine Club and the Renovation page on bvwines.com.
 */

export const links = {
  site: 'https://www.bvwines.com/',
  about: 'https://www.bvwines.com/pages/about',
  visit: 'https://www.bvwines.com/pages/visit',
  shop: 'https://www.bvwines.com/collections/all',
  club: 'https://www.bvwines.com/pages/wine-club',
  renovation: 'https://www.bvwines.com/pages/renovation',
  documentary: 'https://www.stemandbarrel.com/',
  instagram: 'https://www.instagram.com/bvwines',
  wineSpectator: 'https://www.winespectator.com/',
}

export type ChapterStatus = 'live' | 'next' | 'upcoming'

export interface Chapter {
  number: string
  slug: string
  title: string
  window: string
  feature: string
  summary: string
  image: string
  status: ChapterStatus
}

export const chapters: Chapter[] = [
  {
    number: 'I',
    slug: 'anticipation',
    title: 'Anticipation',
    window: 'November to December 2026',
    feature: 'The House That Latour Built',
    summary:
      'Three words, a four-acre ranch, and a conviction that Rutherford could rival the great estates of France. The heritage story and an interactive timeline from 1900 to today.',
    image: '/img/georges-de-latour.jpg',
    status: 'live',
  },
  {
    number: 'II',
    slug: 'the-return',
    title: 'The Return',
    window: 'January to February 2027',
    feature: 'Inside the Reopening of BV',
    summary:
      'The most significant transformation of the Rutherford estate in generations. Step inside the restored 1885 stone winery and the new hospitality center.',
    image: '/img/construction-drone.jpg',
    status: 'next',
  },
  {
    number: 'III',
    slug: 'the-experience',
    title: 'The Experience',
    window: 'March to April 2027',
    feature: "Tchelistcheff's Legacy",
    summary:
      'A ratings retrospective drawn from the Wine Spectator archive, an immersive photo essay, and a visit planner for the new tasting experiences.',
    image: '/img/andre-barrel-room.jpg',
    status: 'upcoming',
  },
  {
    number: 'IV',
    slug: 'the-legacy-continues',
    title: 'The Legacy Continues',
    window: 'May to June 2027',
    feature: 'Georges de Latour Private Reserve, Vertical',
    summary:
      "A vertical tasting of Napa Valley's first cult Cabernet, and an invitation to return to Rutherford before summer.",
    image: '/img/gdl-1949-bottles.jpg',
    status: 'upcoming',
  },
]

export interface TimelineEntry {
  year: string
  title: string
  text: string
  image?: string
}

export const timeline: TimelineEntry[] = [
  {
    year: '1900',
    title: 'Quel beau lieu',
    text: 'On May 12, Georges and Fernande de Latour buy four acres in Rutherford. Fernande names it with three words: "What a beautiful place."',
    image: '/img/georges-de-latour.jpg',
  },
  {
    year: '1903',
    title: 'BV Ranch No. 1',
    text: 'Georges purchases the 128 acres beside the winery. He imports hundreds of thousands of European vines through his Paris nursery and shares them with his neighbors.',
    image: '/img/vineyard-worker-archive.jpg',
  },
  {
    year: '1919',
    title: 'Rutherford, named with intent',
    text: 'BV labels its Cabernet Sauvignon "Rutherford," decades before the appellation system existed.',
  },
  {
    year: '1920s',
    title: 'Open through Prohibition',
    text: 'Sacramental wine for the Catholic Church keeps BV producing through thirteen dry years. In 1923 the de Latours buy the neighboring 1885 stone winery, still home today.',
    image: '/img/winery-exterior-archive.jpg',
  },
  {
    year: '1938',
    title: 'The Maestro arrives',
    text: 'Georges recruits André Tchelistcheff from the Pasteur Institute in Paris. He brings a microscope, a laboratory, and a philosophy of structure and age-worthiness.',
    image: '/img/andre-lab.jpg',
  },
  {
    year: '1941',
    title: 'Georges de Latour Private Reserve',
    text: "The family's own reserve lot is released to the public. Napa Valley's first cult Cabernet is born.",
    image: '/img/gdl-old-label.jpg',
  },
  {
    year: '1949',
    title: 'Paris, before Paris',
    text: 'Fernande presents twelve BV wines to fifty connoisseurs in Paris, a quarter century before the Judgment of Paris. At home, BV is served at Gracie Mansion for the United Nations cornerstone.',
    image: '/img/gdl-1949-bottles.jpg',
  },
  {
    year: '1952',
    title: 'A royal table',
    text: 'Queen Elizabeth II and Prince Philip are served the 1946 Private Reserve at Blair House, the first of many state tables to pour BV.',
  },
  {
    year: '1970s',
    title: 'Astronauts and ambassadors',
    text: 'Buzz Aldrin, the Nixons in Moscow, President Ford hosting Emperor Hirohito in Tokyo. The Private Reserve travels with American history.',
    image: '/img/historical-bottle-lineup.jpg',
  },
  {
    year: '2008',
    title: 'The clones',
    text: 'A decades-long study with UC Davis, the most extensive clonal assessment in California, brings Clones 4, 6 and 169 into the Rutherford ranches.',
    image: '/img/harvest22.jpg',
  },
  {
    year: '2025',
    title: '125 years',
    text: 'A year of celebration, limited releases, and the donation of the Beaulieu Vineyard Collection to the UC Davis Library. Nate Weis joins as General Manager and Senior Winemaker.',
    image: '/img/nate-weis-1.jpg',
  },
  {
    year: '2026',
    title: 'A new era',
    text: 'The two-year renovation of the historic winery and grounds is complete. The doors of the reimagined estate open.',
    image: '/img/construction-corner.jpg',
  },
]

export interface Wine {
  id: string
  name: string
  short: string
  srp: string
  image: string
  tagline: string
  description: string
  accolade?: string
}

export const wines: Wine[] = [
  {
    id: 'gdl',
    name: 'Georges de Latour Private Reserve',
    short: 'Private Reserve',
    srp: '$180',
    image: '/bottles/bottle-gdl.png',
    tagline: "Napa Valley's first grand cru",
    description:
      'Hand-selected from BV Ranches No. 1 and No. 2 on the western Rutherford bench, a portion fermented in new French oak for density and texture. Bold, complex, and marked by the cocoa-powder note the Maestro called Rutherford Dust.',
    accolade: '2021 vintage: No. 2, Wine Spectator Top 100',
  },
  {
    id: 'rutherford',
    name: 'Rutherford Reserve Cabernet Sauvignon',
    short: 'Rutherford Reserve',
    srp: '$85',
    image: '/bottles/bottle-rutherford-res.png',
    tagline: 'A tribute to the western bench',
    description:
      'Classic "sauvage" character from estate vineyards, cold-soaked for seven days for gentle extraction and aged in a careful selection of new and neutral French oak.',
  },
  {
    id: 'tapestry',
    name: 'Tapestry Reserve Red Wine',
    short: 'Tapestry',
    srp: '$65',
    image: '/bottles/bottle-tapestry.png',
    tagline: 'A nod to Bordeaux, since 1990',
    description:
      'A reserve blend from specific vineyard blocks, each variety vinified on its own terms. Optical sorting, cold soaking and in-barrel malolactic fermentation build its layered texture.',
  },
  {
    id: 'napa-cab',
    name: 'Napa Valley Cabernet Sauvignon',
    short: 'Napa Valley Cabernet',
    srp: '$40',
    image: '/bottles/bottle-nv-cab.png',
    tagline: 'Rutherford, Calistoga, St. Helena',
    description:
      'Sourced from estate vineyards and long-standing growing partners across Napa Valley, fermented in stainless steel and aged in French oak.',
    accolade: '2019 vintage: Wine Spectator Wine Value of the Year',
  },
  {
    id: 'napa-sb',
    name: 'Napa Valley Sauvignon Blanc',
    short: 'Sauvignon Blanc',
    srp: '$40',
    image: '/bottles/bottle-nv-sb.png',
    tagline: 'Rutherford and Oakville, since 2023',
    description:
      'The majority from estate vineyards on the eastern Rutherford bench, each block picked at peak maturity and fermented separately.',
  },
]

export interface Experience {
  name: string
  price: string
  duration: string
  text: string
}

export const experiences: Experience[] = [
  {
    name: 'The 1885 Tasting',
    price: '$50',
    duration: '60 min',
    text: 'A seated introduction to Beaulieu Vineyard in the Rutherford Atrium and the 1885 Courtyard, through a curated flight of signature wines.',
  },
  {
    name: 'BV Heritage Tasting',
    price: '$80',
    duration: '90 min',
    text: 'Inspired by the European roots of Georges and Fernande, an elevated tasting with light seasonal bites.',
  },
  {
    name: 'A Walk with the Maestro',
    price: '$95',
    duration: '90 min',
    text: "Shaped by Tchelistcheff's teaching legacy: vineyards, cellar, the fundamentals of tasting, then a guided seated flight.",
  },
  {
    name: 'The Georges de Latour Table',
    price: '$150',
    duration: '120 min',
    text: "An intimate multi-course pairing in the new Georges de Latour Library, exploring BV's most celebrated wines.",
  },
  {
    name: 'The Time Traveler',
    price: '$300',
    duration: '120 min',
    text: 'A library exploration across generations of BV winemaking, with rare historic wines and bites inspired by archived recipes.',
  },
  {
    name: 'BV Legacy Experience',
    price: '$60,000',
    duration: 'Full day, up to 6',
    text: 'Private EV transportation, a tour with Nate Weis, a five-course lunch, a private barrel tasting, custom bottling, and twelve signed bottles of Private Reserve.',
  },
]

export const renovation = {
  stats: [
    { value: '1885', label: 'Stone winery restored' },
    { value: '7', label: 'Distinct tasting spaces' },
    { value: '99%', label: 'Materials recycled or reused' },
    { value: '30%+', label: 'Electricity from on-site solar' },
  ],
}
