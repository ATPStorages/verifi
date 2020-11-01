const router = require("express").Router(),
    enmap = require("enmap"),

    tokens = new enmap({ name: "tokens", dataDir: __dirname + "/../database" });

router.get("/tokens/:rblxid", async(req, res, next)=> {
    if(isNaN(req.params.rblxid))
        return next({status: 400, message: "provide valid roblox id"});
    
    let discid = await tokens.get(req.params.rblxid);
    if(!discid) return next({status: 404, message: "unable to find specified id in database"});
    else return res.json(discid);
});

router.post("/tokens", async(req, res, next)=> {
    if((isNaN(req.query.discid) || isNaN(req.query.rblxid)) || !req.query.tag)
        return next({status: 400, message: "provide discord and roblox id with tag (example#0000) in query"});
    else if(tokens.has(req.query.rblxid))
        return next({status: 403, message: "verification token already exists"});

    tokens.set(req.query.rblxid, { id: req.query.discid, tag: req.query.tag, verified: false });
    res.json({"database_key": req.query.rblxid});
});

router.put("/tokens/:rblxid(\\d+)?", async(req, res, next)=> {
    if(isNaN(req.params.rblxid) || typeof(req.query.verified) != "string")
        return next({status: 400, message: "provide valid roblox id and verified value"});

    let discid = tokens.has(req.params.rblxid);
    if(!discid) return next({status: 404, message: "unable to find specified id in database"});
    else {
        tokens.set(req.params.rblxid, req.query.verified == "true", "verified");
        return res.json(await tokens.get(req.params.rblxid));
    }
});

router.delete("/tokens/:rblxid(\\d+)?", async(req, res, next)=> {
    if(isNaN(req.params.rblxid))
        return next({status: 400, message: "provide valid roblox id"});

    let discid = tokens.has(req.params.rblxid);
    if(!discid) return next({status: 404, message: "unable to find specified id in database"});
    else {
        tokens.delete(req.params.rblxid);
        return res.json({"success": true});
    }
});

router.all("/test", (req, res)=> {
    res.end(`running using ${req.protocol}.`);
});

module.exports = router;
