// function for checkiing whether a sale is in the past
export const inPast = (sale) => {
  // Gets current time (in µs since epoch)
  let todayMicroseconds = new Date().getTime();
  // Gets time of sale (in µs since epoch)
  // Is moved by one day to simplify display
  let saleMicroseconds = (sale.date.seconds + 24 * 3600) * 1000;
  // Calculates if sale is in the past
  let inPast = todayMicroseconds > saleMicroseconds;

  return inPast;
};

export const inFuture = (sale) => {
  // Gets current time (in µs since epoch)
  let todayMicroseconds = new Date().getTime();
  // Gets time of sale (in µs since epoch)
  // Is moved by one day to simplify display
  let saleMicroseconds = (sale.date.seconds - 7 * 24 * 3600) * 1000;
  // Calculates if sale is in the past
  let inFuture = todayMicroseconds < saleMicroseconds;

  return inFuture;
};
