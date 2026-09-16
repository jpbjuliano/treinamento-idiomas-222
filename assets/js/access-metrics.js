(() => {
  const SESSION_WINDOW_MS = 30 * 60 * 1000;
  const STORAGE_KEY = 'treinamento-idiomas-222:last-access';
  const ENDPOINT = 'https://counterapi.com/api/jpbjuliano.github.io/access/treinamento-idiomas-222';

  const now = Date.now();

  try {
    const previous = Number(localStorage.getItem(STORAGE_KEY) || 0);

    if (previous && now - previous < SESSION_WINDOW_MS) {
      localStorage.setItem(STORAGE_KEY, String(now));
      return;
    }

    localStorage.setItem(STORAGE_KEY, String(now));
  } catch (error) {
    // If localStorage is unavailable, continue and register the page access.
  }

  fetch(ENDPOINT, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-store',
    credentials: 'omit',
    referrerPolicy: 'no-referrer'
  }).catch(() => {
    // Metrics must never interfere with the training platform.
  });
})();
