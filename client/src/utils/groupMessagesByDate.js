export const groupMessagesByDate = (messages) => {
  const groupedMessages = {};
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  messages?.forEach((message) => {
    if (!message) return;
    const messageDate = new Date(message.createdAt);
    let formattedDate = "";

    if (messageDate.toDateString() === today.toDateString()) {
      formattedDate = "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      formattedDate = "Yesterday";
    } else if (messageDate > oneWeekAgo) {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      formattedDate = days[messageDate.getDay()];
    } else {
      formattedDate = messageDate.toLocaleDateString();
    }

    if (!groupedMessages[formattedDate]) {
      groupedMessages[formattedDate] = [];
    }
    groupedMessages[formattedDate].push(message);
  });

  return groupedMessages;
};
