import DataFetcher from './components/DataFetcher'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Data Desk home">
          <span className="brand-mark" aria-hidden="true">D</span>
          <span>Data Desk</span>
        </a>
        <span className="header-label">React · TypeScript · Axios</span>
      </header>
      <DataFetcher />
      <footer className="site-footer">Навчальний приклад роботи з асинхронними даними в React.</footer>
    </main>
  )
}

export default App
