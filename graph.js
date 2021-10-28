class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach((vertex) => this.nodes.add(vertex));
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    vertex.adjacent.forEach((neighbor) => neighbor.adjacent.delete(vertex));
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let seen = new Set();
    let result = [];

    function delve(node) {
      result.push(node.value);
      seen.add(node);

      node.adjacent.forEach((adjacent) => {
        if (seen.has(adjacent)) return;
        delve(adjacent);
      });
    }

    delve(start);
    console.log(result);
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let seen = new Set();
    let result = [];
    const queue = [start];
    let node;
    //This one enqueues them first before actually visiting them. It visits them in the order they were seen instead of hopping around everywhere.
    seen.add(start);

    while (queue.length) {
      node = queue.shift();
      result.push(node.value);

      node.adjacent.forEach((adjacent) => {
        if (!seen.has(adjacent)) {
          seen.add(adjacent);
          queue.push(adjacent);
        }
      });
    }

    console.log(result);
    return result;
  }
}

module.exports = { Graph, Node };
