

/*要在 `localStorage` 中实现一个具有过期时间的缓存，可以通过存储对象附带元数据（比如一个过期时间戳）来实现。
下面是一个简单的实现示例，包含设置和获取缓存的功能：
*/

// 设置 缓存
function setCache(key, value, expirationInMinutes) {
  const now = new Date().getTime();
  const expirationTime = now + expirationInMinutes * 60 * 1000; // 计算过期时间
  const cacheEntry = {
    value: value,
    expirationTime: expirationTime
  };
  localStorage.setItem(key, JSON.stringify(cacheEntry));
}

// 获取 缓存
function getCache(key) {
  const cachedItem = localStorage.getItem(key);
  if (!cachedItem) {
    return null; // 返回 null 表示缓存中没有此项
  }

  const cacheEntry = JSON.parse(cachedItem);
  const now = new Date().getTime();

  if (now > cacheEntry.expirationTime) {
    localStorage.removeItem(key); // 移除过期项
    return null; // 返回 null 表示缓存已过期
  }

  return cacheEntry.value; // 返回缓存值
}

// 使用示例
// 设置缓存 "user123" 为 "John Doe"，有效期 10 分钟
setCache("user123", "John Doe", 10);

// 读取缓存
const userName = getCache("user123");
if (userName) {
  console.log("缓存获取", userName);
} else {
  console.log("缓存已过期或不存在");
}


/*说明：

1. **setCache 函数**：
   - 接受三个参数：键（`key`）、值（`value`）和过期时间（以分钟为单位）。
   - 计算当前时间和过期时间，并将其存储为一个对象，最终以字符串形式存储在 `localStorage` 中。

2. **getCache 函数**：
   - 获取存储的缓存并解析。
   - 检查当前时间是否超过缓存的过期时间。
   - 如果缓存已过期，则删除该项并返回 `null`；否则，返回存储的值。

这种方法使你可以在需要时轻松为 `localStorage` 里的缓存数据增加过期时间的控制。
*/