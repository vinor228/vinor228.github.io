import styled from 'styled-components';
import { IComponentWithChildren } from '../types/commom';

const Container = styled.main`
  display: flex;
  min-width: 21cm;
  max-width: 21cm;
  min-height: 29.7cm;
  max-height: 29.7cm;
  box-shadow: rgb(0 0 0 / 20%) 0.2rem 0.2rem 3rem 0.2rem;
  margin-bottom: 40px;
`;

export const PageContainer: React.FC<IComponentWithChildren> = ({
  children,
}) => {
  return <Container>{children}</Container>;
};
