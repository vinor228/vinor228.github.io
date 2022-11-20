import {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { PageContainer } from './common/containers/PageContainer';
import { Contacts } from './components/contants/Contacts';
import { ResumeContainer } from './components/resume-container/ResumeContainer';
import { SideContainer } from './components/side-container/SideContainer';

import { flushSync } from 'react-dom'
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

interface IPagesState {
  id: string;
  content: any[];
  blockHeight: number
  firstBlockHeight: number
}

const MAX_PAGE_HEIGHT = 1122;

function App() {

  const [pages, setPages] = useState<IPagesState[]>([
    {
      id: uuidv4(),
      content: [
        { id: uuidv4(), type: 'general_info', editable: false, textVal: '' },
        { id: uuidv4(), type: 'work_exp', editable: true, textVal: '' },
      ],
      blockHeight: 0,
      firstBlockHeight: 0
    },
  ]);

  const workExpBlocks = useMemo(() => {
    const expBlocksAmount = pages.map((p) => {
      return p.content.filter((cont) => cont.type === 'work_exp');
    });
    const arr = expBlocksAmount[expBlocksAmount.length - 1];
    let ammount = 0;
    expBlocksAmount.forEach((blocks) => {
      ammount += blocks.length;
    });
    return {
      firstId: expBlocksAmount[0][0].id,
      lastId: arr[arr.length - 1].id,
      expBlocksFullamount: ammount,
    };
  }, [pages]);

  const addNewBlock = (indx: number) => {
    const currPage = pages[indx];
    currPage.content.push({
      id: uuidv4(),
      type: 'work_exp',
      editable: true,
      textVal: '',
    });
    const newPages = [...pages];
    newPages[indx] = currPage;
    setPages(newPages);
  };

  const setHeightForBlock = (setHeightForBlock: number, indx:number) => {
    const currPage = pages[indx]

    currPage.blockHeight = setHeightForBlock
    const  newPages = [...pages]
    newPages[indx] = currPage

    setPages([...newPages])
  }

  const checkHeightTextField = (indx: number) => {
    if (!indx) indx ++


    if(pages.length <= 1 ) return
    const currPage = pages[indx]
    const previousPage = pages[indx - 1]
    if(currPage.firstBlockHeight + previousPage.blockHeight < MAX_PAGE_HEIGHT){
        const  newPages = [...pages]
        const removeBlock = newPages[indx].content.shift()
      newPages[indx - 1].content = previousPage.content.concat(removeBlock)
      if(currPage.content.length === 0){
        newPages.pop();
      }
      flushSync(()=>{
        setPages([...newPages])
      })
      return
      }
  }

  const removeBlock = (indx: number, id: string) => {

    const currPage = pages[indx];
    const newCont = currPage.content.filter((el) => el.id !== id);
    currPage.content = newCont;
    const newPages = [...pages];
    if (currPage.content.length === 0) {
      newPages.pop();
    } else {
      newPages[indx] = currPage;
    }
    flushSync(()=>{
      setPages(newPages);
    })
    checkHeightTextField(indx + 1)
  };

  const moveBlockNext = ( indx: number) => {

    const currPage = pages[indx];
    const blockToMove = [currPage.content.pop()]
    const newPage = {
      id: uuidv4(),
      content: blockToMove,
      blockHeight: 0,
      firstBlockHeight: 500
    };

    const newPages = [...pages];
    newPages[indx] = currPage;
    if(pages.length > 1 && pages.length !== indx + 1) {
      const nextElement = pages[indx + 1]
      nextElement.content = blockToMove.concat(pages[indx + 1].content)
    } else {
      newPages.push(newPage)
    }

    setPages([...newPages]);
  };

  const updateBlock = (val: string, id: string, indx: number, firstBlockHeight: number) => {
    const currPage = pages[indx];

    const blockToupdIndx = currPage.content.findIndex((el) => el.id === id);
    const blockToUpd = currPage.content[blockToupdIndx];
    blockToUpd.textVal = val;
    currPage.content[blockToupdIndx] = blockToUpd;

    if(blockToupdIndx === 0) {
      currPage.firstBlockHeight = firstBlockHeight

    }
    if(blockToupdIndx > -1){
      checkHeightTextField(indx)

    }

    const newPages = [...pages];
    newPages[indx] = currPage;
      setPages([...newPages]);

  };

  return (
    <AppContainer>
      {pages.map((page, indx) => (
        <PageContainer key={indx}>
          <ResumeContainer
            removeBlock={(contentId: string) => removeBlock(indx, contentId)}
            addNewBlock={() => addNewBlock(indx)}
            actualBlockHeight={(blockHeight) => setHeightForBlock(blockHeight, indx)}
            content={page.content}
            workExpBlockAmount={workExpBlocks}
            moveBlockNext={() => moveBlockNext(indx)}
            updateBlock={(val: string, id: string, firstBlockHeight:number) =>
              updateBlock(val, id, indx, firstBlockHeight)
            }
          />
          <SideContainer>{indx === 0 ? <Contacts /> : ''}</SideContainer>
        </PageContainer>
      ))}
    </AppContainer>
  );
}

export default App;
