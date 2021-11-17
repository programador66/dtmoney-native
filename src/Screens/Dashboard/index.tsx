import React, {useState, useEffect, useCallback} from "react";
import HighlightCard from "../../components/HighlightCard";
import {ActivityIndicator} from "react-native";
import TransactionCard, {
  TransactionCardProps,
} from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {useFocusEffect} from "@react-navigation/native";
import { useTheme } from "styled-components";

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LoadContainer
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighightProps {
  amount: string;
  lastTransactions: string;
}

interface HighightData {
  entries: HighightProps;
  expensives: HighightProps;
  total: HighightProps;
}


const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dataKey = "@gofinances:transaction";

  const theme = useTheme();

  const [transactions, setTransactions ] = useState<DataListProps[]>([]);
  const [highightData, setHighightData] = useState<HighightData>( {} as HighightData);

  function getlastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {

    const lastTransaction = new Date(Math.max.apply(Math, collection
      .filter(transaction => transaction.type === 'positive')
      .map(transaction => new Date (transaction.date).getTime())));

      const lastTFormated = `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString("pt-BR",{month: 'long'})}`

      return lastTFormated;
  }

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expenseveTotal = 0;

    const transactionsFormated: DataListProps[] = transactions
    .map((item: DataListProps) => {

      if (item.type === 'positive') {
        entriesTotal += Number(item.amount);
      } else {
        expenseveTotal += Number(item.amount);
      }

      const amount = Number(item.amount)
      .toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})

      const date = Intl.DateTimeFormat('pt-BR', {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date
      }
    });

    setTransactions(transactionsFormated);

    const lastTransactionsEntries = getlastTransactionDate(transactions, 'positive');
    const lastTransactionsExpensives = getlastTransactionDate(transactions, 'negative');
    const totalInterval = `01 à ${lastTransactionsExpensives}`;

    const total = entriesTotal - expenseveTotal;

    setHighightData({
      entries: {
        amount: entriesTotal
        .toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'}),
        lastTransactions: `Última entrada ${lastTransactionsEntries}`
      },
      expensives: {
        amount: expenseveTotal.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'}),
        lastTransactions:`Última saída ${lastTransactionsExpensives}` 
      },
      total: {
        amount: total.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'}),
        lastTransactions: totalInterval
      }
      
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
    //AsyncStorage.removeItem(dataKey);
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  },[]));

  return (
    <Container>
      
      {
        isLoading ? 
        (<LoadContainer>
          <ActivityIndicator 
          color={theme.colors.primary} 
            size="large"
          />
       </LoadContainer>) :
      <>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/15203010?v=4",
              }}
            />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Caio</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
          <HighlightCard
            title="Entradas"
            amount={highightData?.entries?.amount}
            lastTransaction={highightData.entries.lastTransactions}
            icon="arrow-up-circle"
          />
           <HighlightCard
            title="Saídas"
            amount={highightData?.expensives?.amount}
            lastTransaction={highightData.expensives.lastTransactions}
            icon="arrow-down-circle"
          />
          <HighlightCard
            title="Saídas"
            amount={highightData?.total?.amount}
            lastTransaction={highightData?.total?.lastTransactions}
            icon="dollar-sign"
          />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
      </>
      }
    </Container>
  );
};

export default Dashboard;
