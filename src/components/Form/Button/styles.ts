import styled from "styled-components/native";

import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  justify-content: center;
  align-items: center;
  padding: 18px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shappe};
  font-size: ${RFValue(14)}px;
  border-radius: 5px;
`;
