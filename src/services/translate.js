const GOOGLE_TRANSLATE_URL = "https://translate.googleapis.com";

export async function getLanguages() {
  // Liste des langues supportées par Google Translate
  const languages = [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
    { code: "mg", name: "Malagasy" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Português" },
    { code: "ru", name: "Русский" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ar", name: "العربية" },
  ];
  return languages;
}

export async function translateText(text, targetLang = 'fr') {
  try {
    const url = `${GOOGLE_TRANSLATE_URL}/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Translation failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data[0][0][0];
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Retourne le texte original en cas d'erreur
  }
}