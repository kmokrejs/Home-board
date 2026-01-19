'use client';

import { Users2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { CategorySelector } from './category-selector';

export const PageHeader = () => {
  const mockedCategories = [
    {
      title: 'Všechny',
      key: 'all',
      color: '#9ca3af',
    },
    {
      title: 'Domácnost',
      key: 'domacnost',
      color: '#f87171',
    },
    {
      title: 'Práce',
      key: 'prace',
      color: '#60a5fa',
    },
    {
      title: 'Osobní',
      key: 'osobni',
      color: '#34d399',
    },
    {
      title: 'Zdraví',
      key: 'zdravi',
      color: '#fbbf24',
    },
    {
      title: 'Obecné',
      key: 'obecne',
      color: '#a78bfa',
    },
  ];
  const mockedUsers = ['J', 'M', 'A'];

  const [users, setUsers] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const data = useMemo(() => {
    return [users, category];
  }, [users, category]);
  console.log(data);

  // General category button that will accpet title, color, and onClick props with state management

  return (
    <PageHeaderWrapper>
      <h1
        style={{
          fontSize: '32px',
          fontWeight: '600',
          padding: '0',
          margin: '0',
        }}
      >
        Úkoly
      </h1>
      <FiltersWrapper>
        {mockedCategories.map((cat) =>
          CategorySelector(
            cat.title,
            cat.key,
            cat.color,
            () => setCategory(cat.key),
            category,
          ),
        )}
        <Users>
          <Users2 size={26} color="white" />
          <button onClick={() => setUsers('J')}>J</button>
          <button onClick={() => setUsers('M')}>M</button>
          <button onClick={() => setUsers('A')}>A</button>
        </Users>
      </FiltersWrapper>
      <button>Přidat úkol</button>
    </PageHeaderWrapper>
  );
};

const PageHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Users = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  background-color: #46c671;
  border-radius: 9999px;

  button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
  }

  & > button {
    margin-left: -12px;
    border: 2px solid white;
  }

  & > svg {
    margin-right: 20px;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-direction: row;
`;
