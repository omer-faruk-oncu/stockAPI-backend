"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const brand = require("../controllers/brand");

const permissions = require('../middlewares/permissions')

router.use(permissions.isLogin)

router.route("/").get(brand.list).post(brand.create);

router
  .route("/:id")
  .get(brand.read)
  .put(brand.update)
  .patch(brand.update)
  .delete(brand.delete);
/* ------------------------------------------------------- */
module.exports = router;

