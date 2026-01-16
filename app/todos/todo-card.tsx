'use client';

import styled from 'styled-components';
import { CalendarClock, Edit, Delete } from 'lucide-react';
import { useState } from 'react';

export enum Status {
  Pending = 'pending',
  InProgress = 'in-progress',
  Completed = 'completed',
}

type TodoCardData = {
  title: string;
  description?: string;
  deadline?: Date;
  assignedTo?: string[];
  category?: string;
  status: Status;
};

export const TodoCard = (data: TodoCardData) => {
  const [status, setStatus] = useState<Status>(data.status);

  return (
    <Card>
      <Header>
        <DataWrapper>
          <StyledStatusIndicator
            type="checkbox"
            id={data.title}
            checked={status === Status.Completed}
            onChange={() => {
              console.log('status changed from ' + status + ' to new');
              setStatus(
                status === Status.Completed ? Status.Pending : Status.Completed,
              );
            }}
          />
          <Title>{data.title}</Title>
        </DataWrapper>
        <ActionsWrapper>
          <button
            onClick={() => {
              console.log('Edit clicked', data.title);
            }}
          >
            <Edit size={24} />
          </button>
          <button
            onClick={() => {
              console.log('Delete clicked', data.title);
            }}
          >
            <Delete size={24} />
          </button>
        </ActionsWrapper>
      </Header>
      <Body>
        <DateIndicator deadline={data.deadline} />
        <Description>{data.description}</Description>
      </Body>
      <Footer>
        <Assignee>
          {data.assignedTo &&
            data.assignedTo.map((assignee) => (
              <AssigneeTag key={assignee} name={assignee} />
            ))}
        </Assignee>
        <Category>
          <CategoryTag
            style={{
              backgroundColor: data.category
                ? `hsl(${data.category.charCodeAt(0) * 10}, 60%, 90%)`
                : '#e0e7ff',
              color: 'black',
            }}
          >
            {data.category}
          </CategoryTag>
        </Category>
      </Footer>
    </Card>
  );
};

const DateIndicator = ({ deadline }: { deadline?: Date }) => {
  if (!deadline) return null;

  return (
    <DateIndicatorWrapper>
      <CalendarClock size={14} />
      {deadline.toLocaleDateString('cs-CZ')}
    </DateIndicatorWrapper>
  );
};

const AssigneeTag = ({ name }: { name: string }) => {
  const color = `hsl(${name.charCodeAt(0) - name.charCodeAt(name.length - 1) * 137.508}, 50%, 50%)`;
  return <AssigneeIcon style={{ backgroundColor: color }}>{name}</AssigneeIcon>;
};

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  min-width: 0;
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
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
  border-radius: 12px;
  padding: 8px 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  max-width: 500px;
`;

const Title = styled.h3`
  font-size: 21px;
  font-weight: 600;
  color: #111827;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  flex: 1;
  min-width: 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: #4b5563;
`;

const DateIndicatorWrapper = styled.span`
  font-size: 12px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Assignee = styled.div`
  display: flex;
  gap: 8px;
`;

const AssigneeIcon = styled.div`
  border-radius: 8px;
  padding: 4px 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #fbfbfbff;
`;

const Category = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

const CategoryTag = styled.p`
  background-color: #e0e7ff;
  color: #3730a3;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  display: inline-block;
`;

const StyledStatusIndicator = styled.input`
  appearance: none;
  width: 28px;
  height: 28px;
  border: 2px solid #03080eff;
  border-radius: 6px;
  cursor: pointer;
  display: grid;
  place-items: center;
  background: white;
  transition: all 0.35s ease;

  &:checked {
    background: #197610ff;
    border-color: #197610ff;
  }

  &:checked::after {
    content: '✓';
    color: white;
    font-size: 14px;
    font-weight: bold;
  }
`;
