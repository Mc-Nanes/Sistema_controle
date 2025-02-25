
import React, { useEffect, useState } from 'react';
//import '../styles/PessoaList.css';


interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

const PessoaList: React.FC = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState<number>();
  const apiUrl = 'http://localhost:8000/api/pessoas/'; 

  // Função para buscar a lista de pessoas
  const fetchPessoas = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPessoas(data);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
    }
  };

  useEffect(() => {
    fetchPessoas();
  }, []);

  // Função para criar uma nova pessoa
  const criarPessoa = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, idade }),
      });
      if (response.ok) {
        setNome('');
        setIdade(0);
        fetchPessoas();
      } else {
        console.error("Erro ao criar pessoa");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  // Função para deletar uma pessoa (e consequentemente suas transações)
  const deletarPessoa = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}${id}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPessoas();
      } else {
        console.error("Erro ao deletar pessoa");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div>
      <h2>Cadastro de Pessoas</h2>
      <form onSubmit={criarPessoa}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(Number(e.target.value))}
          required
        />
        <button type="submit">Criar Pessoa</button>
      </form>
      <ul>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id}>
            {pessoa.nome} (Idade: {pessoa.idade})
            <button onClick={() => deletarPessoa(pessoa.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PessoaList;
