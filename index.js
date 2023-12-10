var express = require("express");
var bodyParser = require("body-parser");
const {
  masterProducts,
  masterCategories,
  createMasterProduct,
  createMasterCategory,
  products,
  createProduct,
  updateProducts,
  deleteProduct,
} = require("./handlers/notes");

// const {
//   validateLogin,
//   validateRegisterFields,
//   createClient,
//   deleteClient,
// } = require("./handlers/generic");

// Firebase initialize
var admin = require("firebase-admin");

var serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
// module.exports = { admin, db };

// express logic
var app = express();

app.use(bodyParser.json({ limit: "10mb" }));

// app.use(express.json({ limit: "50mb" }));
// app.use(express.bodyParser({ limit: "50mb" }));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const PORT = process.env.PORT || 3001;
app.get("/", (req, res) => {
  res.send("NSA Academy Server API is up & running");
});
app.get("/notes/master-products", (req, res) => masterProducts(req, res, db));
app.get("/notes/master-categories", (req, res) =>
  masterCategories(req, res, db)
);
app.post("/notes/master-products", (req, res) =>
  createMasterProduct(req, res, db)
);
app.post("/notes/master-categories", (req, res) =>
  createMasterCategory(req, res, db)
);
app.get("/notes/products", (req, res) => products(req, res, db));
app.post("/notes/products", (req, res) => createProduct(req, res, db));
app.put("/notes/products", (req, res) => updateProducts(req, res, db, admin));
app.delete("/notes/product/:id", (req, res) => deleteProduct(req, res, db));
// app.get("/cricket/teams/:clientId", (req, res) => teams(req, res, db));
// app.post("/cricket/create/team", (req, res) => createTeam(req, res, db));
// app.post("/cricket/create/player", (req, res) => createPlayer(req, res, db));
// app.get("/cricket/getPlayers/:teamId", (req, res) =>
//   getPlayersByTeam(req, res, db)
// );
// app.get("/cricket/getAllPlayers/:clientId", (req, res) =>
//   getPlayersByClient(req, res, db)
// );
// app.post("/cricket/create/match", (req, res) => createMatch(req, res, db));
// app.get("/cricket/matches/:clientId", (req, res) => getMatches(req, res, db));
// app.get("/cricket/match/:matchId", (req, res) => getMatch(req, res, db));
// app.post("/cricket/update/players", (req, res) =>
//   updatePlayers(req, res, db, admin)
// );
// app.delete("/cricket/delete/match/:matchId", (req, res) =>
//   deleteMatch(req, res, db)
// );

// app.post("/validate/login", (req, res) => validateLogin(req, res, db));
// app.post("/register/validate", (req, res) =>
//   validateRegisterFields(req, res, db)
// );
// app.post("/client/create", (req, res) => createClient(req, res, db));
// app.delete("/client/delete/:clientId", (req, res) =>
//   deleteClient(req, res, db)
// );

app.listen(PORT, function () {
  console.log(`Demo project at: ${PORT}!`);
});
