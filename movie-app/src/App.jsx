import { useEffect, useMemo, useState } from 'react';

const MEDIA = [
  { id: 1, title: 'The Magical World of Disney', year: '1954–1997', type: 'Series', genre: 'Documentary', poster: 'https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg', tone: 'blue' },
  { id: 2, title: 'Avengers Assemble', year: '2012–2019', type: 'Series', genre: 'Action', poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg', tone: 'red' },
  { id: 3, title: "Disney Jr.'s Ariel", year: '2024–', type: 'Series', genre: 'Animation', poster: 'https://image.tmdb.org/t/p/w500/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg', tone: 'teal' },
  { id: 4, title: 'My Teen Romantic Comedy SNAFU', year: '2013–2023', type: 'Series', genre: 'Comedy', poster: 'https://image.tmdb.org/t/p/w500/6WlG6c8uW3gN8b3s1R2u8Yx4vVf.jpg', tone: 'pink' },
  { id: 5, title: 'The Avengers', year: '1998', type: 'Movie', genre: 'Action', poster: 'https://image.tmdb.org/t/p/w500/cezWGskPY5x7GaglTTRN4Fugfb8.jpg', tone: 'gold' },
  { id: 6, title: 'The Rocky Horror Picture Show', year: '1975', type: 'Movie', genre: 'Comedy', poster: 'https://image.tmdb.org/t/p/w500/3pyE6ZqDbuJi7zrNzzQzcKTWdmN.jpg', tone: 'red' },
  { id: 7, title: 'I Killed My Lesbian Wife, Hung Her on a Meathook, and Now I Have a Three-Picture Deal at Disney', year: '1993', type: 'Movie', genre: 'Comedy', poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', tone: 'gold' },
  { id: 8, title: 'The Story of Frozen: Making a Disney Animated Classic', year: '2014', type: 'Movie', genre: 'Documentary', poster: 'https://image.tmdb.org/t/p/w500/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg', tone: 'ice' },
  { id: 9, title: 'American Horror Stories', year: '2021–2024', type: 'Series', genre: 'Drama', poster: 'https://image.tmdb.org/t/p/w500/3W0v956XxSG5xgm7LB6qu8ExYJ2.jpg', tone: 'dark' },
  { id: 10, title: "Making 'The Matrix'", year: '1999', type: 'Movie', genre: 'Documentary', poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', tone: 'green' },
  { id: 11, title: 'The Matrix Reloaded', year: '2003', type: 'Movie', genre: 'Sci-Fi', poster: 'https://image.tmdb.org/t/p/w500/9TGHDvWrqKBzwDxDodHYXEmOE6J.jpg', tone: 'green' },
  { id: 12, title: 'Disney Gallery: The Mandalorian', year: '2020–', type: 'Series', genre: 'Documentary', poster: 'https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg', tone: 'silver' },
  { id: 13, title: 'One Day at Disney', year: '2019', type: 'Movie', genre: 'Documentary', poster: 'https://image.tmdb.org/t/p/w500/7D0x7Q9z3V6b7g9F6G9p1j2k3L4.jpg', tone: 'gold' },
  { id: 14, title: "A Midsummer Night's Sex Comedy", year: '1982', type: 'Movie', genre: 'Comedy', poster: 'https://image.tmdb.org/t/p/w500/2cal3N8yEVb7n1m0Qn0j0VxYQzA.jpg', tone: 'cream' },
  { id: 15, title: 'Avengers: Age of Ultron', year: '2015', type: 'Movie', genre: 'Action', poster: 'https://image.tmdb.org/t/p/w500/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg', tone: 'red' },
  { id: 16, title: "The Avengers: Earth's Mightiest Heroes", year: '2010–2012', type: 'Series', genre: 'Animation', poster: 'https://image.tmdb.org/t/p/w500/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg', tone: 'comic' },
  { id: 17, title: 'Marvel One-Shot: The Consultant', year: '2011', type: 'Movie', genre: 'Action', poster: 'https://image.tmdb.org/t/p/w500/7D0x7Q9z3V6b7g9F6G9p1j2k3L5.jpg', tone: 'dark' },
  { id: 18, title: 'Enter the Matrix', year: '2003', type: 'Game', genre: 'Sci-Fi', poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', tone: 'green' },
  { id: 19, title: 'Ms. Marvel', year: '2022', type: 'Series', genre: 'Adventure', poster: 'https://image.tmdb.org/t/p/w500/2yFMjjW9k1dJ7S7d7f5jz6F6x5x.jpg', tone: 'comic' },
  { id: 20, title: 'Frozen', year: '2013', type: 'Movie', genre: 'Animation', poster: 'https://image.tmdb.org/t/p/w500/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg', tone: 'ice' },
];

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

function Brand() {
  return <a className="brand" href="#home" aria-label="ScreenShelf home"><span className="brand-mark">S</span><span>screen<span className="brand-light">shelf</span></span></a>;
}

function AuthPanel({ mode, onModeChange, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    setError('');
    const cleanEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Use a password with at least 8 characters.');
      return;
    }
    try {
      const accounts = readStorage('screenshelf-accounts', {});
      if (mode === 'signup') {
        if (accounts[cleanEmail]) {
          setError('An account already exists for this email. Try logging in.');
          return;
        }
        localStorage.setItem('screenshelf-accounts', JSON.stringify({ ...accounts, [cleanEmail]: password }));
      } else if (!accounts[cleanEmail] || accounts[cleanEmail] !== password) {
        setError('Email or password does not match. Create an account first if you are new.');
        return;
      }
      localStorage.setItem('screenshelf-user', JSON.stringify({ email: cleanEmail }));
      onSuccess(cleanEmail);
    } catch {
      setError('Your browser could not save this session. Check your storage settings and try again.');
    }
  }

  return (
    <main className="auth-wrap">
      <form className="auth-card" onSubmit={submit} noValidate>
        <div className="auth-icon">✦</div>
        <p className="eyebrow">WELCOME TO SCREENSHELF</p>
        <h1>{mode === 'signup' ? 'Create account' : 'Welcome back'}</h1>
        <p className="auth-subtitle">{mode === 'signup' ? 'Save your favourites and build your watchlist.' : 'Log in to pick up where you left off.'}</p>
        <label htmlFor="auth-email">Email address</label>
        <input id="auth-email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
        <label htmlFor="auth-password">Password</label>
        <input id="auth-password" type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" minLength={8} required />
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="primary-button auth-submit" type="submit">{mode === 'signup' ? 'Create account' : 'Log in'} <span aria-hidden="true">↗</span></button>
        <p className="auth-switch">{mode === 'signup' ? 'Already have an account?' : 'New to ScreenShelf?'} <button type="button" className="text-button" onClick={() => { setError(''); onModeChange(mode === 'signup' ? 'login' : 'signup'); }}>{mode === 'signup' ? 'Log in' : 'Create account'}</button></p>
        <p className="demo-note">Demo project · account details stay in this browser</p>
      </form>
    </main>
  );
}

function MediaCard({ item, isFavourite, onToggle }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <article className="media-card">
      <div className={`poster poster-${item.tone}`}>
        {!imageFailed && <img src={item.poster} alt={`${item.title} poster`} loading="lazy" onError={() => setImageFailed(true)} />}
        {imageFailed && <div className="poster-fallback"><span>SS</span><strong>{item.title}</strong><small>{item.year}</small></div>}
        <span className="type-pill">{item.type}</span>
        <button className={`heart-button ${isFavourite ? 'is-favourite' : ''}`} onClick={() => onToggle(item.id)} aria-label={isFavourite ? `Remove ${item.title} from favourites` : `Add ${item.title} to favourites`} aria-pressed={isFavourite}>{isFavourite ? '♥' : '♡'}</button>
      </div>
      <div className="card-copy">
        <h2 title={item.title}>{item.title}</h2>
        <p>{item.year}</p>
        <span className="genre">{item.genre}</span>
        <button className={`favourite-button ${isFavourite ? 'selected' : ''}`} onClick={() => onToggle(item.id)} aria-pressed={isFavourite}>{isFavourite ? '♥ In favourites' : '♡ Favourite'}</button>
      </div>
    </article>
  );
}

export default function App() {
  const [user, setUser] = useState(() => readStorage('screenshelf-user', null));
  const [authMode, setAuthMode] = useState('signup');
  const [view, setView] = useState('home');
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [genre, setGenre] = useState('All');
  const [favourites, setFavourites] = useState(() => readStorage('screenshelf-favourites', []));

  useEffect(() => {
    try { localStorage.setItem('screenshelf-favourites', JSON.stringify(favourites)); } catch { /* Keep the UI usable if storage is disabled. */ }
  }, [favourites]);

  const genres = useMemo(() => ['All', ...new Set(MEDIA.map(item => item.genre))], []);
  const visibleMedia = useMemo(() => {
    const needle = submittedQuery.trim().toLowerCase();
    return MEDIA.filter(item => {
      const matchesView = view !== 'favourites' || (user && favourites.includes(item.id));
      const matchesQuery = !needle || `${item.title} ${item.year} ${item.type} ${item.genre}`.toLowerCase().includes(needle);
      const matchesGenre = genre === 'All' || item.genre === genre;
      return matchesView && matchesQuery && matchesGenre;
    });
  }, [view, user, favourites, submittedQuery, genre]);

  function toggleFavourite(id) {
    if (!user) {
      setAuthMode('signup');
      setView('auth');
      return;
    }
    setFavourites(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);
  }

  function signOut() {
    try { localStorage.removeItem('screenshelf-user'); } catch { /* Session still ends in memory. */ }
    setUser(null);
    setView('home');
  }

  function showCatalog(nextView) {
    setView(nextView);
    setSubmittedQuery('');
    setQuery('');
    setGenre('All');
  }

  if (view === 'auth' || !user) {
    return (
      <div className="app-shell">
        <header className="topbar"><Brand /><nav className="auth-nav"><button onClick={() => showCatalog('home')}>Home</button><button onClick={() => { setAuthMode('signup'); setView('auth'); }}>Create account</button><button className="nav-active" onClick={() => { setAuthMode('login'); setView('auth'); }}>Login</button></nav></header>
        <AuthPanel mode={authMode} onModeChange={setAuthMode} onSuccess={email => { setUser({ email }); setView('home'); }} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Brand />
        <nav className="main-nav" aria-label="Main navigation">
          <button className={view === 'home' ? 'nav-active' : ''} onClick={() => showCatalog('home')}>Home</button>
          <button className={view === 'favourites' ? 'nav-active' : ''} onClick={() => showCatalog('favourites')}>Favourites <span className="nav-count">{favourites.length}</span></button>
          <button onClick={signOut}>Logout</button>
        </nav>
        <form className="search-form" onSubmit={event => { event.preventDefault(); setSubmittedQuery(query); }}>
          <label className="sr-only" htmlFor="catalog-search">Search titles, genres or years</label>
          <input id="catalog-search" type="search" placeholder="Search titles, genres..." value={query} onChange={event => setQuery(event.target.value)} />
          {query && <button className="clear-search" type="button" onClick={() => { setQuery(''); setSubmittedQuery(''); }}>Clear</button>}
          <button className="primary-button search-submit" type="submit"><span>Search</span><span aria-hidden="true">⌕</span></button>
        </form>
      </header>
      <main className="catalog-main">
        <section className="hero">
          <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT FAVOURITE IS HERE</p><h1>{view === 'favourites' ? 'Your personal collection.' : <>Stories worth<br /><em>staying in for.</em></>}</h1><p className="hero-description">{view === 'favourites' ? 'All the films and shows you have saved, in one place.' : 'A little inspiration for your next movie night. Explore the collection and keep the good ones close.'}</p><div className="hero-meta"><span>✦ Curated for curious minds</span><span className="meta-divider" /><span>{MEDIA.length} titles to explore</span></div></div>
          <div className="hero-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-disc"><span>SS</span></div><div className="floating-poster float-one"><img src={MEDIA[1].poster} alt="" /></div><div className="floating-poster float-two"><img src={MEDIA[7].poster} alt="" /></div><div className="floating-poster float-three"><img src={MEDIA[9].poster} alt="" /></div><span className="sparkle sparkle-one">✳</span><span className="sparkle sparkle-two">✦</span></div>
        </section>
        <section className="collection-section" aria-labelledby="collection-heading">
          <div className="section-heading"><div><p className="eyebrow">{view === 'favourites' ? 'YOUR SAVED PICKS' : 'THE COLLECTION'}</p><h2 id="collection-heading">{submittedQuery ? `Results for “${submittedQuery}”` : view === 'favourites' ? 'Your favourites' : 'Find your next watch'} <span className="result-count">{visibleMedia.length}</span></h2></div><label className="genre-filter"><span>Genre</span><select value={genre} onChange={event => setGenre(event.target.value)}>{genres.map(item => <option key={item}>{item}</option>)}</select></label></div>
          {visibleMedia.length > 0 ? <div className="media-grid">{visibleMedia.map(item => <MediaCard key={item.id} item={item} isFavourite={favourites.includes(item.id)} onToggle={toggleFavourite} />)}</div> : <div className="empty-state"><span>✦</span><h3>{view === 'favourites' ? 'Your list is waiting.' : 'No matches just yet.'}</h3><p>{view === 'favourites' ? 'Tap the heart on a title to save it here.' : 'Try another title or choose a different genre.'}</p><button className="secondary-button" onClick={() => showCatalog('home')}>Explore all titles</button></div>}
        </section>
        <footer className="footer"><Brand /><p>A small catalogue for big-screen feelings.</p><span>Made for your next night in · 2026</span></footer>
      </main>
    </div>
  );
}