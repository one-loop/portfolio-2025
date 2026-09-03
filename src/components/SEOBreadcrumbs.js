'use client';
import React from 'react';

/**
 * SEO Breadcrumbs Component
 * Adds structured data breadcrumbs to help search engines understand page hierarchy
 * 
 * @param {Array} items - Array of breadcrumb items with 'name' and 'url' properties
 * Example: [{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]
 */
const SEOBreadcrumbs = ({ items }) => {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://saadsifar.com${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
};

export default SEOBreadcrumbs;
