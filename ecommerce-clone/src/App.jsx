import { useMemo, useState } from 'react';

const PRODUCTS = [
  {id:1,name:'Arc Wireless Headphones',category:'Tech',price:89,oldPrice:119,rating:4.9,reviews:284,badge:'BESTSELLER',tone:'lavender',emoji:'🎧',description:'Immersive sound, all-day comfort.'},
  {id:2,name:'Studio Ceramic Mug',category:'Home',price:24,rating:4.8,reviews:126,badge:'NEW',tone:'sand',emoji:'☕',description:'Slow mornings start here.'},
  {id:3,name:'Everyday Tote',category:'Accessories',price:38,oldPrice:46,rating:4.7,reviews:198,badge:'−17%',tone:'sage',emoji:'👜',description:'Room for everything, made to last.'},
  {id:4,name:'Cloud Knit Throw',category:'Home',price:64,rating:4.9,reviews:92,tone:'rose',emoji:'🧶',description:'Your favourite corner, made cosier.'},
  {id:5,name:'Pulse Smart Watch',category:'Tech',price:129,oldPrice:159,rating:4.6,reviews:342,badge:'POPULAR',tone:'blue',emoji:'⌚',description:'A little more insight, every day.'},
  {id:6,name:'Form Water Bottle',category:'Lifestyle',price:32,rating:4.8,reviews:154,tone:'mint',emoji:'🧴',description:'Hydration with a better shape.'},
  {id:7,name:'Sculpt Desk Lamp',category:'Home',price:76,oldPrice:94,rating:4.7,reviews:83,badge:'−19%',tone:'peach',emoji:'💡',description:'A softer glow for focused hours.'},
  {id:8,name:'Move-On Sneakers',category:'Lifestyle',price:98,rating:4.9,reviews:217,badge:'JUST IN',tone:'lilac',emoji:'👟',description:'Light on your feet, big on comfort.'},
  {id:9,name:'Minimal Card Holder',category:'Accessories',price:29,rating:4.5,reviews:68,tone:'sand',emoji:'👝',description:'Carry less. Keep what matters.'},
  {id:10,name:'Pocket Bluetooth Speaker',category:'Tech',price:54,oldPrice:69,rating:4.6,reviews:176,badge:'−22%',tone:'rose',emoji:'🔊',description:'Small speaker, room-filling sound.'},
  {id:11,name:'Daily Journal Set',category:'Lifestyle',price:19,rating:4.8,reviews:111,tone:'sage',emoji:'📓',description:'A fresh page for every new idea.'},
  {id:12,name:'Halo Table Mirror',category:'Home',price:45,rating:4.7,reviews:74,badge:'NEW',tone:'blue',emoji:'🪞',description:'A little light, a lot of clarity.'},
];
const CATEGORIES = [{name:'All',icon:'✳'},{name:'Tech',icon:'⌘'},{name:'Home',icon:'⌂'},{name:'Accessories',icon:'◇'},{name:'Lifestyle',icon:'✿'}];
const money = n => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);

function Icon({name,size=18}) {
  const p = {
    search:<><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/></>,
    bag:<><path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>,
    heart:<path d="M20.8 8.8c0 4.1-8.8 10-8.8 10S3.2 12.9 3.2 8.8A4.4 4.4 0 0 1 12 6.6a4.4 4.4 0 0 1 8.8 2.2Z"/>,
    close:<><path d="m6 6 12 12M18 6 6 18"/></>,
    plus:<><path d="M12 5v14M5 12h14"/></>,
    minus:<path d="M5 12h14"/>,
    arrow:<><path d="M5 12h14M13 6l6 6-6 6"/></>,
    check:<path d="m5 12 4 4L19 6"/>,
    menu:<><path d="M4 7h16M4 12h16M4 17h16"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p[name]}</svg>;
}

