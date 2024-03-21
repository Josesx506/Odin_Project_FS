const sumAll = function(start, end) {
    if (!Number.isInteger(start) || !Number.isInteger(end)) return "ERROR";
    if (start < 0 || end < 0) return "ERROR";
    if (start > end) {
      const temp = start;
      start = end;
      end = temp;
    }

    let total = 0;

    for (i=start; i<=end; i++) {
        total = total + i;
    }

    return total
};

// Do not edit below this line
module.exports = sumAll;
