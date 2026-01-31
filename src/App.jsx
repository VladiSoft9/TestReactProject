import Header from './Header.jsx'
import Footer from './Footer.jsx';
import Products from './Products.jsx';
import Ballpit from './BallpitBackground.jsx';

function App() {
  return (
    <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', overflow: 'hidden', zIndex: 0}}>
      <Ballpit
        count={100}
        gravity={0.01}
        friction={0.9975}
        wallBounce={0.95}
        followCursor={false}
      />
      <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', overflow: 'auto', zIndex: 1, pointerEvents: 'auto', display: 'flex', justifyContent: 'center'}}>
        <div style={{width: '700px', display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
          <Header />
          <Products name="Newest" tax={15} isAvailable={true} />
          <Footer />
        </div>
      </div>
    </div>

  )
}
export default App