function ProductCard({product,favourite,onFavourite,onAdd}) {
  return <article className="product-card">
    <div className={'product-art art-' + product.tone}>
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <button className={'heart-icon ' + (favourite ? 'is-liked' : '')} onClick={() => onFavourite(product.id)} aria-label={favourite ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={favourite}><Icon name="heart"/></button>
      <span className="product-emoji" aria-hidden="true">{product.emoji}</span>
      <span className="art-caption">{product.category} / {String(product.id).padStart(2,'0')}</span>
    </div>
    <div className="product-info">
      <div className="product-meta"><span>{product.category}</span><span className="rating">★ {product.rating} <small>({product.reviews})</small></span></div>
      <h3>{product.name}</h3><p className="product-description">{product.description}</p>
      <div className="product-bottom"><div className="price">{money(product.price)} {product.oldPrice && <del>{money(product.oldPrice)}</del>}</div><button className="add-button" onClick={() => onAdd(product)} aria-label={'Add ' + product.name + ' to cart'}><Icon name="plus" size={17}/></button></div>
    </div>
  </article>;
}

function CartDrawer({cart,onClose,onQuantity,onCheckout}) {
  const subtotal = cart.reduce((sum,item) => sum + item.price * item.quantity,0);
  const count = cart.reduce((sum,item) => sum + item.quantity,0);
  return <div className="drawer-backdrop" onMouseDown={e => {if(e.target === e.currentTarget) onClose();}}>
    <aside className="cart-drawer" aria-label="Shopping cart">
      <div className="drawer-heading"><div><span className="eyebrow">YOUR SELECTION</span><h2>Your bag <span>({count})</span></h2></div><button className="icon-button" onClick={onClose} aria-label="Close cart"><Icon name="close"/></button></div>
      {cart.length === 0 ? <div className="cart-empty"><span className="empty-bag">↗</span><h3>Your bag is taking a break.</h3><p>Find something that feels like you.</p><button className="button button-dark" onClick={onClose}>Explore the collection <Icon name="arrow" size={16}/></button></div> :
      <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><div className={'cart-thumb art-' + item.tone}>{item.emoji}</div><div className="cart-item-copy"><h3>{item.name}</h3><span>{money(item.price)}</span><div className="quantity"><button onClick={() => onQuantity(item.id,-1)} aria-label="Decrease quantity"><Icon name="minus" size={13}/></button><span>{item.quantity}</span><button onClick={() => onQuantity(item.id,1)} aria-label="Increase quantity"><Icon name="plus" size={13}/></button></div></div><strong>{money(item.price * item.quantity)}</strong></div>)}</div>
      <div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="button button-dark checkout-button" onClick={onCheckout}>Continue to checkout <Icon name="arrow" size={17}/></button><span className="secure-note">◇ Secure demo checkout · No payment collected</span></div></>}
    </aside>
  </div>;
}

