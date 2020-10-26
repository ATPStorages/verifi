const router = require("express").Router(),
    enmap = require("enmap"),

    tokens = new enmap({ name: "tokens", dataDir: __dirname + "/../database" });

router.post("/settoken", async(req, res, next)=> {
    if((isNaN(req.query.discid) || isNaN(req.query.rblxid)) || !req.query.tag)
        return next({status: 400, message: "provide discord and roblox id with tag (example#0000) in query"});
    else if(tokens.get(req.query.rblxid))
        return next({status: 403, message: "verification token already exists"});

    tokens.set(req.query.rblxid, { id: req.query.discid, tag: req.query.tag });
    res.json({"database_key": req.query.rblxid});
});

router.get("/gettoken/:rblxid", async(req, res, next)=> {
    if(isNaN(req.params.rblxid))
        return next({status: 400, message: "provide valid roblox id"});
    
    let discid = await tokens.get(req.params.rblxid);
    if(!discid) return next({status: 404, message: "unable to find specified id in database"});
    else res.json({"discord-id": discid});
});

router.delete("/unlinktoken/:rblxid", async(req, res, next)=> {
    if(isNaN(req.params.rblxid))
        return next({status: 400, message: "provide valid roblox id"});

    let discid = await tokens.get(req.params.rblxid);
    if(!discid) return next({status: 404, message: "unable to find specified id in database"});
    else {
        tokens.delete(req.params.rblxid);
        res.json({"discord-id": discid});
    }
});

router.all("/test", (req, res)=> {
    res.end(`Controller "verify" - Router online, and using ${req.protocol}.`);
});

module.exports = router;