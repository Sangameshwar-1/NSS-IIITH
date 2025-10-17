const routes = {
    "/members": ["public"],
    "/events": ["public"],
    "/faqs": ["public"],
};

const redirects = {
    '/home': '/'
};

const routesNredirects = { routes, redirects };
export default routesNredirects;