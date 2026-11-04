# Sarabi landing page

A responsive Sarabi homepage built with Next.js, React, TypeScript, Tailwind CSS, and GSAP. The current iteration contains landing-page presentation and interactions only; reservations and payments are explicitly marked as next-release functionality.

## Commands

```sh
npm install
npm run dev
npm run check
npm run lint
npm run build
npm start
```

The production server listens on port 3000. `npm run build` creates the Next.js application and packages a self-contained deployment in `dist/` with the required `dist/boot.js` entry point. The deployment includes the standalone Next.js runtime, public imagery, and static assets, so it does not require a top-level `node_modules` directory at runtime.

## Current scope

- Mobile-first homepage with tablet and desktop artboard layouts.
- Five-poster programme carousel, realm details, menu preview, gallery filters and lightbox, and accessible navigation dialogs.
- Reservation controls open a preview notice and collect no personal information or payments.
- Founder names, biographies, portraits, reviews, event dates, and detailed menus remain clearly identified as placeholders or design previews.
- Supabase, booking persistence, Razorpay, notifications, receipts, and staff management are deferred to the next development iteration.
