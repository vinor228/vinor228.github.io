import { ResumeItems, Section, Input } from '../resume-container/Components';

export const MainContent: React.FC = () => {
  return (
    <>
      <ResumeItems>
        <Section>
          <Input style={{ fontSize: 24 }} placeholder="FIRST NAME" />
          <Input style={{ fontSize: 24 }} placeholder="LAST NAME" />
          <Input style={{ fontSize: 16 }} placeholder="EMAIL" />
        </Section>
      </ResumeItems>
    </>
  );
};
