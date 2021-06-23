import React from "react";
import { RectButtonProperties } from "react-native-gesture-handler";

import { Container, Title } from "./styles";

export interface Props extends RectButtonProperties {
  title: string;
  onPress: () => void;
}

const Button: React.FC<Props> = ({ title, onPress, ...rest }: Props) => {
  return (
    <Container {...rest} onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Button;
