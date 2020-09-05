const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const { request } = require("express");

const app = express();
const db = require('./utils/database');

db.execute('SELECT * FROM   greenhouses').then((result) =>{ console.log(result[0]);
}).catch(err => console.log(err));
;

// app.use(express.json({ extended: true }));
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb'}));

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/greenhouses", require("./routes/greenhouses.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => console.log(`has been started on port ${PORT}`));
  } catch (error) {
    console.log("Server error", error.message);
    process.exit(1);
  }
}

start();
