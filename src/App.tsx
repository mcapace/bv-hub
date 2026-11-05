import { useLenis } from './hooks/useLenis'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Chapters } from './components/Chapters'
import { Story } from './components/Story'
import { Timeline } from './components/Timeline'
import { Maestro } from './components/Maestro'
import { Wines } from './components/Wines'
import { Renovation } from './components/Renovation'
import { Visit } from './components/Visit'
import { Upcoming } from './components/Upcoming'
import { Footer } from './components/Footer'

export default function App() {
  useLenis()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Chapters />
        <Story />
        <Timeline />
        <Maestro />
        <Wines />
        <Renovation />
        <Visit />
        <Upcoming />
      </main>
      <Footer />
    </>
  )
}
