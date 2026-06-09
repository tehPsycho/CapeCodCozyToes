import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const images = [
  'nursery set basket blanket bunny.jpg',
  'turtles.jpg',
  'blanket.jpg',
  'chickens.jpg',
  'turtle.jpg',
  'American flag.jpg',
  'flower and scrunchie.jpg',
  'boy and bunny.jpg',
]

const assetPath = (name) => `/images/${encodeURI(name)}`

const products = [
  ['seafoam-turtle-plush', 'Seafoam Turtle Plush', 'Plush Animal', 'Contact for pricing', 'A soft chunky chenille turtle with coastal seafoam shell texture and snuggly handmade charm.', 'turtle.jpg', 'Available now', '', true],
  ['turtle-friends-set', 'Turtle Friends Set', 'Plush Animal', 'Contact for pricing', 'Cozy turtle plush friends made with plush chenille yarn and playful shell-inspired colors.', 'turtles.jpg', 'Ask for availability', '', true],
  ['chunky-chenille-blanket', 'Chunky Chenille Blanket', 'Blanket', 'Contact for pricing', 'A tactile handmade blanket with plush texture, soft drape, and cozy everyday warmth.', 'blanket.jpg', 'Custom sizing available', '', true],
  ['nursery-basket-set', 'Nursery Basket + Blanket Set', 'Baby / Nursery Item', 'Contact for pricing', 'A sweet nursery-ready chenille set with basket, blanket texture, and bunny-soft details.', 'nursery set basket blanket bunny.jpg', 'Made to order', '', true],
  ['flower-scrunchie-duo', 'Flower + Ballerina Scrunchie Duo', 'Scrunchie', 'Contact for pricing', 'Playful chunky chenille hair accessories, including the ballerina skirt-style scrunchie.', 'flower and scrunchie.jpg', 'Ask for colors', '', false],
  ['farmhouse-chickens', 'Farmhouse Chicken Plushies', 'Plush Animal', 'Contact for pricing', 'Cute chunky chenille chickens with handmade character and farmhouse-coastal personality.', 'chickens.jpg', 'Made to order', '', false],
].map(([id, name, category, price, description, image, availability, paymentLink, featured]) => ({ id, name, category, price, description, image: assetPath(image), availability, paymentLink, featured }))

const galleryItems = [
  ['nursery-set', 'Nursery Basket, Blanket + Bunny', 'Nursery', 'nursery set basket blanket bunny.jpg'],
  ['turtle-group', 'Coastal Turtle Plush Friends', 'Animals', 'turtles.jpg'],
  ['chenille-blanket', 'Chunky Chenille Blanket', 'Blankets', 'blanket.jpg'],
  ['chicken-plushies', 'Farmhouse Chicken Plushies', 'Animals', 'chickens.jpg'],
  ['single-turtle', 'Seafoam Turtle Plush', 'Animals', 'turtle.jpg'],
  ['american-flag', 'American Flag Blanket', 'Blankets', 'American flag.jpg'],
  ['flower-scrunchie', 'Flower + Ballerina Scrunchie', 'Scrunchies', 'flower and scrunchie.jpg'],
  ['boy-bunny', 'Bunny Keepsake Moment', 'Nursery', 'boy and bunny.jpg'],
].map(([id, title, category, image]) => ({ id, title, category, image: assetPath(image) }))

const config = {
  brandName: 'Cape Cod Cozy Toes',
  email: 'CapeCodCozyToes@gmail.com',
  tagline: 'Handmade chunky chenille yarn creations with coastal color, cozy texture, and custom charm.',
  c2cUrl: '#',
}

const nav = [
  ['Home', '/'], ['Shop', '/shop'], ['Custom Orders', '/custom'], ['Gallery', '/gallery'], ['About', '/about'], ['Contact', '/contact'],
]

