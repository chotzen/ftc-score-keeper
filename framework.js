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
