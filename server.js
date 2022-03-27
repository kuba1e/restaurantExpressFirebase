const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const { Dishes, Waiters, Tables, Bills } = require("./config");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

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
      message: "failed to get waiters",
    });
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
      message: "failed to get dishes",
    });
  }
});

app.get("/tables", async (req, res) => {
  try {
    const data = await Tables.get();
    res.send({
      data: data.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      }),
    });
  } catch (error) {
    res.status(400).json({
      message: "failed to get tables",
    });
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
      message: "failed to get dishes",
    });
  }
});

app.post("/tables", async (req, res) => {
  try {
    const data = req.body;
    await Tables.add(data);

    res.send({ sended: "succesefull" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/dishes", async (req, res) => {
  try {
    const data = req.body;
    await Dishes.add(data);

    res.send({ sended: "succesefull" });
  } catch (error) {
    console.log(error);
  }
});
app.post("/waiters", async (req, res) => {
  try {
    const data = req.body;
    await Waiters.add(data);

    res.send({ sended: "succesefull" });
  } catch (error) {
    console.log(error);
  }
});
app.post("/bills", async (req, res) => {
  try {
    const data = req.body;
    await Bills.add(data);

    res.send({ sended: "succesefull" });
  } catch (error) {
    console.log(error);
  }
});

app.put("/dishes/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await Dishes.doc(id).update({
      ...data,
    });

    res.send({ updated: "succesefull" });
  } catch (error) {
    console.log(error);
  }
});
app.put("/waiters/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await Waiters.doc(id).update({
      ...data,
    });

    res.send({ updated: "succesefull" });
  } catch (error) {
    console.log(error);
  }
});
app.put("/bills/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await Bills.doc(id).update({
      ...data,
    });

    res.send({ updated: "succesefull" });
  } catch (error) {
    console.log(error);
  }
});

app.put("/tables/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await Tables.doc(id).update({
      ...data,
    });

    res.send({ updated: "succesefull" });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/dishes/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await Dishes.doc(id).delete();

    res.send({ deleted: "succesefull" });
  } catch (error) {
    console.log(error);
  }
});
app.delete("/waiters/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await Waiters.doc(id).delete();

    res.send({ deleted: "succesefull" });
  } catch (error) {
    console.log(error);
  }
});
app.delete("/bills/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await Bills.doc(id).delete();

    res.send({ deleted: "succesefull" });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/tables/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await Tables.doc(id).delete();

    res.send({ deleted: "succesefull" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT);
