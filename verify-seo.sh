#!/bin/bash

# SEO Verification Script
# Run this after deploying to verify all SEO elements are in place

echo "🔍 SEO Verification for saadsifar.com"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# URL to check
URL="https://saadsifar.com"

echo "📡 Fetching homepage..."
RESPONSE=$(curl -s -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" "$URL")

echo ""
echo "1️⃣ Checking Title Tag..."
if echo "$RESPONSE" | grep -q "<title>Saad Sifar • Portfolio</title>"; then
    echo -e "${GREEN}✅ Title tag found${NC}"
else
    echo -e "${RED}❌ Title tag missing or incorrect${NC}"
fi

echo ""
echo "2️⃣ Checking Meta Description..."
if echo "$RESPONSE" | grep -q 'name="description"'; then
    echo -e "${GREEN}✅ Meta description found${NC}"
else
    echo -e "${RED}❌ Meta description missing${NC}"
fi

echo ""
echo "3️⃣ Checking Canonical URL..."
if echo "$RESPONSE" | grep -q 'rel="canonical" href="https://saadsifar.com/"'; then
    echo -e "${GREEN}✅ Canonical URL correct (saadsifar.com)${NC}"
elif echo "$RESPONSE" | grep -q 'rel="canonical" href="https://saadsifar.vercel.app/"'; then
    echo -e "${RED}❌ Canonical URL points to Vercel (wrong!)${NC}"
else
    echo -e "${YELLOW}⚠️  Canonical URL not found${NC}"
fi

echo ""
echo "4️⃣ Checking Person Schema (JSON-LD)..."
if echo "$RESPONSE" | grep -q '"@type":"Person"'; then
    echo -e "${GREEN}✅ Person structured data found${NC}"
else
    echo -e "${RED}❌ Person structured data missing${NC}"
fi

echo ""
echo "5️⃣ Checking WebSite Schema (JSON-LD)..."
if echo "$RESPONSE" | grep -q '"@type":"WebSite"'; then
    echo -e "${GREEN}✅ WebSite structured data found${NC}"
else
    echo -e "${RED}❌ WebSite structured data missing${NC}"
fi

echo ""
echo "6️⃣ Checking Open Graph Tags..."
if echo "$RESPONSE" | grep -q 'property="og:title"'; then
    echo -e "${GREEN}✅ Open Graph tags found${NC}"
else
    echo -e "${RED}❌ Open Graph tags missing${NC}"
fi

echo ""
echo "7️⃣ Checking Twitter Card Tags..."
if echo "$RESPONSE" | grep -q 'name="twitter:card"'; then
    echo -e "${GREEN}✅ Twitter Card tags found${NC}"
else
    echo -e "${RED}❌ Twitter Card tags missing${NC}"
fi

echo ""
echo "8️⃣ Checking Robots Meta Tag..."
if echo "$RESPONSE" | grep -q 'name="robots" content="index, follow"'; then
    echo -e "${GREEN}✅ Robots tag allows indexing${NC}"
else
    echo -e "${YELLOW}⚠️  Robots tag not found or blocking${NC}"
fi

echo ""
echo "9️⃣ Checking Sitemap..."
SITEMAP_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$URL/sitemap.xml")
if [ "$SITEMAP_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ Sitemap accessible${NC}"
else
    echo -e "${RED}❌ Sitemap not accessible (HTTP $SITEMAP_RESPONSE)${NC}"
fi

echo ""
echo "🔟 Checking Robots.txt..."
ROBOTS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$URL/robots.txt")
if [ "$ROBOTS_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ Robots.txt accessible${NC}"
else
    echo -e "${RED}❌ Robots.txt not accessible (HTTP $ROBOTS_RESPONSE)${NC}"
fi

echo ""
echo "======================================"
echo "📝 Next Steps:"
echo ""
echo "1. If all checks pass, submit to Google Search Console"
echo "2. Test with: https://search.google.com/test/rich-results"
echo "3. Validate social: https://developers.facebook.com/tools/debug/"
echo "4. Request indexing in Search Console"
echo ""
echo "For detailed instructions, see SEO_FIXES_APPLIED.md"
