'use client';

import { Users2, CirclePlus } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';
import { CategorySelector } from './category-selector';
import colors from '../styles/colors';
import { Modal } from './modal';

export const PageHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const onCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    if (category === newCategory) {
      setCategory('');
    }
  };

  const onAddTaskClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <PageHeaderWrapper>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            padding: '0 0 0 10px',
            margin: '0',
          }}
        >
          Úkoly
        </h1>
        <FiltersWrapper>
          {mockedCategories.map((cat) => (
            <CategorySelector
              key={cat.key}
              category={cat}
              onChange={onCategoryChange}
              selectedCategory={category}
            />
          ))}
          <Users>
            <Users2 size={26} color="white" />
            <button onClick={() => setUsers('J')}>J</button>
            <button onClick={() => setUsers('M')}>M</button>
            <button onClick={() => setUsers('A')}>A</button>
          </Users>
        </FiltersWrapper>
        <AddTodoButton onClick={onAddTaskClick}>
          <CirclePlus size={32} /> Přidat úkol
        </AddTodoButton>
      </PageHeaderWrapper>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export const mockedCategories = [
  {
    title: 'Vše',
    key: '',
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
export const mockedUsers = ['J', 'M', 'A'];

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
  background-color: ${colors.primary};
  border-radius: 9999px;

  button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${colors.secondary};
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

const AddTodoButton = styled.button`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  padding: 10px 20px;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 22px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.secondary};
  }
`;
