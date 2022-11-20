import styled from 'styled-components';
import { Label } from '../resume-container/Components';
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillTwitterSquare,
  AiFillChrome,
} from 'react-icons/ai';

const SocilaInput = styled.input`
  background: none;
  outline: none;
  border: none;
  color: #fff;
  font-size: 15px;
  &:focus {
    background: #276485;
  }
`;
const Socilas = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 45px;
`;

const SocialItemsCont = styled.span`
  margin-top: 20px;
`;
export const Contacts: React.FC = () => {
  return (
    <>
      <Label style={{ color: '#fff', fontSize: 24 }}>Contact</Label>
      <Socilas>
        <SocialItemsCont>
          <AiFillLinkedin color="#FFF" />
          <SocilaInput placeholder="LinkedIn" />
        </SocialItemsCont>
        <SocialItemsCont>
          <AiFillGithub color="#FFF" />
          <SocilaInput placeholder="Github" />
        </SocialItemsCont>
        <SocialItemsCont>
          <AiFillTwitterSquare color="#FFF" />
          <SocilaInput placeholder="Twitter" />
        </SocialItemsCont>
        <SocialItemsCont>
          <AiFillChrome color="#FFF" />
          <SocilaInput placeholder="Website" />
        </SocialItemsCont>
      </Socilas>
    </>
  );
};
