'use client';

import React from 'react';
import styled from 'styled-components';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ActionsPopover } from './actions-popover';
import colors from '../../styles/colors';
import { DateIndicator } from './date-indicator';
import { AssigneeTag } from './assignee-tag';
import { useLongPressPopover } from '../hooks/long-press-popover';
import { useTodoActions } from '../hooks/actions-todo';

type TodoCardData = {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  assignedTo?: {
    name: string;
    color: string;
  }[];
  category: {
    id: string;
    name: string;
    color: string;
  } | null;
  status: string;
};

export const TodoCard = (data: TodoCardData) => {
  const [status, setStatus] = useState<string>(data.status);
  const popover = useLongPressPopover<HTMLDivElement>(500);

  const cardRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      popover.setElement(node);
    },
    [popover],
  );

  const { remove, complete } = useTodoActions();

  const handleRemove = async () => {
    try {
      await remove(data.id);
      popover.close();
    } catch (e) {
      alert('Failed to remove task: ' + String(e));
    }
  };

  return (
    <>
      <Card
        ref={cardRef}
        onPointerDown={popover.onPointerDown}
        onPointerUp={popover.onPointerUp}
        onPointerLeave={popover.onPointerLeave}
        onPointerCancel={popover.onPointerCancel}
      >
        <Header>
          <CategoryTag color={data.category?.color}>
            {data.category?.name}
          </CategoryTag>
          <ActionsWrapper>
            <StyledStatusIndicator
              type="checkbox"
              id={data.title}
              checked={status === 'completed'}
              onChange={() => {
                setStatus(status === 'completed' ? 'pending' : 'completed');
                complete(data.id);
              }}
            />
          </ActionsWrapper>
        </Header>
        <Body>
          <Title>{data.title}</Title>
          <Description>{data.description}</Description>
        </Body>
        <Footer>
          <DateIndicator deadline={data.deadline} />
          <Assignee>
            {data.assignedTo &&
              data.assignedTo.map((assignee) => (
                <AssigneeTag
                  key={assignee.name}
                  name={assignee.name}
                  color={assignee.color}
                />
              ))}
          </Assignee>
        </Footer>
      </Card>
      <ActionsPopover
        open={popover.open}
        onClose={popover.close}
        anchor={popover.anchor}
      >
        <Action onClick={handleRemove}>
          <Trash2 size={30} color="red" />
        </Action>
      </ActionsPopover>
    </>
  );
};

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Action = styled.div`
  padding: 12px;
  cursor: pointer;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 28px;
  padding: 20px 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  width: 550px;
  height: 260px;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: 28px;
  font-weight: 600;
  color: #111827;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  flex: 1;
  min-width: 0;
`;

const Description = styled.p`
  font-size: 22px;
  color: #4b5563;
  min-height: 28px;
`;

const Assignee = styled.div`
  display: flex;
  gap: 6px;

  & > div {
    margin-left: -18px;
    border: 2px solid white;
  }
`;

const CategoryTag = styled.p<{ color?: string }>`
  padding: 2px 20px;
  border-radius: 28px;
  font-size: 20px;
  display: inline-block;
  text-transform: uppercase;
  font-weight: 600;

  background-color: ${({ color }) => (color ? color : '#e0e7ff')};

  color: #ffffff;
`;

const StyledStatusIndicator = styled.input`
  appearance: none;
  width: 46px;
  height: 46px;
  border: 1px solid #808b9865;
  border-radius: 28px;
  cursor: pointer;
  display: grid;
  place-items: center;
  background: white;
  transition: all 0.35s ease;

  &:checked {
    background: ${colors.primary};
    border-color: ${colors.primary};
  }

  &:checked::after {
    content: '✓';
    color: white;
    font-size: 20px;
    font-weight: bold;
  }
`;
