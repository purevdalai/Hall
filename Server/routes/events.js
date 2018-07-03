var express = require('express');
var router = express.Router();

var filePath = './storage/sport_hall.json';

/**
 * get Events
 */
router.get('/event', function (req, res, next) {
  var fs = require('fs');
  fs.readFile(filePath, "UTF-8", function (err, data) {
    if (err)
      return res.send(err);
    res.send(data);
  });
});

/**
 * @param req json data
 * @description req irsen ogogdliig json convert hgd filePath dah file-uudiig unshin 
 * suuld irsen event-g nemj dahin darj bichne. 
 */

router.post('/push', function (req, res, next) {
  var fs = require('fs');
  var event = JSON.stringify(req.body.event);

  fs.readFile(filePath, function (err, data) {
    var json = JSON.parse(data);
    event = JSON.parse(event);
    json.push(event);
    fs.writeFileSync(filePath, JSON.stringify(json));
  });
});

router.post('/delete', function (req, res, next) {
  var fs = require('fs');
  var event = JSON.stringify(req.body.event);

  fs.readFile(filePath, function (err, data) {
    var json = JSON.parse(data);
    event = JSON.parse(event);
    var index = getIndex(json, event);
    if(index >= 0) {
      json.splice(index, index);
      fs.writeFileSync(filePath, JSON.stringify(json));
    } 
  });

});

router.post('/edit' , function(req, res, next){
    var fs = require('fs');
    var event = JSON.stringify(req.body.event);

    fs.readFile(filePath, function (err, data) {
      var json = JSON.parse(data);
      event = JSON.parse(event);
      var index = getIndex(json, event);
      if(index >= 0) {
        json[index] = event;
        fs.writeFileSync(filePath, JSON.stringify(json));
      } 
    });
});

function getIndex(events, event) {
  var index = -1;
  for (var i = 0; i < events.length; i++) {
    if (
        events[i].name == event.name && 
        events[i].phone == event.phone
    ) {
      index = i;
      break;
    }
  }
  return index;
}

module.exports = router;