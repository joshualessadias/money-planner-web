const formatDate = (milliseconds: number) => {
  const date = new Date(milliseconds);
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(date);
};

export default formatDate;
