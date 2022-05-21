

export const inThePast = (sale) => {
    // Gets current time (in µs since epoch)
    let today_microseconds = new Date().getTime();
    // Gets time of sale (in µs since epoch)
    let sale_microseconds = (sale.date.seconds + 24 * 3600) * 1000;
    // Calculates if sale is in the past
    let in_the_past = today_microseconds > sale_microseconds;

    return in_the_past;
}

export const inTheFuture = (sale) => {
    // Gets current time (in µs since epoch)
    let today_microseconds = new Date().getTime();
    // Gets time of sale (in µs since epoch)
    let sale_microseconds = (sale.date.seconds - 7 * 24 * 3600) * 1000;
    // Calculates if sale is in the future
    let in_the_past = today_microseconds < sale_microseconds;

    return in_the_past;
}