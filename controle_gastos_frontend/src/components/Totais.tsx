import React, { useEffect, useState } from 'react';

interface PessoaTotal {
  id: number;
  nome: string;
  idade: number;
  total_receitas: number;
  total_despesas: number;
  saldo: number;
}

interface TotaisGerais {
  total_receitas: number;
  total_despesas: number;
  saldo_liquido: number;
}

const TotaisView: React.FC = () => {
  const [dados, setDados] = useState<{
    pessoas: PessoaTotal[];
    totais_gerais: TotaisGerais;
  } | null>(null);

  const fetchTotais = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/totais/');
      const data = await response.json();
      setDados(data);
    } catch (error) {
      console.error("Erro ao buscar totais:", error);
    }
  };

  useEffect(() => {
    fetchTotais();
  }, []);

  if (!dados) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Totais por Pessoa</h2>
      <ul>
        {dados.pessoas.map((pessoa) => (
          <li key={pessoa.id}>
            {pessoa.nome} - Receitas: {pessoa.total_receitas} | Despesas: {pessoa.total_despesas} | Saldo: {pessoa.saldo}
          </li>
        ))}
      </ul>
      <h3>Totais Gerais</h3>
      <p>
        Receitas: {dados.totais_gerais.total_receitas} | Despesas: {dados.totais_gerais.total_despesas} | Saldo Líquido: {dados.totais_gerais.saldo_liquido}
      </p>
    </div>
  );
};

export default TotaisView;
