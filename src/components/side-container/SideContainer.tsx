import styled from 'styled-components';
import { IComponentWithChildren } from '../../common/types/commom';

const SideResumeCont = styled.div`
  background: #025c85;
  width: 40%;
  padding: 40px;
`;

export const SideContainer: React.FC<IComponentWithChildren> = ({
  children,
}) => {
  return <SideResumeCont>{children}</SideResumeCont>;
};
