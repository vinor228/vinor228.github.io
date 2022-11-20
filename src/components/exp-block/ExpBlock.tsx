import {useEffect, useRef, useState} from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import {
  Input,
  ExpBlock,
  AddRemoveBtns,
  AddBtn,
  RemoveBtn,
  Label,
} from '../resume-container/Components';

interface IExpBlock {
  content: any;
  parentHeight?: number
  isLast: boolean;
  isFirst: boolean;
  amount: number;
  addNewBlock: () => void;
  removeBlock: (id: string) => void;
  updateBlock: (val: string, id: string, firstBlockHeight:number) => void;
}

const DateButton = styled.button`
  height: 30px;
  width: 80px;
  font-size: 14px;
`;
export const ExpirianceBlock: React.FC<IExpBlock> = ({
  content,
  parentHeight,
  isLast,
  isFirst,
  addNewBlock,
  removeBlock,
  updateBlock,
  amount,
}) => {
  const [expBlockHovered, setExpBlockHovered] = useState<boolean>(false);
  const [value, setValue] = useState(content.textVal || '');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(ref.current) {
      updateBlock(value, content.id, ref.current.clientHeight + 20);
    }
  }, [value, ref.current?.clientHeight]);



  return (
    <div ref={ref}>
      {isFirst && <Label style={{ marginLeft: '45px' }}>Work experience</Label>}
      <ExpBlock
        onMouseLeave={() => setExpBlockHovered(false)}
        onMouseEnter={() => setExpBlockHovered(true)}
      >
        <Input placeholder="Role" />
        <Input placeholder="Company" />
        <div
          style={{ marginBottom: 30, display: 'flex', flexDirection: 'column' }}
        >
          <Label>Start Date</Label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
          <Label style={{ fontSize: 12 }}>End Date</Label>
          <DatePicker
            maxDate={new Date()}
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
          />
        </div>
        <ReactTextareaAutosize
          placeholder="Your responsibilities"
          value={value}
          onChange={(v) => setValue(v.target.value)}
        />
        {expBlockHovered && (
          <>
            <AddRemoveBtns>
              {isLast && <AddBtn onClick={() => addNewBlock()}>+</AddBtn>}
              {amount > 1 && (
                <RemoveBtn onClick={() => removeBlock(content.id)}>-</RemoveBtn>
              )}
            </AddRemoveBtns>
          </>
        )}
      </ExpBlock>
    </div>
  );
};
