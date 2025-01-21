import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../componentes/PageWrapper/PageWrapper';
import './perfil.css';
import useFetchUserData from '../../utils/useFetchUserData';
import CreateUserForm from '../../componentes/CreateUserForm/CreateUserForm';
import HistoricoTable from '../../componentes/HistoricoTable/HistoricoTable';

const Perfil = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // obter dados do usuário
  useFetchUserData(setUser, navigate);

  useEffect(() => {
    console.log('User state:', user);
  }, [user]);

  return (
    <PageWrapper title="Perfil">
      <div className="nav-bottom">
        {user && <div className="cliente">BEM VINDO: {user.username}</div>}
      </div>
      {user && (
        <div className="perfil-container">
          <p>USUÁRIO LOGADO: {user.username}</p>
          {user.isAdmin ? (
            <div>
              <h3>Opções Admin</h3>
              <CreateUserForm />
            </div>
          ) : (
            <div>
              <h3>Opções do Usuário</h3>
              <button onClick={() => navigate('/medicao')}>Adicionar Medidas</button>
              {/* Adicione mais detalhes do usuário aqui */}
              <h3>Medições</h3>
            </div>
          )}
          <HistoricoTable userId={user.username} isAdmin={user.isAdmin} />
        </div>
      )}
    </PageWrapper>
  );
};

export default Perfil;
