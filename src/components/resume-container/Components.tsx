import styled from 'styled-components';

export const ResumeMain = styled.div`
  width: 70%;
  height: fit-content;
`;

export const ResumeItems = styled.div`
  padding: 40px;
`;
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-contnet: space-around;
  border-bottom: 1px solid #025378;
  padding-bottom: 10px;
`;
export const Input = styled.input`
  outline: none;
  background: none;
  border: none;
  border-radius: 3px;
  font-weight: 500;
  letter-spacing: 0.8px;
  width: 250px;
  margin-bottom: 10px;
  &:focus {
    background: #eaeaea;
  }
`;

export const Label = styled.label``;
export const ExpBlock = styled.div`
  margin: 0 auto;
  padding: 10px;
  position: relative;
  transition: all 0.2s;
  display: block;
  border: 2px dashed transparent;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 420px;
  &:hover {
    border: 2px dashed #808080;
  }
`;

export const AddRemoveBtns = styled.div`
  position: absolute;
  right: 5px;
  top: -15px;
`;
export const AddBtn = styled.button`
  background: #51c070;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  color: #fff;
`;
export const RemoveBtn = styled.button`
  background: #ff655d;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  margin-left: 10px;
  color: #fff;
`;
