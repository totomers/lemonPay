export interface kvkSearchResults {
  pagina: number;
  aantal: number;
  totaal: number;
  vorige: string;
  volgende: string;
  resultaten: kvkBusinessItem[];
}

export interface kvkBusinessItem {
  kvkNummer: string;
  rsin: string;
  vestigingsnummer: string;
  handelsnaam: string;
  straatnaam: string;
  huisnummer: number;
  huisnummerToevoeging: string;
  postcode: string;
  plaats: string;
  type: string;
  actief: string;
  vervallenNaam: string;
  links: [
    {
      rel: string;
      href: string;
      hreflang: string;
      media: string;
      title: string;
      type: string;
      deprecation: string;
      profile: string;
      name: string;
    }
  ];
}

export interface kvkSearchResultsEnglish {
  page: number;
  amountPerPage: number;
  total: number;
  previous: string;
  next: string;
  results: kvkBusinessItemEnglish[];
}

export interface kvkBusinessItemEnglish {
  kvkNumber: string;
  rsin: string;
  locationNumber: string;
  tradeName: string;
  streetName: string;
  houseNumber: number;
  houseNumberAddition: string;
  zipcode: string;
  place: string;
  type: string;
  active: string;
  vervallenNaam: string;
  links: {
    rel: string;
    href: string;
    hreflang: string;
    media: string;
    title: string;
    type: string;
    deprecation: string;
    profile: string;
    name: string;
  }[];
}
