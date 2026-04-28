import './App.css'

function App() {
  return (
    <main className="App">
      <header className="page-header">
        <div className="page-header__shape page-header__shape--light" />
        <div className="page-header__shape page-header__shape--dark" />

        <div className="page-header__content">
          <nav className="page-header__nav">
            <a href="#">Home</a>
            <a href="#">Sobre nós <span>v</span></a>
            <a href="#">Conheça a empresa <span>v</span></a>
          </nav>

          <img className="page-header__logo" src="/assets/logo.png" alt="Logo" />
        </div>
      </header>
    </main>
  )
}

export default App
