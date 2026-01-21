'use client';

import colors from '../../styles/colors';
import { styled } from 'styled-components';

type CategorySelectorProps = {
  category: { title: string; key: string; color: string };
  onChange: (newCategory: string) => void;
  selectedCategory: string;
};

export function CategorySelector({
  category,
  onChange,
  selectedCategory,
}: CategorySelectorProps) {
  return (
    <CategorySelectorWrapper
      onClick={() => onChange(category.key)}
      key={category.key}
      $selected={selectedCategory === category.key}
    >
      {category.key === '' ? null : (
        <CategoryIndicator style={{ backgroundColor: category.color }} />
      )}
      {category.title}
    </CategorySelectorWrapper>
  );
}

const CategoryIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
`;

const CategorySelectorWrapper = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  border-radius: 60px;
  cursor: pointer;
  background-color: ${({ $selected }) =>
    $selected ? colors.primary : colors.backgroundAlt};

  color: ${({ $selected }) => ($selected ? 'white' : 'rgb(72, 72, 72)')};

  font-weight: 600;
  font-size: 22px;

  &:hover {
    background-color: ${({ $selected }) =>
      $selected ? colors.secondary : colors.primary};
    color: white;
  }
`;
