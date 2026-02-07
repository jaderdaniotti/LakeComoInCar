'use client';

export default function StructuredData() {
  // Schema per Local Business - NCC/Taxi Service
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.lakecomoincar.eu/#business",
    "name": "Autoservizi Pasquillo - LakeComoInCar",
    "alternateName": ["Pasquillo", "Autoservizi Pasquillo", "Autoservizi Pasquillo SRL", "Lake Como in Car", "Lake Como In Car", "LakeComoInCar"],
    "description": "Autoservizi Pasquillo: servizio NCC Como 24/7. Transfer aeroporti Milano, taxi privato Lombardia e Svizzera. Noleggio con conducente professionale. Pasquillo - LakeComoInCar.",
    "url": "https://www.lakecomoincar.eu",
    "telephone": "+39-3384056027",
    "email": "lakecomoincar@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Località Corte del Re, 264",
      "addressLocality": "Como",
      "addressRegion": "CO",
      "postalCode": "22100",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.8080",
      "longitude": "9.0852"
    },
    "priceRange": "€€",
    "areaServed": [
      {
        "@type": "City",
        "name": "Como"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Lombardia"
      },
      {
        "@type": "Country",
        "name": "Switzerland"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servizi NCC",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transfer Aeroporto",
            "description": "Servizio transfer da/per aeroporti Milano: Malpensa, Linate, Bergamo Orio al Serio"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "NCC Como",
            "description": "Servizio noleggio con conducente a Como e provincia"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tour Lago di Como",
            "description": "Tour guidati del Lago di Como con autista privato"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transfer Svizzera",
            "description": "Servizio NCC per destinazioni in Svizzera"
          }
        }
      ]
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/lakecomoincar",
      "https://www.instagram.com/lakecomoincar"
    ]
  };

  // Schema per Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.lakecomoincar.eu/#organization",
    "name": "Autoservizi Pasquillo - LakeComoInCar",
    "legalName": "Autoservizi Pasquillo SRL",
    "alternateName": ["Pasquillo", "Autoservizi Pasquillo", "LakeComoInCar"],
    "url": "https://www.lakecomoincar.eu",
    "logo": "https://www.lakecomoincar.eu/favicon.webp",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+39-3384056027",
      "contactType": "customer service",
      "email": "lakecomoincar@gmail.com",
      "availableLanguage": ["Italian", "English", "French", "Spanish"],
      "areaServed": ["IT", "CH"]
    }
  };

  // Schema per WebSite con SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.lakecomoincar.eu/#website",
    "url": "https://www.lakecomoincar.eu",
    "name": "Autoservizi Pasquillo - LakeComoInCar",
    "alternateName": ["Pasquillo", "Autoservizi Pasquillo", "LakeComoInCar"],
    "description": "Autoservizi Pasquillo: NCC Como - Noleggio con Conducente Lombardia e Svizzera. Taxi Como, transfer aeroporti Milano.",
    "publisher": {
      "@id": "https://www.lakecomoincar.eu/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.lakecomoincar.eu/it/servizi?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["it-IT", "en-US", "fr-FR", "es-ES"]
  };

  // Schema per BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.lakecomoincar.eu/it"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Servizi NCC",
        "item": "https://www.lakecomoincar.eu/it/servizi"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Veicoli",
        "item": "https://www.lakecomoincar.eu/it/veicoli"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Prenota",
        "item": "https://www.lakecomoincar.eu/it/prenota"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