const esc = (value) => String(value ?? '').replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]))
const pageHeader = (eyebrow, title, text) => `<section class="page-header shell-accent"><div class="container page-header__inner"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="page-header__text">${text}</p></div></section>`
const productCard = (p) => `<article class="product-card card-lift"><div class="product-card__image-wrap"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy"><span class="availability-badge">${esc(p.availability)}</span></div><div class="product-card__body"><p class="category-pill">${esc(p.category)}</p><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><div class="product-card__footer"><strong>${esc(p.price || 'Contact for pricing')}</strong>${p.paymentLink ? `<a class="btn btn--small btn--dark" href="${p.paymentLink}" target="_blank" rel="noreferrer">Buy Now</a>` : `<a class="btn btn--small btn--outline" href="/custom?item=${encodeURIComponent(p.name)}" data-link>Ask About This Item</a>`}</div></div></article>`
const galleryGrid = (limit = 0) => `<div class="gallery-grid">${galleryItems.slice(0, limit || galleryItems.length).map((item) => `<button class="gallery-item card-lift" type="button" data-lightbox="${item.id}"><img src="${item.image}" alt="${esc(item.title)}" loading="lazy"><span>${esc(item.category)}</span><strong>${esc(item.title)}</strong></button>`).join('')}</div>`
const cta = (title, text, primary, to, secondary = '', secondaryTo = '') => `<section class="cta-section"><div class="container cta-card shell-accent"><div><p class="eyebrow">Ready for something cozy?</p><h2>${title}</h2><p>${text}</p></div><div class="button-row"><a class="btn btn--dark" href="${to}" data-link>${primary}</a>${secondary ? `<a class="btn btn--light" href="${secondaryTo}" data-link>${secondary}</a>` : ''}</div></div></section>`

function form(mode = 'custom', initialItem = '') {
  const isContact = mode === 'contact'
  return `<form class="inquiry-form" data-mailto-form data-mode="${mode}" data-initial-item="${esc(initialItem)}">
    ${initialItem && !isContact ? `<div class="form-highlight">Asking about: <strong>${esc(initialItem)}</strong></div>` : ''}
    <div class="form-grid">
      <label>Name<input name="name" required></label><label>Email<input type="email" name="email" required></label><label>Phone <span>optional</span><input type="tel" name="phone"></label>
      ${!isContact ? `<label>Item type<select name="itemType"><option>Plush Animal</option><option>Blanket</option><option>Baby / Nursery Item</option><option>Scrunchie</option><option>Other</option></select></label><label>Desired size<input name="desiredSize" placeholder="Baby, throw, XL/king, accessory size..."></label><label>Desired colors<input name="desiredColors" placeholder="Seafoam, ivory, blush, custom palette..."></label><label>Budget range <span>optional</span><input name="budget" placeholder="$50-$100, $200+, etc."></label><label>Needed-by date <span>optional</span><input type="date" name="neededBy"></label>` : ''}
    </div>
    <label class="full-width">${isContact ? 'Message' : 'Inspiration / notes'}<textarea name="${isContact ? 'message' : 'notes'}" rows="6" required>${initialItem && !isContact ? `I am interested in something like: ${esc(initialItem)}` : ''}</textarea></label>
    <div class="form-actions"><button class="btn btn--dark" type="submit">Open Email Draft</button><p>This static form opens your email app with the details prefilled.</p></div>
  </form>`
}

