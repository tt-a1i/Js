function hasCycle(graph) {
    const visited = {};
    for(let node in graph){
        visited[node] = 'unvisited'
    }
    for(let node in graph){
        if(visited[node] === 'unvisited'){
            if(dfs(node, visited, graph)){
                return true
            }
        }
    }
    return false
}
function dfs(node, visited, graph){
    visited[node] = 'visiting'
    for(let neighbor of graph[node] || []){
        if(visited[neighbor] === 'unvisited'){
            if(dfs(graph[neighbor], visited, graph)){
                return true
            }
        }else if(visited[neighbor] === 'visiting'){
            return true
        }
    }
    visited[node] = 'visited'
    return false
}
let graph1 = {
    A: ['B', 'C'],
    B: ['D'],
    C: ['D'],
    D: ['A'], // D指向A，构成环
};
let graph2 = {
    A: ['C', 'D'],
    B: ['D'],
    C: [],
    D: [],
};
console.log(hasCycle(graph1)); // 输出: true
console.log(hasCycle(graph2));
