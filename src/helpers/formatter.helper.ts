export class Formatter {
  /**
   * The `formatCurrency` function in TypeScript formats a number as a currency value in USD.
   * @param {number} value - The `value` parameter in the `formatCurrency` function represents the
   * numerical value that you want to format as a currency in USD.
   * @returns A formatted currency string representing the input value in USD currency.
   */
  static formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

  /**
   * The function `formatDate` takes a `Date` object and returns a formatted date string in Spanish
   * locale.
   * @param {Date} date - The `date` parameter is a `Date` object representing a specific date and
   * time.
   * @returns The function `formatDate` is returning a formatted date string in Spanish locale using
   * the `Intl.DateTimeFormat` constructor.
   */
  static formatDate(date: Date) {
    return new Intl.DateTimeFormat('es', { dateStyle: 'long' }).format(date);
  }
}
