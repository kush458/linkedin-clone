function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {year: 'numeric', month: 'long'};

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return formattedDate;
}

function areValidDates(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (startDate > endDate) {
    return false;
  }

  return true;
}

function getTimeDiff(prevDate) {
  const pDate = new Date(prevDate);
  var Time = new Date() - pDate;

  const possibleTimes = [];
  const checkList = {s: 1000, min: 60, h: 60, d: 24};

  for (var key in checkList) {
    Time /= checkList[key];
    checkList[key] = Time;
  }

  let ans = '';
  for (var key in checkList) {
    if (checkList[key] > 1) {
      possibleTimes.push(key);
    }
  }

  ans = possibleTimes.pop();

  if (!ans) {
    return '0s';
  }

  return Math.floor(checkList[ans]) + ans;
}

export {formatDate, areValidDates, getTimeDiff};
