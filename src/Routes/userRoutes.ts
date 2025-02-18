import express from 'express'
import tryCatch from '../utils/tryCatch'
import { addDetails, blockUser, getallTokenByUser, getblockedUsers, getDetails, getUserById, getUsers } from '../Controller/User Controllers/userController'
import { adminAuth, userAuth } from '../Middleware/authMiddleware'
import { getRequestbyuser, makeRequest, removeRequest, updaterequest } from '../Controller/User Controllers/userEquipmentController'
import { getAllEquipments, getEquipmentBYId } from '../Controller/Admin controllers/equipmentControllers'
import { generateReport, getReportbyid, } from '../Controller/User Controllers/reportControll'
import { validateData } from '../Middleware/zodValidation'
import { tokenValidationSchema } from '../Models/Validations/tokenValidation'
import { gettokenNumber } from '../Controller/Admin controllers/doctorControll'
import { editTokenStatus, getallTokens } from '../Controller/User Controllers/doctorController'
import { getmsgusr, msgtodr, newMessages } from '../Controller/Admin controllers/adminController'
import { getmessagedusers, getmsgs, postchat } from '../Controller/User Controllers/messagecontroller'

const userRoutes = express.Router()

userRoutes

    .get('/getUsers', tryCatch(getUsers))
    .get('/getUserById/:id', adminAuth, tryCatch(getUserById))
    .get('/getblockedUsers', tryCatch(getblockedUsers))
    .post('/blockUser/:_id', tryCatch(blockUser))
    .post('/addrequest', userAuth, tryCatch(makeRequest))
    .get('/userrequest', userAuth, tryCatch(getRequestbyuser))
    .delete('/deleterequest/:equipment', userAuth, tryCatch(removeRequest))
    .get('/getallequipment', userAuth, tryCatch(getAllEquipments))
    .post("/addDetails/:id", userAuth, tryCatch(addDetails))
    .get("/getdetails/:id", tryCatch(getDetails))
    .post("/generatereport", tryCatch(generateReport))
    .get("/getreportof/:id", tryCatch(getReportbyid))
    .get('/getequipmentbyid/:id', userAuth, tryCatch(getEquipmentBYId))
    .put('/cancellrequest/:id', userAuth, tryCatch(updaterequest))
    .post("/sendmessage", tryCatch(newMessages))
    .post("/sendmsgtodr", tryCatch(msgtodr))
    .get("/getusermsg", tryCatch(getmsgusr))
    .post("/sendmsg", tryCatch(postchat))
    .get("/messageof/:userId/:receiverId", tryCatch(getmsgs))
    .get("/msgof/:doctorId", tryCatch(getmessagedusers))
    .post('/createtoken', userAuth, validateData(tokenValidationSchema), tryCatch(createToken))
    .get("/gettokenperday/:id", userAuth, tryCatch(gettokenNumber))
    .get("/getalltokens/:id",userAuth,tryCatch(getallTokens))
    .get("/getalltoken", userAuth, tryCatch(getallTokenByUser))
    .put("/canceltoken/:id", userAuth, tryCatch(editTokenStatus))

export default userRoutes;

