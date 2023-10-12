const fs = require('fs');

const { SITE_URL, NEXT_STAND } = process.env;

// Генерация содержимого robots.txt на основании .env переменных
const robotsTxtContent = `User-agent: *
${NEXT_STAND === 'dev' ? 'Disallow: /' : 'Allow: /'}
Sitemap: ${SITE_URL}/sitemap.xml`;

// Создание файла robots.txt сгенерированным содержимым
fs.writeFileSync('./public/robots.txt', robotsTxtContent);
