import React, { useEffect, useRef } from 'react';
import { ExpirianceBlock } from '../exp-block/ExpBlock';
import { MainContent } from '../main-content/MainContent';
import { ResumeMain } from './Components';

interface IResumeContainer {
  content: any;
  workExpBlockAmount: {
    firstId: string;
    lastId: string;
    expBlocksFullamount: number;
  };
  addNewBlock: () => void;
  removeBlock: (id: string) => void;
  moveBlockNext: () => void;
  actualBlockHeight: (arg:number) => void;
  updateBlock: (val: string, id: string, firstBlockHeight:number) => void;
}

const MAX_PAGE_HEIGHT = 1122;

export const ResumeContainer: React.FC<IResumeContainer> = ({
  content,
  workExpBlockAmount,
  addNewBlock,
  removeBlock,
  moveBlockNext,
  actualBlockHeight,
  updateBlock,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      actualBlockHeight(ref.current.scrollHeight)
      if (MAX_PAGE_HEIGHT < ref.current.scrollHeight) {
        moveBlockNext();
      }
    }
  }, [ref.current?.scrollHeight, content]);

  return (
    <ResumeMain ref={ref}>
      {content.map((cnt: any) => {
        if (cnt.type === 'general_info') {
          return (
            <React.Fragment key={cnt.id}>
              <MainContent />
            </React.Fragment>
          );
        }
        if (cnt.type === 'work_exp') {
          return (
            <ExpirianceBlock
              key={cnt.id}
              content={cnt}
              isLast={workExpBlockAmount.lastId === cnt.id}
              isFirst={workExpBlockAmount.firstId === cnt.id}
              addNewBlock={addNewBlock}
              removeBlock={removeBlock}
              updateBlock={updateBlock}
              amount={workExpBlockAmount.expBlocksFullamount}
            />
          );
        }
      })}
    </ResumeMain>
  );
};
