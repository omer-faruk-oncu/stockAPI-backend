"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const firm = require("../controllers/firm");

const permissions = require('../middlewares/permissions')

router.use(permissions.isLogin)

router.route("/").get(firm.list).post(firm.create);

router
  .route("/:id")
  .get(firm.read)
  .put(firm.update)
  .patch(firm.update)
  .delete(firm.delete);
/* ------------------------------------------------------- */
module.exports = router;

