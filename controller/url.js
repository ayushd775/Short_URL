const shortid= require("shortid");
const URL= require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body= req.body;
    if(!body.url) return res.status(400).json({error:"url not given"})
    const shortID= shortid();

    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory:[],
        createdBy: req.user._id,
    })

    return res.render('home',{
        id: shortID,
    })
    // return res.json({id: shortID});
}

async function handleGetRedirect(req,res){
    const shortID= req.params.shortID;
    const entry= await URL.findOneAndUpdate(
        {
            shortID,
        },
        {
            $push:{
                visitHistory:{
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req,res) {
    const shortID= req.params.shortID;
    if(!req.params.shortID) return res.status(400).json({error: "url not given"})

    const analytics= await URL.findOne(
        {
            shortID,
        }
    )
    return res.json(
        {
            "Clicks": analytics.visitHistory.length,
            "analytics": analytics.visitHistory,
        })
}


module.exports= {
    handleGenerateNewShortURL,
    handleGetRedirect,
    handleGetAnalytics,
}