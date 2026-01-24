import Header from './Header.jsx'
import Footer from './Footer.jsx';
import Products from './Products.jsx';

function App() {
  return (

    <>
      <Header />
      <Products name="Newest" tax={15} isAvailable={true} />
      <Footer />
    </>

  )
}
export default App
