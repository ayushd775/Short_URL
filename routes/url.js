const express= require('express');
const {handleGenerateNewShortURL,handleGetRedirect,handleGetAnalytics}= require('../controller/url');

const router= express.Router();

router.post('/',handleGenerateNewShortURL);
router.get('/redirect/:shortID',handleGetRedirect)
router.get('/analytics/:shortID',handleGetAnalytics);
// router.get('/test',handleGetTest);

module.exports= router;