function page(path, params = new URLSearchParams()) {
  if (path === '/shop') return `${pageHeader('Shop available items', 'Premade pieces, ready-now favorites, and order inspiration.', 'Browse handmade chunky chenille creations. Some items are available now, while others can be recreated or customized in your preferred colors.')}<section class="section"><div class="container shop-note">Payments are handled securely through external checkout links. Custom orders are quoted individually.</div><div class="container product-grid product-grid--wide">${products.map(productCard).join('')}</div></section>${cta('Need a different size, animal, color palette, or blanket style?', 'Custom orders are welcome and quoted based on size, yarn, design, and timeline.', 'Request a Custom Piece', '/custom')}`
  if (path === '/custom') { const item = params.get('item') || ''; return `${pageHeader('Custom orders', 'Made-for-you chunky chenille pieces, quoted individually.', 'Choose a plush animal, blanket, nursery item, scrunchie, or totally custom cozy creation. Share your colors, size, inspiration, and timeline to begin.')}<section class="section"><div class="container custom-grid"><div class="info-card shell-accent"><p class="eyebrow">How custom works</p><h2>Handmade texture, color, and scale.</h2><p>Email <a href="mailto:${config.email}">${config.email}</a> or use the inquiry form to open a prefilled email draft.</p><ul class="check-list"><li>All items are made with chunky knit chenille yarn.</li><li>A variety of stitches may be used depending on the piece, texture, and design.</li><li>Blankets can range from baby blanket sizes around 50x50 to oversized XL/king blankets that hang over the sides like a comforter.</li><li>The ballerina skirt item is a scrunchie.</li><li>Chunky chenille yarn is the standard material.</li><li>There are tons of color options available.</li></ul></div>${form('custom', item)}</div></section>` }
  if (path === '/gallery') return `${pageHeader('Gallery', 'A cozy lookbook of handmade chunky chenille creations.', 'Explore plush animals, blankets, nursery pieces, scrunchies, and custom inspiration from real image assets in the Cape Cod Cozy Toes collection.')}<section class="section"><div class="container"><div class="filter-row">${['All','Animals','Blankets','Nursery','Scrunchies','Other'].map((f) => `<button class="filter-chip${f === 'All' ? ' filter-chip--active' : ''}" data-filter="${f}">${f}</button>`).join('')}</div>${galleryGrid()}</div></section><section class="section section--compact"><div class="container gallery-cta"><h2>See something similar?</h2><a class="btn btn--dark" href="/custom" data-link>Request a custom piece.</a></div></section>`
  if (path === '/about') return `${pageHeader('About the brand', 'Handmade cozy pieces with soft texture and coastal color.', 'Cape Cod Cozy Toes creates chunky chenille yarn items designed to feel personal, polished, and wonderfully tactile.')}<section class="section"><div class="container story-card shell-accent"><p>Cape Cod Cozy Toes is a handmade chunky-knit creations brand focused on soft textures, custom colors, and thoughtful details. Each piece is made with chunky chenille yarn, giving plush animals, nursery items, blankets, and accessories a cozy feel that is both playful and practical.</p><p>The collection ranges from small accessories like hair scrunchies and ballerina skirt-style scrunchies to baby blankets, nursery keepsakes, plush animals, small blankets, and oversized XL/king blankets. Custom work is available for customers who want a specific color palette, size, theme, or gift idea.</p><p>The goal is simple: create handmade pieces that look beautiful, feel incredibly soft, and hold the character of something made carefully by hand.</p></div></section>${cta('Want something made in your colors?', 'Share your size, colors, inspiration, and timeline for a custom chunky chenille quote.', 'Start a Custom Order', '/custom', 'View Gallery', '/gallery')}`
  if (path === '/contact') return `${pageHeader('Contact', 'Questions, custom ideas, and cozy requests are welcome.', 'Reach out about available items, custom colors, sizing, timing, and handmade chunky chenille creations.')}<section class="section"><div class="container contact-grid"><div class="info-card shell-accent"><p class="eyebrow">Email</p><h2><a href="mailto:${config.email}">${config.email}</a></h2><p>For custom orders, please include item type, size, preferred colors, and any inspiration photos or ideas.</p><a class="btn btn--dark" href="/custom" data-link>Custom Order Form</a></div>${form('contact')}</div></section>`
  return `<section class="hero shell-accent"><div class="container hero__grid"><div class="hero__copy"><p class="eyebrow">Handmade on Cape Cod</p><h1>Soft, cozy handmade creations made with chunky chenille yarn.</h1><p class="hero__subheadline">From plush animals and nursery pieces to oversized blankets and playful scrunchies, each piece is handmade with care, texture, and color.</p><div class="button-row"><a class="btn btn--dark" href="/shop" data-link>Shop Available Items</a><a class="btn btn--light" href="/custom" data-link>Request a Custom Piece</a></div></div><div class="hero__image-card card-lift"><img src="${assetPath('turtle.jpg')}" alt="Seafoam chunky chenille turtle plush"><div class="hero__floating-note">Chunky texture • Coastal colors • Custom made</div></div></div></section><section class="section"><div class="container section-heading"><p class="eyebrow">Featured categories</p><h2>Cozy creations with personality.</h2></div><div class="container category-grid">${[['Plush Animals','Turtles, bunnies, chickens, and cuddly characters with chunky handmade texture.'],['Blankets','From baby blanket sizes around 50x50 to oversized XL and king comforter-style pieces.'],['Nursery Pieces','Soft baskets, baby gifts, cozy sets, and custom colors for sweet little spaces.'],['Scrunchies','Hair scrunchies and ballerina skirt-style scrunchies in playful chenille colors.']].map(([t,x])=>`<article class="category-card card-lift"><span class="yarn-dot"></span><h3>${t}</h3><p>${x}</p></article>`).join('')}</div></section><section class="section section--tint"><div class="container section-heading section-heading--split"><div><p class="eyebrow">Available now preview</p><h2>Ready-made favorites and inspiration pieces.</h2></div><a class="text-link" href="/shop" data-link>View all shop items</a></div><div class="container product-grid">${products.filter((p)=>p.featured).slice(0,3).map(productCard).join('')}</div></section><section class="section custom-preview"><div class="container two-column-card"><div><p class="eyebrow">Custom orders preview</p><h2>Pick the size, colors, texture, and cozy idea.</h2></div><p>Every custom order is quoted individually. Chunky chenille yarn is the standard material, with tons of color options and a variety of stitches chosen to fit the piece, texture, and design.</p><a class="btn btn--dark" href="/custom" data-link>Start a Custom Inquiry</a></div></section><section class="section"><div class="container section-heading section-heading--split"><div><p class="eyebrow">Gallery preview</p><h2>Past pieces, color stories, and handmade details.</h2></div><a class="text-link" href="/gallery" data-link>Open gallery</a></div><div class="container">${galleryGrid(4)}</div></section>${cta('Have an idea for a plush, blanket, nursery piece, or scrunchie?', 'Send the item type, size, preferred colors, and inspiration notes to start a cozy custom quote.', 'Contact Cape Cod Cozy Toes', '/contact', 'Request Custom', '/custom')}`
}

