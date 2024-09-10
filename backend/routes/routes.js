const express = require('express')
const router = express.Router()
const {newDraw,getAllDrawings,getDrawingbyId,updateDrawing,deleteDrawing} = require('../controller/controller')

router.post('/newdraw', newDraw)
router.get('/getall', getAllDrawings)
router.get('/getdrawing/:id', getDrawingbyId)
router.put('/updatedrawing/:id', updateDrawing)
router.delete('/deletedrawing/:id', deleteDrawing)

module.exports = router