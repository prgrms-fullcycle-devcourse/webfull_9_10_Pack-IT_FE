export const formatDate = (dateString: string | undefined, format:'full'|'short' = 'full'): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  if (format === "short") {
    return `${month}월 ${day}일`;
  }
  const year = date.getFullYear();
  return `${year}년 ${month}월 ${day}일`;
};
