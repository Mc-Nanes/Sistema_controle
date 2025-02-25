// src/components/TransacaoFormAndList.tsx
import React, { useEffect, useState } from 'react';

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  pessoa: number;
}

const TransacaoFormAndList: React.FC = () => {
  // Estados para o formulário
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number>();
  const [tipo, setTipo] = useState<'receita' | 'despesa'>('despesa');
  const [pessoaId, setPessoaId] = useState<number>(0);
  
  // Estados para armazenar dados da API
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  
  // URLs da API (ajuste conforme necessário)
  const apiUrlPessoas = 'http://localhost:8000/api/pessoas/';
  const apiUrlTransacao = 'http://localhost:8000/api/transacoes/';
  
  // Função para buscar pessoas (usada no select do formulário)
  const fetchPessoas = async () => {
    try {
      const response = await fetch(apiUrlPessoas);
      const data = await response.json();
      console.log(data);
      setPessoas(data);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
    }
  };
  
  // Função para buscar transações (listagem)
  const fetchTransacoes = async () => {
    try {
      const response = await fetch(apiUrlTransacao);
      const data = await response.json();
      setTransacoes(data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };
  
  // Executa as buscas quando o componente for montado
  useEffect(() => {
    fetchPessoas();
    fetchTransacoes();
  }, []);
  
  // Função para criar uma nova transação
  const criarTransacao = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
  
      const response = await fetch(apiUrlTransacao, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descricao, valor, tipo, pessoa: pessoaId }),
      });
  
      if (response.ok) {
        setDescricao('');
        setValor(0);
        
        // Atualiza a lista de transações chamando fetchTransacoes
        fetchTransacoes();
    
      } else {
        const errorData = await response.json();
        console.error("Erro:", errorData);
      }
    } catch (error) {
      console.error("Erro ao criar transação:", error);
    }
  };
  
  return (
    <div className="transacao-form-container">
      <h2>Cadastro de Transações</h2>
      <form onSubmit={criarTransacao}>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
          required
          min="0.01"
          step="0.01"
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value as 'receita' | 'despesa')}>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
        <select
          value={pessoaId}
          onChange={(e) => setPessoaId(Number(e.target.value))}
          required
        >
          <option value={0}>Selecione uma pessoa</option>
          {pessoas.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} (Idade: {p.idade})
            </option>
          ))}
        </select>
        <button type="submit">Criar Transação</button>
      </form>
  
      <h2>Listagem de Transações</h2>
      <ul>
        {transacoes.map((t) => (
          <li key={t.id}>
            {t.descricao} - R$ {Number(t.valor).toFixed(2)} - {t.tipo} - Pessoa: {t.pessoa}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransacaoFormAndList;
