import translate from "@iamtraction/google-translate";

/**
 * Translate text using Google Translate (Unofficial API)
 * @param {string} text - The text to be translated
 * @param {string} targetLanguage - The target language code (e.g., 'fr', 'es', 'hi', 'de')
 * @returns {Promise<string>} - The translated text
 */
export const translateText = async (text, targetLanguage) => {
    try {
        const res = await translate(text, { to: targetLanguage }); // Use 'await' here!
        return res.text;  // Properly return the translated text
    } catch (err) {
        console.error("Translation Error:", err.message);
        return text;  // Return original text if translation fails
    }
};
