import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = express();

server.use((req, res, next) => {
    // Get the token from the request (e.g., from a query parameter or header)
    const token = req.query.token || req.headers['authorization'];

    if (token) {
        // Add the authorization header to the request
        req.headers['authorization'] = `Bearer ${token}`;
    }

    next(); // Pass control to the next middleware or route handler
});

const router = jsonServer.router('./data/dbAlbums.json');
server.use('/api', router);
server.db = router.db

const middlewares = jsonServer.defaults()
const rules = auth.rewriter({
    products: 444,
    featured_products: 444,
    orders: 660,
    users: 600
});

server.use(rules)
server.use(auth)
server.use(middlewares)
server.use(router)

server.listen(8000);