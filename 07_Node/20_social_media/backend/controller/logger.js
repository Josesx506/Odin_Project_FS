
function logRequests(req, res, next) {
  const now = new Date();
  const formattedTime = now.toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
    hour12: false
  });
  const queryString = Object.keys(req.query).length > 0 
    ? `?${new URLSearchParams(req.query).toString()}` 
    : '';
  
  console.log(req.method, req.hostname, `'${req.path}${queryString}'`, formattedTime);
  next();
}

export { logRequests }