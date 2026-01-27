import { getDateIndicatorContent } from './utils';
import colors from '../../styles/colors';
import { JSX } from 'react';
import { AlertTriangleIcon, CalendarClock, Clock } from 'lucide-react';
import styled from 'styled-components';

export const DateIndicator = ({ deadline }: { deadline?: Date }) => {
  if (!deadline) return <div></div>;
  const dateIndicatorContent = getDateIndicatorContent(deadline);
  const colorMap: { [key: string]: string } = {
    normal: colors.dateIndicator.normal,
    overdue: colors.dateIndicator.overdue,
    dueSoon: colors.dateIndicator.dueSoon,
    dueToday: colors.dateIndicator.dueToday,
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

const DateIndicatorWrapper = styled.span`
  font-size: 20px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 12px;
`;
