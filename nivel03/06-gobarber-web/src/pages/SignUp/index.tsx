import React from 'react';
import { FiArrowDownLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import { Container, Content, Background } from './styles';
import logoimg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoimg} alt="Gobarber" />
      <form>
        <h1>Faça seu Cadastro</h1>
        <Input type="text" name="name" placeholder="Nome" icon={FiUser} />
        <Input type="text" name="email" placeholder="E-mail" icon={FiMail} />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          icon={FiLock}
        />
        <Button type="submit">Cadastrar</Button>
      </form>
      <a href="fofo">
        <FiArrowDownLeft />
        Voltar para logon
      </a>
    </Content>
  </Container>
);

export default SignUp;
