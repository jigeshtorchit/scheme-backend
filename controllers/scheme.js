const schemeaddRouter = require("./all-employee-deleted");
const schemeeditRouter = require("./all-employee-search");
const schemeviewRouter = require("./all-employee-upadated");
const schemedeleteRouter = require("./all-employee.view");

const schemeRouter = require("express").Router();




schemeRouter.use("/scheme-add",schemeaddRouter)
schemeRouter.use("/scheme-edit",schemeeditRouter)
schemeRouter.use("/scheme-view",schemeviewRouter)
schemeRouter.use("/scheme-delete",schemedeleteRouter)



module.exports=schemeRouter;