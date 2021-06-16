import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";

interface Props {
  title: string;
  amount: string;
  lastTransaction: string;
  icon: string;
}

const HighlightCard: React.FC<Props> = ({
  title,
  amount,
  lastTransaction,
  icon,
}: Props) => {
  return (
    <Container icon={icon}>
      <Header>
        <Title icon={icon}>{title}</Title>
        <Icon name={icon} icon={icon} />
      </Header>

      <Footer>
        <Amount icon={icon}> {amount}</Amount>
        <LastTransaction icon={icon}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
};

export default HighlightCard;
