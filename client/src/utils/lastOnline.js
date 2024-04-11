export const lastOnline = (date) => {
  const now = new Date();
  const lastOnlineTime = new Date(date);
  const diffInMinutes = Math.floor((now - lastOnlineTime) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes < 24 * 60) {
    return `${lastOnlineTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${lastOnlineTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  } else if (diffInMinutes < 24 * 60 * 2) {
    return "yesterday";
  } else if (diffInMinutes < 24 * 60 * 3) {
    return "two days ago";
  } else if ((now - lastOnlineTime) / (1000 * 60 * 60 * 24) < 7) {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdays[lastOnlineTime.getDay()];
  } else {
    return `${lastOnlineTime.getDate().toString().padStart(2, "0")}.${(
      lastOnlineTime.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${lastOnlineTime.getFullYear()}`;
  }
};
