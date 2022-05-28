const dimension = 6;
let initList = [];
let obstacleList;

var table = document.getElementById("table");
var child = table.getElementsByTagName("tr");

function generate() {
  console.log("Generate Astar Algorithms for Maz");

  initialization();

  const start = new Point(dimension - dimension, 1);
  const end = new Point(dimension - 1, dimension - 1);

  // Initialization du point de depart ainsi que du point d'arriver
  var start_point = child[start.y].getElementsByTagName("td");
  start_point[start.x].style.backgroundColor = "green";

  var end_point = child[end.y].getElementsByTagName("td");
  end_point[end.x].style.backgroundColor = "red";

  // Initialization des obstacles manuellement
  obstacleList = [initList[4][4], initList[4][2], initList[4][3], initList[2][1], initList[0][4], initList[0][2],];

  for (const obstacles of obstacleList) {
    var obstacle = child[obstacles.y].getElementsByTagName("td");
    obstacle[obstacles.x].style.backgroundColor = "black";
  }

  // Recherche des chemin
  let way = Astar(start, end);
  let pred = [];
  for (let i = way.length - 1; i >= 0; i--) {
    console.log(way[i].print());
  }
  // Afficher le chemin a suivre
  for (let i = way.length - 2; i > 0; i--) {
    if (way[i].getSuccessor().includes(way[i - 1])) {
      pred.push(way[i - 1]);
    }
  }
}

// Initialization des coordonneer
function initialization() {
  for (let i = 0; i < dimension; i++) {
    initList.push([]);
    for (let j = 0; j < dimension; j++) {
      initList[i].push(new Point(i, j));
    }
  }
}

// A* Algorithms 
function Astar(start = Point, end = Point) {
  let closedList = [];
  let openList = [start];
  while (openList.length != 0) {
    let tmp = openList;
    let x = tmp.sort((a, b) => (a.f - b.f) === 0 ? (a.h - b.h) : (a.f - b.f))[0];

    if (x !== start && (x.x != end.x || x.y != end.y)) {
      var away = child[x.y].getElementsByTagName("td");
      away[x.x].style.backgroundColor = "orange";
    }

    let pos = openList.indexOf(x);
    openList.splice(pos, 1);

    if (!closedList.includes(x)) {
      closedList.push(x);
    }

    if (x.x == end.x && x.y == end.y) return closedList;

    x.getSuccessor().forEach(i => {
      if (!closedList.includes(i) && !obstacleList.includes(i)) {
        i.g = x.g + 1;
        i.h = i.distanceH(end);
        openList.push(i);
      }
    });
  }
  return "No wah found";
}

class Point {
  g = 0;
  h = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceG(start = Point) {
    return Math.abs(start.x - this.x) + Math.abs(start.y - this.y);
  }

  distanceH(end = Point) {
    return Math.abs(this.x - end.x) + Math.abs(this.y - end.y);
  }

  get f() {
    return this.g + this.h;
  }

  getSuccessor() {
    let successor = [];

    if (this.x + 1 < dimension) successor.push(initList[this.x + 1][this.y]);
    if (this.y - 1 >= 0) successor.push(initList[this.x][this.y - 1]);
    if (this.y + 1 < dimension) successor.push(initList[this.x][this.y + 1]);
    if (this.x - 1 >= 0) successor.push(initList[this.x - 1][this.y]);

    return successor;
  }

  print() {
    console.log(`x:${this.x} y:${this.y} g:${this.g} h:${this.h} f:${this.f}`);
  }
}