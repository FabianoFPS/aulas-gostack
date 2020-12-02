import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Container, Content, Background } from './styles';
import logoimg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Signin: React.FC = () => (
  <Container>
    <Content>
      <img src={logoimg} alt="Gobarber" />
      <form>
        <h1>Faça seu logon</h1>
        <Input type="text" name="email" placeholder="E-mail" icon={FiMail} />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          icon={FiLock}
        />
        <Button type="submit">Entrar</Button>
        <a href="fofo">Esqueci minha senha</a>
      </form>
      <a href="fofo">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default Signin;
