import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repostitories } from './styles';
import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>
      <Form>
        <input type="text" placeholder="Digite o nome do respositório" />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repostitories>
        <a href="https://github.com/FabianoFPS">
          <img
            src="https://avatars1.githubusercontent.com/u/50460062?s=460&u=965d8fec70f4c08e798662603c41e61a4f77bd44&v=4"
            alt="Fabiano Stoffel"
          />
          <div>
            <strong>perfil/repo</strong>
            <p>bla blasbla blasbla blasbla blasbla blas</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="https://github.com/FabianoFPS">
          <img
            src="https://avatars1.githubusercontent.com/u/50460062?s=460&u=965d8fec70f4c08e798662603c41e61a4f77bd44&v=4"
            alt="Fabiano Stoffel"
          />
          <div>
            <strong>perfil/repo</strong>
            <p>bla blasbla blasbla blasbla blasbla blas</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="https://github.com/FabianoFPS">
          <img
            src="https://avatars1.githubusercontent.com/u/50460062?s=460&u=965d8fec70f4c08e798662603c41e61a4f77bd44&v=4"
            alt="Fabiano Stoffel"
          />
          <div>
            <strong>perfil/repo</strong>
            <p>bla blasbla blasbla blasbla blasbla blas</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repostitories>
    </>
  );
};

export default Dashboard;
