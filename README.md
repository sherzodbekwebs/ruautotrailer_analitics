# Trailer Analytics

React + TypeScript + Vite loyihasi. Barcha yangilangan chartlar, uslublar va rasmlar kiritilgan.

## Ishga tushirish

1. Node.js LTS o‘rnatilgan bo‘lishi kerak.
2. ZIP faylni oching va trailer-analytics papkasini VS Code orqali oching.
3. Shu papkada terminal ochib bajaring:

   npm ci
   npm run dev

4. Terminalda ko‘rsatilgan Local manzilini brauzerda oching.

## Tayyor saytni yig‘ish

   npm run build
   npm run preview

`dist` papkasida tekshirilgan tayyor build ham bor. Uni statik hostingga joylash mumkin.
`src` — kod, `public` — rasmlar, `src/components` — chartlar va interfeys.

Raqam va foizlar foydalanuvchi taqdim etgan slaydlardagi qiymatlar bo‘yicha saqlangan.
node_modules va maxfiy .env fayllari ZIP ichiga kiritilmagan; npm ci paketlarni o‘rnatadi.

Eslatma: loyihada avvaldan mavjud TypeScript tip xatolari sabab npm run lint xato qaytarishi mumkin. Vite build muvaffaqiyatli tekshirilgan.
