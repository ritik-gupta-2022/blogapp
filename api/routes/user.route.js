import  express  from "express";
import {test , getUsers,updateUser,deleteUser,signout, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/test" , test);

// to update db, when verfiyToken validator will got successfull then updateUser will run
router.put("/update/:userId",verifyToken, updateUser);

//delete account route
router.delete("/delete/:userId",verifyToken, deleteUser);

//signout
router.post("/signout", signout);

// get users data
router.get("/getusers", verifyToken, getUsers)

//getting single user data
router.get("/:userId", getUser)

// default keyword allows us to change the name of router in importing file
export default router

// router.put() is commonly used in the context of RESTful APIs to handle HTTP PUT requests. PUT requests are typically used to update an existing resource or create a new resource if it does not exist.
// req.params.id retrieves the ID from the request URL.
// req.body contains the data sent in the PUT request to update or create the item.