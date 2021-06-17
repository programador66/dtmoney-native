import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

export interface Props extends TouchableOpacityProps {
  title: string;
}

const Button: React.FC<Props> = ({ title, ...rest }: Props) => {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Button;
