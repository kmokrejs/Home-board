import { styled } from 'styled-components';

export const CategorySelector = (
  title: string,
  key: string,
  color: string,
  onClick: () => void,
  state: string,
) => {
  return (
    <div
      onClick={onClick}
      key={key}
      style={{
        backgroundColor:
          state === key ? 'rgb(18, 96, 99)' : 'rgba(140, 224, 231, 0.42)',
        padding: '8px 16px',
        color: state === key ? 'white' : 'black',
        fontWeight: 500,
        borderRadius: '60px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: '22px',
        textTransform: 'Uppercase',
      }}
    >
      {key === 'all' ? null : (
        <CategoryIndicator style={{ backgroundColor: color }} />
      )}
      {title}
    </div>
  );
};

const CategoryIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
`;
