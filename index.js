const express = require("express"),
    app = express(),
    
    port = process.env.PORT || 3000;

app.use(express.json());
app.use(require("helmet")());
app.use(require("compression")());

app.use("/verify", require(__dirname + "/verify"));

app.use((err, _req, res, _next)=> {
    res.status(err.status || 500)
        .json({ error: err.message });
});

app.listen(port, ()=> {
    console.log(`Started verifi at port ${port}.`);
});