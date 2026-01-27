import { styled } from 'styled-components';

export const AssigneeTag = ({
  name,
  color,
}: {
  name: string;
  color: string;
}) => {
  const backgroundColor =
    color ??
    `hsl(${name.charCodeAt(0) - name.charCodeAt(name.length - 1) * 137.508}, 50%, 50%)`;

  return (
    <AssigneeTagWrapper style={{ backgroundColor, color: 'white' }}>
      <AssigneeIcon>{name.charAt(0)}</AssigneeIcon>
    </AssigneeTagWrapper>
  );
};

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
