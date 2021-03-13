const express = require('express')
const authMiddleware = require('../middleware/authMiddleware.js');
const limiter = require('../middleware/rateLimit.js').limiter;
const logger = require('../lib/winston.js').logger;

const router = express.Router();


const mongodb = require('../Database/mongodb.js');
const ObjectId = require('mongodb').ObjectID;

router.get('/', limiter, (req, res) => {
    logger.info('User Get!');
    res.status(200).json({
        status: 'success',
        method: 'GET',
        id: req.params.id
    })
})

// ตัวอย่าง Router Auth0 ใช้ Middleware 
// JWT Token สำหรับทดสอบ : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.zMSpbN2Jd9FMHq6ZX5LXiivnTsJDjQLwnk6PzdU4Q58
router.post('/', authMiddleware.requireJWTAuth, (req, res) => {

    logger.info('User Post!');
    res.status(200).json({
        status: 'Success',
        method: 'POST'
    })
})

// ตัวอย่าง Router GET ส่ง Params ID และ Query ข้อมูลจาก Database
router.get('/:id', async (req, res) => {
    try {
        // รับค่า Params id
        const id = req.params.id

        // Collection MongoDB
        const collection = 'users';
        
        const users = await mongodb.connect(collection);
        const rs = await users.findOne({_id: new ObjectId(id)});
        res.status(200).json({
            status: 'Success',
            method: 'GET ID',
            result: rs
        })
    } catch (err) {
        logger.error(err);
    }
})

router.put('/', (req, res) => {
    res.status(200).json({
        status: 'Success',
        method: 'PUT'
    })
})

router.patch('/', (req, res) => {
    res.status(200).json({
        status: 'Success',
        method: 'PATCH'
    })
})

router.delete('/', (req, res) => {
    res.status(200).json({
        status: 'Success',
        method: 'DELETE'
    })
})

module.exports = router