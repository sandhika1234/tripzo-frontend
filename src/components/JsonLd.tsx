export function HomeJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tripzo",
    url: "https://tripzo.in",
    description: "India's #1 Self-Drive Vehicle Rental Platform. Rent bikes, scooties, cars & autos without a driver.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://tripzo.in/search?location={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Tripzo",
    description: "Self-drive vehicle rental platform in India",
    url: "https://tripzo.in",
    telephone: "+911800123456",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    priceRange: "₹400 - ₹5000/day",
    openingHours: "Mo-Su 00:00-23:59",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function VehicleJsonLd({ vehicle }: { vehicle: any }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    description: vehicle.description,
    brand: { "@type": "Brand", name: vehicle.brand },
    offers: {
      "@type": "Offer",
      price: vehicle.pricePerDay,
      priceCurrency: "INR",
      availability: vehicle.status === "ACTIVE" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: vehicle.totalReviews > 0 ? {
      "@type": "AggregateRating",
      ratingValue: vehicle.rating,
      reviewCount: vehicle.totalReviews,
    } : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
