export function formatFileSize(size) {
  if (size === 0) return '0 B';
  const n = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, n)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][n];
}

export function httpErrorToStr(error) {
  if (!error) return 'Unknown error';
  if (error.response) {
    try {
      const jsonResponse = JSON.parse(error.response);
      if (jsonResponse.error && jsonResponse.error.code && jsonResponse.error.message)
        return jsonResponse.error.code + ' - ' + jsonResponse.error.message;
    } catch (err) {
      return error.response;
    }
  }
  return error.message || 'Unknown error.';
}
