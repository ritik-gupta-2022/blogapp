import  express  from "express";
import  {signup, signin, google}  from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);


// default keyword allows us to change the name of router in importing file
export default router





// POST is designed for submitting data to the server. When a user signs in, they are submitting their credentials (e.g., username and password) to be authenticated by the server.
// POST requests send data in the request body, which is not visible in the URL, providing better security for sensitive information.
// GET requests are meant for retrieving data without causing any side effects.
// POST requests are used to perform actions that may result in changes on the server, such as authentication and session creation.