export default function App() {
  const [category,setCategory] = useState('All');
  const [query,setQuery] = useState('');
  const [sort,setSort] = useState('featured');
  const [wishlist,setWishlist] = useState([]);
  const [cart,setCart] = useState([]);
  const [cartOpen,setCartOpen] = useState(false);
  const [wishlistOnly,setWishlistOnly] = useState(false);
  const [mobileMenu,setMobileMenu] = useState(false);
  const [notice,setNotice] = useState('');
  const [checkoutDone,setCheckoutDone] = useState(false);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p => (category === 'All' || p.category === category) && (!wishlistOnly || wishlist.includes(p.id)) && (p.name + ' ' + p.category + ' ' + p.description).toLowerCase().includes(query.toLowerCase().trim()));
    if(sort === 'price-low') list = [...list].sort((a,b) => a.price - b.price);
    if(sort === 'price-high') list = [...list].sort((a,b) => b.price - a.price);
    if(sort === 'rating') list = [...list].sort((a,b) => b.rating - a.rating);
    return list;
  },[category,query,sort,wishlistOnly,wishlist]);
  const cartCount = cart.reduce((sum,item) => sum + item.quantity,0);
  const addToCart = product => {
    setCart(current => current.find(item => item.id === product.id) ? current.map(item => item.id === product.id ? {...item,quantity:item.quantity + 1} : item) : [...current,{...product,quantity:1}]);
    setNotice(product.name + ' added to your bag');
    setCheckoutDone(false);
    window.setTimeout(() => setNotice(''),2300);
  };
  const changeQuantity = (id,amount) => setCart(current => current.map(item => item.id === id ? {...item,quantity:item.quantity + amount} : item).filter(item => item.quantity > 0));
  const toggleWishlist = id => setWishlist(current => current.includes(id) ? current.filter(item => item !== id) : [...current,id]);
  const chooseCategory = name => {setCategory(name);setWishlistOnly(false);};

  return <div className="site-shell">
    <div className="announcement">A little something extra — free shipping on orders over ₹2,999 <span>✳</span></div>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="NOVA Market home"><span className="logo-symbol">n.</span><span>NOVA<span className="wordmark-light">MARKET</span></span></a>
      <nav className={'desktop-nav ' + (mobileMenu ? 'nav-open' : '')} aria-label="Shop categories">
        <a href="#collection" onClick={() => {chooseCategory('All');setMobileMenu(false);}}>Shop all</a>
        <a href="#collection" onClick={() => {chooseCategory('Home');setMobileMenu(false);}}>Home living</a>
        <a href="#collection" onClick={() => {chooseCategory('Tech');setMobileMenu(false);}}>Tech & audio</a>
        <a href="#story" onClick={() => setMobileMenu(false)}>Our point of view</a>
      </nav>
      <div className="header-actions">
        <label className="header-search"><Icon name="search"/><input value={query} onChange={e => {setQuery(e.target.value);setWishlistOnly(false);}} placeholder="Find your next favourite" aria-label="Search products"/></label>
        <button className={'header-icon ' + (wishlistOnly ? 'active' : '')} onClick={() => {setWishlistOnly(v => !v);setCategory('All');document.getElementById('collection')?.scrollIntoView({behavior:'smooth'});}} aria-label="Show wishlist" aria-pressed={wishlistOnly}><Icon name="heart"/><span className="icon-count">{wishlist.length}</span></button>
        <button className="header-icon bag-button" onClick={() => setCartOpen(true)} aria-label={'Open shopping bag, ' + cartCount + ' items'}><Icon name="bag"/><span className="icon-count">{cartCount}</span></button>
        <button className="mobile-menu-button" onClick={() => setMobileMenu(v => !v)} aria-label="Toggle navigation"><Icon name={mobileMenu ? 'close' : 'menu'}/></button>
      </div>
    </header>
    <main id="top">
      <section className="hero">
        <div className="hero-content"><span className="eyebrow"><i/> THE EVERYDAY EDIT · VOL. 04</span><h1>Good things.<br/><em>Better living.</em></h1><p>Thoughtfully picked pieces for the spaces you make, the places you go, and everything in between.</p><a className="button button-dark" href="#collection" onClick={() => {chooseCategory('All');}}>Explore the collection <Icon name="arrow" size={17}/></a><div className="hero-proof"><span className="proof-avatars"><b>A</b><b>M</b><b>J</b></span><span>Loved by <strong>12,000+</strong> everyday originals</span></div></div>
        <div className="hero-art" aria-label="Stylized product still life"><div className="sun-shape"/><div className="hero-orbit orbit-a"/><div className="hero-orbit orbit-b"/><div className="hero-object object-one">🎧</div><div className="hero-object object-two">☕</div><div className="hero-object object-three">👜</div><span className="hero-sticker">LESS, BUT<br/>BETTER. <b>↗</b></span><span className="hero-art-caption">OBJECTS FOR LIVING / 2026</span></div>
        <div className="hero-index">01 <span>—</span> 04</div>
      </section>
      <section className="category-row" aria-label="Shop by category"><div className="category-intro"><span className="eyebrow">FIND YOUR THING</span><h2>Shop by mood.</h2></div><div className="category-list">{CATEGORIES.map(item => <button key={item.name} className={category === item.name && !wishlistOnly ? 'category-chip selected' : 'category-chip'} onClick={() => chooseCategory(item.name)}><span>{item.icon}</span>{item.name}<Icon name="arrow" size={13}/></button>)}</div></section>
      <section id="collection" className="collection-section"><div className="collection-heading"><div><span className="eyebrow">{wishlistOnly ? 'YOUR SAVED PIECES' : 'THE GOOD STUFF'}</span><h2>{wishlistOnly ? 'Your wishlist.' : 'Made for your everyday.'}</h2><p>{wishlistOnly ? 'All the things you have your eye on.' : 'Useful, beautiful, and worth keeping around.'}</p></div><div className="collection-tools"><span>{filtered.length} pieces</span><label htmlFor="sort-products">Sort by <select id="sort-products" value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label></div></div>
      {filtered.length ? <div className="product-grid">{filtered.map(product => <ProductCard key={product.id} product={product} favourite={wishlist.includes(product.id)} onFavourite={toggleWishlist} onAdd={addToCart}/>)}</div> : <div className="no-results"><span>✳</span><h3>Nothing on this shelf just yet.</h3><p>Try a different search or explore the full collection.</p><button className="button button-dark" onClick={() => {setQuery('');chooseCategory('All');}}>See everything <Icon name="arrow" size={16}/></button></div>}</section>
      <section id="story" className="story-band"><div className="story-mark">n.</div><div><span className="eyebrow">A SMALLER KIND OF BETTER</span><h2>Buy less. Choose well.<br/><em>Make it mean more.</em></h2></div><p>We believe the everyday deserves a little more thought. So we look for considered design, useful details, and things that feel good to live with.</p><a href="#collection" aria-label="Explore products"><Icon name="arrow" size={22}/></a></section>
    </main>
    <footer className="site-footer"><a className="wordmark footer-mark" href="#top"><span className="logo-symbol">n.</span><span>NOVA<span className="wordmark-light">MARKET</span></span></a><span>Considered essentials. Everyday stories.</span><span>© 2026 NOVA Market</span><a href="#top">Back to top ↑</a></footer>
    {notice && <div className="toast" role="status"><Icon name="check" size={17}/>{notice}</div>}
    {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onQuantity={changeQuantity} onCheckout={() => {setCart([]);setCartOpen(false);setCheckoutDone(true);}}/>}
    {checkoutDone && <div className="success-backdrop"><div className="success-card"><div className="success-check"><Icon name="check" size={27}/></div><span className="eyebrow">ORDER PREVIEW COMPLETE</span><h2>That was easy.</h2><p>Your demo order has been placed. No payment was taken, and nothing will be shipped.</p><button className="button button-dark" onClick={() => setCheckoutDone(false)}>Back to shopping <Icon name="arrow" size={16}/></button></div></div>}
  </div>;
}