import styled from 'styled-components';

export default function SettingsPage() {
  return (
    <PageWrapper>
      <div>Settings Page</div>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  height: 100%;
`;
