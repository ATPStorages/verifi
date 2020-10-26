const express = require("express"),
    app = express(),
    
    port = process.env.PORT || 3000;

// Middleware //

app.use(express.json());
app.use(require("compression")());

app.use("/verify", require(__dirname + "/verify"));

// Error Handler //

app.use((err, _req, res, _next)=> {
    res.status(err.status || 500)
        .json({ error: err.message });
});

// Server //

app.get("/", (req, res)=> {
    res.end(`verifi active @ ${req.get("host")}!`)
});

app.listen(port, ()=> {
    console.log(`Started verifi at port ${port}.`);
});