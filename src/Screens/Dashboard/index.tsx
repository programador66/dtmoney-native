import React from 'react';

import { 
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon
} from './styles';

const Dashboard: React.FC = () => {
  return (
      <Container>
         <Header>
          <UserWrapper>
            <UserInfo>
              <Photo 
                source={{uri: 'https://avatars.githubusercontent.com/u/15203010?v=4'}}
              />
              
              <User>
                <UserGreeting>Olá,</UserGreeting>
                <UserName>Caio</UserName>
              </User>
            </UserInfo>

            <Icon name="power"  />

           </UserWrapper>
         </Header>
      </Container>
  );
}

export default Dashboard;