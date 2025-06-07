/**
 * Displays the value of the expense in a formatted way
 */
export function displayValue(value: number): string {
    return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR'
    }).format(value);
}


/**
 * Displays the expense data in a formatted way
 */
export function ISOStringToDate(dateString: string): string {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);
}

/**
 * Converts the date of the following format "dd/mm/yyyy" into
 * a date ISO string
 */
export function convertToISOString(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toISOString();
}


/**
 * Converts a string into a number
 */
export function convertToNumber(value: string): number {
    // Removes currency symbols and non-numeric characters except comma and dot
    const cleaned: string = value.replace(/[^\d.,-]/g, '');

    // if (cleaned === '0') return 1;

    // If it contains both comma and dot, assume dot is decimal (e.g. 1,000.50)
    if (cleaned.includes(',') && cleaned.includes('.')) {
        return parseFloat(cleaned.replace(/,/g, '')); // Remove commas
    }

    // If it only contains comma, assume it's a decimal separator (e.g. 10,5 → 10.5)
    if (cleaned.includes(',') && !cleaned.includes('.')) {
        return parseFloat(cleaned.replace(',', '.'));
    }
    // Fallback: just parse normally
    return parseFloat(cleaned);
}