const clientJs = `
const email = ${JSON.stringify(config.email)};
const config = ${JSON.stringify(config)};
const products = ${JSON.stringify(products)};
const galleryItems = ${JSON.stringify(galleryItems)};
const gallery = galleryItems;
const nav = ${JSON.stringify(nav)};
const assetPath = (name) => '/images/' + encodeURI(name);
const esc = ${esc.toString()};
const pageHeader = ${pageHeader.toString()};
const productCard = ${productCard.toString()};
const galleryGrid = ${galleryGrid.toString()};
const cta = ${cta.toString()};
const form = ${form.toString()};
function render(){
  const params = new URLSearchParams(location.search);
  const path = ['/', '/shop', '/custom', '/gallery', '/about', '/contact'].includes(location.pathname) ? location.pathname : '/';
  document.querySelector('#app').innerHTML = ${page.toString()}(path, params);
  document.querySelectorAll('[data-link], .nav-links a, .footer-links a').forEach(a=>a.addEventListener('click', e=>{ const href=a.getAttribute('href'); if(href && href.startsWith('/')){ e.preventDefault(); history.pushState({}, '', href); render(); scrollTo(0,0); }}));
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active', a.getAttribute('href')===path));
  document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{ const f=btn.dataset.filter; document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('filter-chip--active', b===btn)); document.querySelectorAll('.gallery-item').forEach(item=>{ const g=gallery.find(x=>x.id===item.dataset.lightbox); item.style.display=(f==='All'||g.category===f)?'grid':'none'; }); }));
  document.querySelectorAll('[data-lightbox]').forEach(btn=>btn.addEventListener('click',()=>{ const item=gallery.find(x=>x.id===btn.dataset.lightbox); const lb=document.createElement('div'); lb.className='lightbox'; lb.innerHTML='<button class="lightbox__close" type="button">×</button><figure><img src="'+item.image+'" alt="'+item.title+'"><figcaption>'+item.title+'</figcaption></figure>'; lb.addEventListener('click',()=>lb.remove()); lb.querySelector('figure').addEventListener('click', e=>e.stopPropagation()); document.body.append(lb); }));
  document.querySelectorAll('[data-mailto-form]').forEach(f=>f.addEventListener('submit', e=>{ e.preventDefault(); const data=new FormData(f); const mode=f.dataset.mode; const initial=f.dataset.initialItem || 'Not provided'; const subject=mode==='contact'?'Cape Cod Cozy Toes Contact Inquiry':'Custom Knit Inquiry - '+(data.get('itemType')||'Other'); const lines=mode==='contact'?[ 'Name: '+data.get('name'), 'Email: '+data.get('email'), 'Phone: '+(data.get('phone')||'Not provided'), '', 'Message:', data.get('message') ]:[ 'Name: '+data.get('name'), 'Email: '+data.get('email'), 'Phone: '+(data.get('phone')||'Not provided'), 'Item type: '+data.get('itemType'), 'Requested item/reference: '+initial, 'Desired size: '+data.get('desiredSize'), 'Desired colors: '+data.get('desiredColors'), 'Budget range: '+(data.get('budget')||'Not provided'), 'Needed-by date: '+(data.get('neededBy')||'Not provided'), '', 'Inspiration / notes:', data.get('notes') ]; location.href='mailto:'+email+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\\n')); }));
}
document.querySelector('.nav-toggle').addEventListener('click',()=>document.querySelector('.nav-links').classList.toggle('nav-links--open'));
addEventListener('popstate', render); render();`

