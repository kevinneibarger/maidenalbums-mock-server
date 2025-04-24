import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = express();
server.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Headers', '*')
    // next()
    console.log(">>> GETTING HERE!!!! <<<<");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Origin, client-security-token, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', "true");
    next();
})

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