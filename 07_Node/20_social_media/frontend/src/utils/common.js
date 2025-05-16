function decodeJWT(token) {
  if (!token) return null;

  try {
    // Split the token into parts (header.payload.signature)
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Base64 decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    // console.error('Error decoding JWT:', error);
    return null;
  }
}

function formatDate(dateStr) {
  const updatedAt = new Date(dateStr)
  const now = new Date();
  const diffInSeconds = Math.floor((now - updatedAt) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 1) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else {
    const currentYear = now.getFullYear();
    const dateYear = updatedAt.getFullYear();

    const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNamesShort[updatedAt.getMonth()];
    const day = updatedAt.getDate();

    const janFirstCurrentYear = new Date(currentYear, 0, 1); // Month is 0-indexed

    if (updatedAt > janFirstCurrentYear) {
      return `${month}. ${day}`;
    } else {
      return `${month}. ${day}, ${dateYear}`;
    }
  }
}

export { decodeJWT, formatDate }