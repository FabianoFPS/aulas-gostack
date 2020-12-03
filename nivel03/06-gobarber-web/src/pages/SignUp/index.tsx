import React from 'react';
import { FiArrowDownLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';

import { Container, Content, Background } from './styles';
import logoimg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  function handleSubmit(data: any): void {
    console.log(data);
  }
  return (
    <Container>
      <Background />
      <Content>
        <img src={logoimg} alt="Gobarber" />
        <Form onSubmit={handleSubmit}>
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
        </Form>
        <a href="fofo">
          <FiArrowDownLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
