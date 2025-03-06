const clipText = (text) => {
  return text.length <= 100 ? text : text.slice(0, 200) + "...";
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toDateString();
};

export { clipText, formatTimestamp };
