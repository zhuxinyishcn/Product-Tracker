/*
This is a helper utils to help me format the date
*/
export function formateDate(time) {
  if (!time) return "";
  const date = new Date(time);
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
}
