/*判断有向图是否存在环
输入为邻接矩阵
如
let graph = {
    A: ['B', 'C'],
    B: ['D'],
    C: ['D'],
    D: ['A'],
};
A -> B -> D -> A 有环
*/
function hasCycle(graph) {
    const visited = {}; // 节点的访问状态

    // 初始化所有节点为未访问
    for (let node in graph) {
        visited[node] = 'unvisited';
    }

    // 对每个节点进行DFS
    for (let node in graph) {
        if (visited[node] === 'unvisited') {
            if (dfs(node, visited, graph)) {
                return true; // 如果发现环，返回true
            }
        }
    }
    return false; // 没有发现环，返回false
}

function dfs(node, visited, graph) {
    visited[node] = 'visiting'; // 标记为正在访问

    for (let neighbor of graph[node] || []) {
        if (visited[neighbor] === 'unvisited') {
            if (dfs(neighbor, visited, graph)) {
                return true;
            }
        } else if (visited[neighbor] === 'visiting') {
            // 如果邻接节点正在访问，说明存在环
            return true;
        }
    }

    visited[node] = 'visited'; // 标记为已访问
    return false;
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
