export const convertDate = (d) => {
  var date = new Date(parseInt(d));

  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate()+1;

  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }

  var formattedDate = month + '/' + day + '/' + year;

  return formattedDate;
}