const shell = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Cape Cod Cozy Toes creates handmade chunky chenille yarn plush animals, blankets, nursery pieces, scrunchies, and custom cozy creations."><title>Cape Cod Cozy Toes | Handmade Chunky Chenille Creations</title><link rel="stylesheet" href="/assets/global.css"></head><body><div class="app-shell"><header class="site-header"><nav class="navbar container" aria-label="Main navigation"><a class="brand" href="/" data-link><span class="brand__mark">CC</span><span>${config.brandName}</span></a><button class="nav-toggle" type="button" aria-label="Toggle navigation menu"><span></span><span></span><span></span></button><div class="nav-links">${nav.map(([l,t])=>`<a href="${t}">${l}</a>`).join('')}</div></nav></header><main id="app"></main><footer class="site-footer"><div class="container footer-grid"><div><h2>${config.brandName}</h2><p>${config.tagline}</p><a href="mailto:${config.email}">${config.email}</a></div><div class="footer-links">${nav.map(([l,t])=>`<a href="${t}">${l}</a>`).join('')}</div><p class="footer-credit">Site built by <a href="${config.c2cUrl}">C2C</a></p></div></footer></div><script>${clientJs}</script></body></html>`

await rm('dist', { recursive: true, force: true })
await mkdir('dist/assets', { recursive: true })
await mkdir('dist/images', { recursive: true })
await cp('src/styles/global.css', 'dist/assets/global.css')
for (const image of images) await cp(`images/${image}`, `dist/images/${image}`)
if (existsSync('public')) await cp('public', 'dist', { recursive: true })
await writeFile('dist/index.html', shell)
console.log('Static fallback build complete: dist')
