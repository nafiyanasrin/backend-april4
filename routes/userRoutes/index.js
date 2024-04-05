const express = require('express');
const router = express();

const { loginUserCntrl, registerUserCntrl, getAllUser, updateForget } = require('../../controller/userController/user');


router.use(express.json());



router.post('/login', loginUserCntrl);
router.post('/register', registerUserCntrl);
router.get('/user', getAllUser);
router.post('/forget', updateForget)

module.exports = router;