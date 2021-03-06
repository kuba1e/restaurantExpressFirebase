const express = require("express");
const cors = require("cors");
const path = require("path");
const upload = require("./utils/multer");
const cloudinary = require("./utils/cloudinary");
const { Dishes, Waiters, Tables, Bills } = require("./config");
const PORT = process.env.PORT || 4000;

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

app.post("/tables", upload.single("tableImage"), async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      const imageRes = await cloudinary.uploader.upload(req.file.path);
      data.img = imageRes.secure_url;
      data.imgId = imageRes.public_id;
    }
    await Tables.add(data);
    res.status(200).send({ sended: "succesefull", ok: true });
  } catch (error) {
    res.status(400).send({ error: error.message, ok:false });
  }
});

app.post("/dishes", upload.single("dishImage"), async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      const imageRes = await cloudinary.uploader.upload(req.file.path);
      data.img = imageRes.secure_url;
    }
    await Dishes.add(data);

    res.send({ sended: "succesefull" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.post("/waiters", upload.single("waiterPhoto"), async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      const imageRes = await cloudinary.uploader.upload(req.file.path);
      data.img = imageRes.secure_url;
    }
    await Waiters.add(data);

    res.send({ sended: "succesefull" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.post("/bills", async (req, res) => {
  try {
    const data = req.body;
    await Bills.add(data);

    res.send({ sended: "succesefull" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.put("/dishes/:id", upload.single("dishImage"), async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      await cloudinary.uploader.destroy(req.body.imgId);
      const imageRes = await cloudinary.uploader.upload(req.file.path);
      data.img = imageRes.secure_url;
    }
    const id = req.params.id;
    await Dishes.doc(id).update({
      ...data,
    });

    res.send({ updated: "succesefull" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.put("/waiters/:id", upload.single("waiterPhoto"), async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      await cloudinary.uploader.destroy(req.body.imgId);
      const imageRes = await cloudinary.uploader.upload(req.file.path);
      data.img = imageRes.secure_url;
    }
    const id = req.params.id;
    await Waiters.doc(id).update({
      ...data,
    });

    res.send({ updated: "succesefull" });
  } catch (error) {
    res.status(400).send({ error: error.message });
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
    res.status(400).send({ error: error.message });
  }
});

app.put("/tables/:id", upload.single("tableImage"), async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      if(req.body.public_id){
        await cloudinary.uploader.destroy(req.body.imgId);
      }
      const imageRes = await cloudinary.uploader.upload(req.file.path);
      data.img = imageRes.secure_url;
      data.imgId = imageRes.public_id;
    }
    const id = req.params.id;
    await Tables.doc(id).update({
      ...data,
    });

    res.send({ updated: "succesefull", ok:true });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.delete("/dishes/:id", async (req, res) => {
  try {
    const data = req.body;
    await cloudinary.uploader.destroy(req.body.imgId);

    const id = req.params.id;
    await Dishes.doc(id).delete();

    res.send({ deleted: "succesefull" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.delete("/waiters/:id", async (req, res) => {
  try {
    const data = req.body;
    await cloudinary.uploader.destroy(req.body.imgId);

    const id = req.params.id;
    await Waiters.doc(id).delete();

    res.send({ deleted: "succesefull" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.delete("/bills/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await Bills.doc(id).delete();

    res.send({ deleted: "succesefull" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.delete("/tables/:id", async (req, res) => {
  try {
    const data = req.body;
    console.log(data)
    await cloudinary.uploader.destroy(data.imgId);
    const id = req.params.id;
    await Tables.doc(id).delete();

    res.send({ deleted: "succesefull", ok:true });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(PORT);
