'use client';

import styled from 'styled-components';
import { CalendarClock, Clock, AlertTriangleIcon } from 'lucide-react';
import { JSX, useState } from 'react';
import colors from '../styles/colors';

export enum Status {
  Pending = 'pending',
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
        <CategoryTag
          style={{
            backgroundColor: data.category
              ? `hsl(${data.category.charCodeAt(0) * 10}, 60%, 90%)`
              : '#e0e7ff',
            color: data.category
              ? `hsl(${data.category.charCodeAt(0) * 10}, 60%, 30%)`
              : '#000000ff',
          }}
        >
          {data.category}
        </CategoryTag>
        <ActionsWrapper>
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
              <AssigneeTag key={assignee} name={assignee} />
            ))}
        </Assignee>
      </Footer>
    </Card>
  );
};

const DateIndicator = ({ deadline }: { deadline?: Date }) => {
  if (!deadline) return <div></div>;
  const dateIndicatorContent = getDateIndicatorContent(deadline);
  const colorMap: { [key: string]: string } = {
    normal: colors.dateIndocator.normal,
    overdue: colors.dateIndocator.overdue,
    dueSoon: colors.dateIndocator.dueSoon,
    dueToday: colors.dateIndocator.dueToday,
  };
  const iconMap: { [key: string]: JSX.Element } = {
    calendar: <CalendarClock size={30} />,
    clock: <Clock size={30} />,
    alert: <AlertTriangleIcon size={30} />,
  };

  return (
    <DateIndicatorWrapper
      style={{ color: colorMap[dateIndicatorContent.color] }}
    >
      {iconMap[dateIndicatorContent.icon]}
      {dateIndicatorContent.copy}
    </DateIndicatorWrapper>
  );
};

const getDateIndicatorContent = (deadline: Date) => {
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 1) {
    return { copy: `${diffDays} dní zbývá`, color: 'normal', icon: 'calendar' };
  } else if (diffDays === 1) {
    return { copy: 'Zítra', color: 'dueSoon', icon: 'calendar' };
  } else if (diffDays === 0) {
    return { copy: 'Dnes', color: 'dueToday', icon: 'clock' };
  } else {
    return {
      copy: `${-diffDays} dní po termínu`,
      color: 'overdue',
      icon: 'alert',
    };
  }
};

const AssigneeTag = ({ name }: { name: string }) => {
  const color = `hsl(${name.charCodeAt(0) - name.charCodeAt(name.length - 1) * 137.508}, 50%, 50%)`;

  return (
    <AssigneeTagWrapper style={{ backgroundColor: color, color: 'white' }}>
      <AssigneeIcon>{name.charAt(0)}</AssigneeIcon>
    </AssigneeTagWrapper>
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

const DateIndicatorWrapper = styled.span`
  font-size: 20px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Assignee = styled.div`
  display: flex;
  gap: 6px;

  & > div {
    margin-left: -18px;
    border: 2px solid white;
  }
`;

const AssigneeTagWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 46px;
  width: 46px;
`;

const AssigneeIcon = styled.p`
  font-size: 20px;
`;

const CategoryTag = styled.p`
  padding: 2px 20px;
  border-radius: 28px;
  font-size: 20px;
  display: inline-block;
  text-transform: uppercase;
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
