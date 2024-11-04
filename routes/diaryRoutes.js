const express  = require('express');
const { createDiary, getDiaries, updateDiary, deleteDiary , getDiaryById } = require('../controllers/diaryControllers');

const auth = require('../middleware/authMiddleware');

const router  = express.Router();


router.post('/create' , auth , createDiary);
router.get('/' ,auth  ,getDiaries);
router.put('/:id' , auth  , updateDiary);
router.delete('/:id' , auth , deleteDiary);
router.get('/:id', getDiaryById); // Fetch diary by ID

module.exports  = router;