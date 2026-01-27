export const getDateIndicatorContent = (deadline: Date) => {
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
