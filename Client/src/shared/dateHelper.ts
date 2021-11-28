const formatDate = (raw: string): string => {
  const date = new Date(raw);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(date);
};

export { formatDate };
