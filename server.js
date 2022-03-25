const express = require('express')
const cors = require('cors')
const {Users, Desks} = require('./config')
const PORT =  process.env.PORT || 3000

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create", async (req, res) => {
  try {
    const data = req.body
    await Users.add(data)
    await Desks.add(data)

    res.send({ sended: "succesefull" });
  } catch (error) {
    console.log(error)
  }
});

app.get("/", async (req, res) => {
  try {
   const data = await Users.get()

    res.send({ users: data.docs.map(doc=>{ return {id:doc.id
      ,...doc.data()
    }})});

  } catch( error) {
      console.log(error)
  }

});

app.listen(3000);
