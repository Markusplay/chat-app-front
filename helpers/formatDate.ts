export const formatDate = (propDate: Date): string => {
  const date = new Date(propDate);
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const formattedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${minutes}${date.getHours() >= 12 ? 'PM' : 'AM'}`;
  return formattedDate;
};
