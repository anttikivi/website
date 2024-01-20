const routes = {
  en: {
    about: "/about",
    "accessibility-statement": "/accessibility-statement",
    "data-protection": "/data-protection",
  },
  fi: {
    about: "/minusta",
    "accessibility-statement": "/saavutettavuusseloste",
    "data-protection": "/tietosuoja",
  },
} as const;

export default routes;
