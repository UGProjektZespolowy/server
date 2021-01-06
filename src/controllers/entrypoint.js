import express from "express";

const router = express.Router();
import {extract, extract_all} from "../db_connection.js";

router.get('/cs', ((req, res) => {
    extract('scrapperInf_result', {}).then(data => res.json(data));
}));

router.get('/mfi', ((req, res) => {
    extract('scrapperInf_result', {}).then(data => res.json(data));
}))

router.get('/search', (req, res) => {
    extract_all({
        $or: [
            {Title: {$regex: new RegExp(req.query.text, 'ig')}},
            // {Header: {$regex: new RegExp(req.query.text, 'ig')}},
            {News: {$regex: new RegExp(req.query.text, 'ig')}},
        ]
    }).then(data => res.json(data));
});

export default router;
