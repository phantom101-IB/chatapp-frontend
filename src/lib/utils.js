export const formatTime = (date) => {
  return new Date(date).toLocaleString("us-EN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
