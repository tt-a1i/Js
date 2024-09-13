//对象的键（key）必须是字符串或 Symbol
//当你使用一个对象作为键时，JavaScript 会自动将其转换为字符串。
//默认情况下，对象的字符串表示形式是 "[object Object]"。
const a = {}

const b = {'key':123}

const c = {'key':456}

const d = {'key':789}

a[b] = 123

a[c] = 456

a[d] = 789

console.log(a[b]);