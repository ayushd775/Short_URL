const express= require('express');
const {handleGenerateNewShortURL,handleGetRedirect,handleGetAnalytics}= require('../controller/url');

const router= express.Router();

router.post('/',handleGenerateNewShortURL);
router.get('/:shortID',handleGetRedirect)
router.get('/analytics/:shortID',handleGetAnalytics);

module.exports= router;