// const { db, admin } = require("../index");
// const { updatePlayersInAlgolia } = require("./algolia");

exports.masterProducts = async (req, res, db) => {
  // const clientId = req.params.clientId;
  const productsRef = db.collection("masterProducts").orderBy("name", "desc");

  try {
    productsRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());

      return res.status(200).json(data);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
};

exports.masterCategories = async (req, res, db) => {
  // const clientId = req.params.clientId;
  const categoriesRef = db
    .collection("masterCategories")
    .orderBy("name", "desc");

  try {
    categoriesRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());

      return res.status(200).json(data);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
};

exports.createMasterProduct = async (req, res, db) => {
  try {
    const id = req.body.id;
    const masterProductRef = db.collection("masterProducts");
    const response = await masterProductRef.doc(id).set(req.body);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

exports.createMasterCategory = async (req, res, db) => {
  try {
    const id = req.body.id;
    const masterCategoryRef = db.collection("masterCategories");
    const response = await masterCategoryRef.doc(id).set(req.body);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

exports.products = async (req, res, db) => {
  // const clientId = req.params.clientId;
  const productsRef = db.collection("products").orderBy("name", "desc");

  try {
    productsRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());

      return res.status(200).json(data);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
};

exports.createProduct = async (req, res, db) => {
  try {
    const id = req.body.id;
    const productRef = db.collection("products");
    const response = await productRef.doc(id).set(req.body);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

// exports.createPlayer = async (req, res, db) => {
//   try {
//     const id = req.body.id;
//     const playersCollection = db.collection("players");
//     const response = await playersCollection.doc(id).set(req.body);
//     res.send(response);
//   } catch (error) {
//     res.send(error);
//   }
// };

// exports.getPlayersByTeam = async (req, res, db) => {
//   const teamId = req.params.teamId;
//   // console.log(teamId);
//   const collRef = db
//     .collection("players")
//     .where("teamId", "==", teamId || 0)
//     .orderBy("name");
//   try {
//     collRef.get().then((snapshot) => {
//       const data = snapshot.docs.map((doc) => doc.data());
//       // console.log(data);
//       return res.status(200).json(data);
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ general: "Something went wrong, please try again" });
//   }
// };

// exports.getPlayersByClient = async (req, res, db) => {
//   const clientId = req.params.clientId;
//   const teamsRef = db
//     .collection("teams")
//     .where("clientId", "==", clientId || []);

//   try {
//     teamsRef.get().then((snapshot) => {
//       const teamIds = snapshot.docs.map((doc) => doc.data());
//       console.log(teamIds);
//       if (teamIds.length > 0) {
//         const collRef = db
//           .collection("players")
//           .where(
//             "teamId",
//             "in",
//             teamIds.map((team) => team.id)
//           )
//           .orderBy("name");

//         collRef.get().then((snapshot1) => {
//           const data = snapshot1.docs.map((doc) => doc.data());
//           // console.log(data);
//           return res.status(200).json(data);
//         });
//       } else {
//         return res.status(200).json([]);
//       }
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ general: "Something went wrong, please try again" });
//   }
// };

// exports.createMatch = async (req, res, db) => {
//   try {
//     const id = req.body.matchId;
//     const matchCollection = db.collection("matches");
//     const response = await matchCollection.doc(id).set(req.body);
//     res.send(response);
//   } catch (error) {
//     res.send(error);
//   }
// };

exports.deleteProduct = async (req, res, db) => {
  try {
    const id = req.params.id;
    const productCollection = db.collection("products");
    const response = await productCollection.doc(id).delete();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

// exports.getMatch = async (req, res, db) => {
//   const matchId = req.params.matchId;
//   const teamsRef = db
//     .collection("matches")
//     .where("matchId", "==", matchId || 0);
//   try {
//     teamsRef.get().then((snapshot) => {
//       const data = snapshot.docs.map((doc) => doc.data());
//       return res.status(200).json(data);
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ general: "Something went wrong, please try again" });
//   }
// };

// exports.getMatches = async (req, res, db) => {
//   const clientId = req.params.clientId;
//   const teamsRef = db
//     .collection("matches")
//     .where("clientId", "==", clientId || 0)
//     .orderBy("created", "desc");
//   try {
//     teamsRef.get().then((snapshot) => {
//       const data = snapshot.docs.map((doc) => doc.data());
//       return res.status(200).json(data);
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ general: "Something went wrong, please try again" });
//   }
// };

exports.updateProducts = async (req, res, db, admin) => {
  try {
    console.log(req.body);
    const products = req.body;
    const firestore = admin.firestore();
    const batch = firestore.batch();
    products.forEach((product) => {
      db.collection("products").doc(product.id).set(product);
    });
    // await setDoc(doc(db, "matches", scoreboard.matchId), data);
    // Commit the batch
    const response = await batch.commit();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
