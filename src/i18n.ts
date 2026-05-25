import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "header": {
        "callUs": "Call us",
        "email": "Email",
        "myAccount": "My Account",
        "searchPlaceholder": "Search for products, brands...",
        "searchButton": "Search"
      },
      "nav": {
        "audio": "Audio",
        "studio": "Studio Equipment",
        "instrumente": "PA Systems",
        "all": "All Categories",
        "instruments": "Instruments",
        "lighting": "Lighting",
        "brands": "Brands",
        "music": "Music (CDs/Vinyl)",
        "sale": "Sale %"
      },
      "home": {
        "newArrivals": "New Arrivals",
        "shopByCategory": "Shop by Category",
        "bestSellers": "Best Sellers"
      },
      "product": {
         "addToCart": "Add to Cart",
         "specifications": "Specifications",
         "notFound": "Product Not Found",
         "returnHome": "Return to Home"
      },
      "category": {
         "notFound": "No products found in this category."
      },
      "brand": {
         "notFound": "No products found for this brand."
      }
    }
  },
  ro: {
    translation: {
      "header": {
        "callUs": "Sună-ne",
        "email": "Email",
        "myAccount": "Contul meu",
        "searchPlaceholder": "Caută produse, branduri...",
        "searchButton": "Caută"
      },
      "nav": {
        "audio": "Audio",
        "studio": "Echipamente Studio",
        "pa": "Sisteme PA",
        "instruments": "Instrumente Muzicale",
        "all": "Toate Categoriile",
        "lighting": "Lumini",
        "brands": "Branduri",
        "music": "Muzică (CD-uri/Vinil)",
        "sale": "Reduceri %"
      },
      "home": {
        "newArrivals": "Noutăți",
        "shopByCategory": "Cumpără după categorie",
        "bestSellers": "Cele mai vândute"
      },
      "product": {
         "addToCart": "Adaugă în coș",
         "specifications": "Specificații",
         "notFound": "Produsul nu a fost găsit",
         "returnHome": "Înapoi acasă"
      },
      "category": {
         "notFound": "Nu au fost găsite produse în această categorie."
      },
      "brand": {
         "notFound": "Nu au fost găsite produse pentru acest brand."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ro",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;