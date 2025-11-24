6. README.md
text
# Portfolio Website

Static multilingual portfolio built with HTML, Tailwind CSS, GSAP, and modern web standards.

## 🚀 Features

- **Time-Budget Navigation**: 30-second, 1-minute, and 5-minute content paths
- **Multilingual**: English, Spanish (ES), Arabic (AR) with RTL support
- **Analytics**: Google Analytics 4 + Microsoft Clarity
- **AI Integration**: Chatbase chatbot for visitor Q&A
- **Performance**: Optimized for Core Web Vitals
- **Accessibility**: WCAG 2.1 AA compliant
- **Animations**: GSAP-powered scroll animations

---

## 📂 Project Structure

/
├── index.html # English home page
├── overview.html # 1-minute overview
├── deep-dive.html # 5-minute deep dive
├── about.html # About page
├── projects.html # Projects showcase
├── contact.html # Contact form (Formspree)
├── privacy.html # Privacy policy
├── _redirects # Cloudflare/Netlify routing
├── /es/ # Spanish versions
│ └── index.html
├── /ar/ # Arabic versions (RTL)
│ └── index.html
└── /assets/
├── /css/
│ └── theme.css # Custom styles
├── /js/
│ └── site.js # Interactions & GSAP
└── /img/ # Images (add your headshot here)

text

---

## 🛠️ Tech Stack

- **Framework**: Static HTML5
- **Styling**: Tailwind CSS (CDN)
- **Animations**: GSAP 3.12.2 + ScrollTrigger
- **Analytics**: Google Analytics 4, Microsoft Clarity
- **Forms**: Formspree
- **Chatbot**: Chatbase
- **Hosting**: Cloudflare Pages (recommended)

---

## 📦 Local Development

No build process required—just open files in a browser.

For live server:
Using Python
python3 -m http.server 8000

Using Node.js
npx http-server

Using VS Code
Install "Live Server" extension and click "Go Live"
text

Visit: `http://localhost:8000`

---

## 🚀 Deployment Checklist

### Pre-Launch

- [ ] Replace all "TBD" metrics with real data
- [ ] Add headshot image to `/assets/img/`
- [ ] Update email in contact form (currently: `hello@estivanayramia.com`)
- [ ] Test Formspree integration (`https://formspree.io/f/mblbnwoy`)
- [ ] Verify Google Analytics ID: `G-MCN4RXCY6Q`
- [ ] Verify Microsoft Clarity ID: `uawk2g8xee`
- [ ] Verify Chatbase ID: `fe5slOh95Jd3FwQHUxFDP`
- [ ] Test all language versions (EN, ES, AR)
- [ ] Run accessibility audit (Chrome DevTools Lighthouse)
- [ ] Test on mobile devices
- [ ] Validate HTML (https://validator.w3.org/)
- [ ] Check broken links

### Deploy to Cloudflare Pages

1. Push code to GitHub
2. Go to Cloudflare Dashboard → Pages
3. Click "Create a project"
4. Connect your GitHub repository
5. Build settings:
   - **Build command**: (leave empty)
   - **Build output directory**: `/`
   - **Root directory**: `/`
6. Click "Save and Deploy"
7. Add custom domain: `estivanayramia.com`
8. Enable "Always Use HTTPS"

### Post-Launch

- [ ] Submit sitemap to Google Search Console
- [ ] Test analytics tracking (view in real-time)
- [ ] Monitor Clarity heatmaps after 24 hours
- [ ] Check chatbot responses
- [ ] Monitor Formspree submissions
- [ ] Set up email forwarding for `hello@estivanayramia.com`

---

## 🎨 Customization

### Colors (Tailwind Config)

colors: {
beige: '#e1d4c2', // Background
chocolate: '#362017', // Text primary
indigodeep: '#212842', // Accent
ink: '#0a0a0a' // Dark text
}

text

### Fonts

- **English/Spanish**: Inter (Google Fonts)
- **Arabic**: Cairo (Google Fonts, RTL-optimized)

### Adding New Pages

1. Copy an existing HTML file
2. Update content
3. Add navigation links in header/footer
4. Add to sitemap (create `sitemap.xml`)

---

## 📊 Analytics Setup

### Google Analytics 4
- **ID**: G-MCN4RXCY6Q
- Dashboard: https://analytics.google.com
- Track: pageviews, events, conversions

### Microsoft Clarity
- **ID**: uawk2g8xee
- Dashboard: https://clarity.microsoft.com
- Track: heatmaps, session recordings, rage clicks

### Chatbase
- **ID**: fe5slOh95Jd3FwQHUxFDP
- Dashboard: https://www.chatbase.co
- Train on site content, monitor questions

---

## 🔒 Privacy & Compliance

- Privacy policy: `/privacy.html`
- Data collection: analytics cookies only
- Form data: processed by Formspree (GDPR-compliant)
- No personal data stored locally

---

## 🐛 Troubleshooting

### GSAP animations not working
- Check browser console for errors
- Verify GSAP CDN links are loading
- Test with `prefers-reduced-motion` disabled

### Mobile menu not toggling
- Check `site.js` is loading
- Verify IDs match: `mobile-menu-toggle`, `mobile-menu`

### Form submissions failing
- Verify Formspree endpoint: `https://formspree.io/f/mblbnwoy`
- Check network tab for 200 response
- Test with valid email format

### Arabic text showing LTR
- Verify `<html lang="ar" dir="rtl">`
- Check `space-x-reverse` utility in Tailwind

---

## 📞 Support

- **Email**: hello@estivanayramia.com
- **Formspree Support**: https://help.formspree.io
- **Cloudflare Docs**: https://developers.cloudflare.com/pages/

---

## 📄 License

© 2025 Portfolio. All rights reserved.

---

## 🎯 Next Steps

1. Complete all Spanish and Arabic page translations
2. Add real project images
3. Record demo video for projects
4. Create blog section (optional)
5. Add testimonials section
6. Implement newsletter signup
7. Create PDF resume download
8. Add schema.org structured data for SEO

---

**Built with care. Deployed with confidence.**