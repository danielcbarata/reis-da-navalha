export function getNextValidDate(dayOfWeek, hour) {
  const days = [
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado",
    "domingo"
  ];
  let targetDay = days.indexOf(dayOfWeek.toLowerCase());
  if (targetDay === -1) {
      throw new Error('Invalid day of the week');
  }

  let now = new Date();
  let result = new Date();

  result.setDate(now.getDate() + ((7 - now.getDay() + targetDay) % 7));
  if (result.getDay() === now.getDay() && hour <= now.getHours()) {
      result.setDate(result.getDate() + 7); // Next week if the hour has already passed today
  }

  result.setHours(hour, 0, 0, 0); // Set the hour and reset minutes, seconds, and milliseconds

  return result;
}
