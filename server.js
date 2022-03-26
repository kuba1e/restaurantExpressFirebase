const express = require("express");
const cors = require("cors");
const path = require("path");
const { Dishes, Waiters, Tables, Bills } = require("./config");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

//app.use(express.static(path.join(__dirname, "/restaurant/build")));

/*
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/restaurant/build", "index.html"));
});
*/

app.get("/waiters", async (req, res) => {
  try {
    const data = await Waiters.get();
    res.send({
      data: data.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      }),
    });
  } catch (error) {
    res.status(400).send({
      message: "failed to get waiters"
    })
  }
});

app.get("/dishes", async (req, res) => {
  try {
    const data = await Dishes.get();
    res.send({
      data: data.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      }),
    });
  } catch (error) {
    res.status(400).send({
      message: "failed to get dishes"
    })
  }
});

app.get("/tables", async (req, res) => {
  try {
    const data = await Tables.get();
    res.send
    ({
      data: data.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      }),
    });
  } catch (error) {
    res.status(400).json({
      message: "failed to get tables"
    })
  }
});

app.get("/bills", async (req, res) => {
  try {
    const data = await Bills.get();
    res.send({
      data: data.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      }),
    });
  } catch (error) {
    res.status(400).send({
      message: "failed to get dishes"
    })
  }
});


app.post("/create", async (req, res) => {
  try {
    const data = req.body;
    await Users.add(data);
    await Desks.add(data);

    res.send({ sended: "succesefull" });
  } catch (error) {
    console.log(error);
  }
});


app.listen(PORT);
