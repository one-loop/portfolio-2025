import React from 'react';
import { Helmet } from 'react-helmet';

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
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbList)}
      </script>
    </Helmet>
  );
};

export default SEOBreadcrumbs;
