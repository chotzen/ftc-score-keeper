var teamslist = [];

function Team(number) {
  this.number = number;
  this.matches = [];
  this.sortedmatches = [];

  this.addMatch = function(match) {
    this.matches.push(match);
    this.sortedmatches.push(match);
    this.sortedmatches.sort(function(a, b) {
      if (!(a.qp === b.qp)) {
        return b.qp-a.qp;
      } else {
        return b.rp-a.rp;
      }
    })
  }
  this.qp = function() {
    var qp = 0;
    for (var i = 0; i < this.matches.length; i++) {
      qp += parseInt(this.matches[i].qp);
    }
    return qp;
  }
  this.rp = function() {
    var rp = 0;
    for (var i = 0; i < matches.length; i++) {
      rp += parseInt(this.matches[i].rp);
    }
    return rp;
  }
}

function Match(qp, rp) {
  if (qp === 0) {
    this.status = "L";
  } else if (qp === 1) {
    this.status = "T";
  } else if (qp === 2) {
    this.status = "W";
  }
  this.qp = qp;
  this.rp = rp;
}

var fileInput = document.getElementById("fileinput")

function loadData() {
  var file = fileInput.files[0];
  if (file === undefined) {
    console.log("No file found")
    return;
  }
  var reader = new FileReader();

  reader.onload = function(e) {
    objlist = JSON.parse(reader.result);
    console.log(objlist);
    for (var m=0; m < objlist.length; m++) {
      var o = objlist[m];
      var t = new Team(o.number);
      t.matches = o.matches;
      t.sortedmatches = o.sortedmatches;
      teamslist.push(t);
    }
  }

  reader.readAsText(file);
}

function saveData() {

    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(teamslist)));
    pom.setAttribute('download', "matchdata.json");

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
    document.getElementById("fileinput").value = null;
}

document.getElementById("submit").addEventListener("click", function() {
  if (teamslist.length === 0) {
    loadData();
  }
  setTimeout(function() {
    addData();
  }, 200)
})

var red1 = document.getElementById("red1");
var red2 = document.getElementById("red2");
var blue1 = document.getElementById("blue1");
var blue2 = document.getElementById("blue2");

var redmain = document.getElementById("redmain");
var redpenalty = document.getElementById("redpenalty");
var bluemain = document.getElementById("bluemain");
var bluepenalty = document.getElementById("bluepenalty");


function addData() {

  console.log("started");
  var r1, r2, b1, b2;
  var redscore = redmain.value + redpenalty.value;
  var bluescore = bluemain.value + bluepenalty.value;
  var redQP, blueQP, matchRP;
  if (redscore > bluescore) {
    redQP = 2;
    blueQP = 0;
  } else if (redscore < bluescore){
    redQP = 0;
    blueQP = 2;
    matchRP = parseInt(redmain.value);
  } else {
    redQP = 1;
    blueQP = 1;
  }

  matchRP = Math.min(redmain.value, bluemain.value);

  var redmatch = new Match(redQP, matchRP);
  var bluematch = new Match(blueQP, matchRP);

  r1 = findTeam(red1.value);
  if (r1 === undefined) {
    r1 = new Team(parseInt(red1.value));
    teamslist.push(r1);
  }
  r1.addMatch(redmatch);

  r2 = findTeam(red2.value);
  if (r2 === undefined) {
    r2 = new Team(parseInt(red2.value));
    teamslist.push(r2);
  }
  r2.addMatch(redmatch);

  b1 = findTeam(blue1.value);
  if (b1 === undefined) {
    b1 = new Team(parseInt(blue1.value));
    teamslist.push(b1);
  }
  b1.addMatch(bluematch);

  b2 = findTeam(blue2.value);
  if (b2 === undefined) {
    b2 = new Team(parseInt(blue2.value));
    teamslist.push(b2);
  }
  b2.addMatch(bluematch);

  saveData();
  console.log(teamslist);
}

function findTeam(number) {
  var team = undefined;
  for (var i = 0; i < teamslist.length; i++) {
    if (teamslist[i].number == number) {
      team = teamslist[i];
    }
  }
  return team;
}

function equalsNum(element) {
  return element.number === gnum;
}
