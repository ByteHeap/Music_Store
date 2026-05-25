import type { Product } from '../types';

/**
 * Safely parses the 'specs' property of a product.
 * The 'specs' property can be a JSON string, an object, or null.
 * This function ensures it always returns a valid key-value object.
 * It handles null, undefined, arrays, and invalid JSON strings gracefully.
 *
 * @param specs - The product.specs property.
 * @returns A record of specifications, or an empty object if parsing fails or the format is invalid.
 * JSON PARSER
 */

export const parseProductSpecs = (specs: Product['specs']): Record<string, any> => {
    try {
        const parsedSpecs = typeof specs === 'string' ? JSON.parse(specs) : specs;

        if (parsedSpecs && typeof parsedSpecs === 'object' && !Array.isArray(parsedSpecs)) {
            return parsedSpecs;
        }
    } catch (e) {
        console.error("Failed to parse product specifications:", e);
    }

    return {};
};