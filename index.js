const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.listen(8000,err => {
  if (err) {
    return console.log(err);
  }else {
    console.log('Listening on port 8000');
  }
});
