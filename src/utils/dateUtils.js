/*
  格式化日期
*/
export function formatDate(time) {
  if (!time) return '';
  let date = new Date(time);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}

export function formatDate2(time) {
  if (!time) return '';
  let date = new Date(time);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}