const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const db = require("./models");
const controller = require('./controllers/tutorial.controller');
const Role = db.role;

const run = async () => {
    const tut1 = await controller.createTutorial({
        title: "Tut#1",
        description: "Tut#1 Description",
      });
     
      
      const tut2 = await controller.createTutorial({
        title: "Tut#2",
        description: "Tut#2 Description",
      });
     
    
      
      const comment1 = await controller.createComment(tut1.id, {
        name: "bezkoder",
        text: "Good job!",
      });
      
      await controller.createComment(tut1.id, {
        name: "zkoder",
        text: "One of the best tuts!",
      });
     
      
      const comment2 = await controller.createComment(tut2.id, {
        name: "aKoder",
        text: "Hi, thank you!",
      });
     
      await controller.createComment(tut2.id, {
        name: "anotherKoder",
        text: "Awesome tut!",
      });
    
     
      
      const tut1Data = await controller.findTutorialById(tut1.id);
      console.log(
        ">> Tutorial id=" + tut1Data.id,
        JSON.stringify(tut1Data, null, 2)
      );
     
      
      const tut2Data = await controller.findTutorialById(tut2.id);
      console.log(
        ">> Tutorial id=" + tut2Data.id,
        JSON.stringify(tut2Data, null, 2)
      );
     
      
      
      
      const comment1Data = await controller.findCommentById(comment1.id);
      console.log(
        ">> Comment id=" + comment1.id,
        JSON.stringify(comment1Data, null, 2)
      );
     
      
      const comment2Data = await controller.findCommentById(comment2.id);
      console.log(
        ">> Comment id=" + comment2.id,
        JSON.stringify(comment2Data, null, 2)
      );
     
      
      const tutorials = await controller.findAll();
      console.log(">> All tutorials", JSON.stringify(tutorials, null, 2));
      
      
      
};

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    run();
    initial();
  });

  function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }

  require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
