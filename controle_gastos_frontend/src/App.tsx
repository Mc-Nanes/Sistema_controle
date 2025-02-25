import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PessoaList from './components/Pessoa';
import TransacaoForm from './components/Transacao';
import TotaisView from './components/Totais';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <h1>Controle de Gastos</h1>
          <div className="nav-links">
            <Link to="/pessoas">Pessoas</Link>
            <Link to="/transacoes">Transações</Link>
            <Link to="/totais">Totais</Link>
          </div>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/pessoas" element={<PessoaList />} />
            <Route path="/transacoes" element={<TransacaoForm />} />
            <Route path="/totais" element={<TotaisView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
