import React from "react";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";

import { Container, Header, Title, Form, Fields } from "./styles";

const Register: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
};

export default Register;
