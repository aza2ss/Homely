export let routes = [];

export function initRouter(routesConfig) {
  routes = routesConfig;
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange();
}

function handleRouteChange() {
  const hash = window.location.hash || '#/';
  const routeMatch = matchRoute(hash);
  
  if (routeMatch && routeMatch.handler) {
    routeMatch.handler(routeMatch.params);
  } else {
    window.location.hash = '#/';
  }
  
  updateActiveLinks(hash);
}

function matchRoute(hash) {
  const path = hash.split('?')[0];
  
  for (const route of routes) {
    const routeParts = route.path.split('/');
    const pathParts = path.split('/');
    
    if (routeParts.length !== pathParts.length) continue;
    
    let match = true;
    const params = {};
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        const paramName = routeParts[i].slice(1);
        params[paramName] = pathParts[i];
      } else if (routeParts[i] !== pathParts[i]) {
        match = false;
        break;
      }
    }
    
    if (match) return { handler: route.handler, params };
  }
  
  return null;
}

export function navigateTo(path) {
  window.location.hash = path;
}

export function getParams() {
  const hash = window.location.hash || '#/';
  const routeMatch = matchRoute(hash);
  return routeMatch ? routeMatch.params : {};
}

function updateActiveLinks(hash) {
  document.querySelectorAll('nav a, .nav-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === hash || (href === '#/catalog' && hash.startsWith('#/catalog'))) {
      link.classList.add('active');
    }
  });
}
