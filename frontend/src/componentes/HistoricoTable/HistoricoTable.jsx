import React, { useEffect, useState } from 'react';
import './HistoricoTable.css';

const HistoricoTable = ({ userId, isAdmin }) => {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    console.log('Fetching historico for userId:', userId);
    const fetchHistorico = async () => {
      try {
        const url = isAdmin ? 'http://localhost:5000/api/medicoes' : `http://localhost:5000/api/historico/${userId}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log('Historico data received:', data);
        setHistorico(data);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      }
    };

    if (userId || isAdmin) {
      fetchHistorico();
    }
  }, [userId, isAdmin]);

  return (
    <div className="historico-table-container">
      <h3>Histórico de Medições</h3>
      <table className="historico-table">
        <thead>
          <tr>
            <th>Lente A Maior (EPS)</th>
            <th>Lente A X (EPS)</th>
            <th>Lente A Y (EPS)</th>
            <th>Lente A X (Cliente)</th>
            <th>Lente A Y (Cliente)</th>
            <th>Lente B Menor (EPS)</th>
            <th>Lente B X (EPS)</th>
            <th>Lente B Y (EPS)</th>
            <th>Lente B X (Cliente)</th>
            <th>Lente B Y (Cliente)</th>
            <th>Armação</th>
            <th>Tolerância</th>
          </tr>
        </thead>
        <tbody>
          {historico.map((medicao, index) => (
            <tr key={index}>
              <td>{medicao.lente_a_maior}</td>
              <td>{medicao.lente_a_x_eps}</td>
              <td>{medicao.lente_a_y_eps}</td>
              <td>{medicao.lente_a_x_cliente}</td>
              <td>{medicao.lente_a_y_cliente}</td>
              <td>{medicao.lente_b_menor}</td>
              <td>{medicao.lente_b_x_eps}</td>
              <td>{medicao.lente_b_y_eps}</td>
              <td>{medicao.lente_b_x_cliente}</td>
              <td>{medicao.lente_b_y_cliente}</td>
              <td>{medicao.armacao}</td>
              <td>{medicao.tolerancia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoricoTable;
