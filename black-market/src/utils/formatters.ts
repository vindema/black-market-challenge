/**
 * Formats a number as a USD price string
 * @param price - The price to format
 * @returns Formatted price string (e.g., "$1,234")
 */
export const formatPrice = (price: number): string => {
    return `$${price.toLocaleString()}`;
};
