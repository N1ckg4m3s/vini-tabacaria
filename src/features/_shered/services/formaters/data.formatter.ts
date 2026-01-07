export const formatDateBR = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
};

export const formatDateTimeBR = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleString('pt-BR');
};
