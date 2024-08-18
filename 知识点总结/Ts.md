## TypeScript中type和interface的区别

在 TypeScript 中，`type` 和 `interface` 用于定义自定义类型，但它们有一些重要的区别和各自的使用场景。以下是它们的主要区别和使用示例：

### 1. 定义基本类型（Type）

`type` 是定义类型别名的一种方式，可以用于更复杂的联合类型、交叉类型等。此外，`type` 可以定义原始类型的别名。

```typescript
// 定义基本类型别名
type StringAlias = string;
type NumberAlias = number;

// 定义联合类型
type StringOrNumber = string | number;

// 定义复合结构
type Point = {
    x: number;
    y: number;
};

// 使用联合类型和交叉类型
type ID = string | number;

type Name = {
    firstName: string;
    lastName: string;
};

type IdentifiedPerson = Name & {
    id: ID;
};

const person: IdentifiedPerson = {
    id: 123,
    firstName: "John",
    lastName: "Doe"
};
```

### 2. 定义接口（Interface）

`interface` 用于声明对象的结构，在面对对象编程中非常常见，尤其是在定义类的类型时。此外，`interface` 还可以进行扩展（extend）和实现（implements）。

```typescript
interface Point {
    x: number;
    y: number;
}

interface Person {
    firstName: string;
    lastName: string;
}

// 继承接口
interface IdentifiedPerson extends Person {
    id: string | number;
}

const person: IdentifiedPerson = {
    id: 123,
    firstName: "John",
    lastName: "Doe"
};
```

### 3. 扩展和合并

`interface` 支持声明合并，可以在多个地方声明相同名字的接口，TypeScript 会自动合并它们。这在一些库中（如 React）非常有用。

```typescript
interface A {
    x: number;
}

interface A {
    y: number;
}

const obj: A = {
    x: 1,
    y: 2
};
```

相较之下，`type` 不能进行声明合并。

### 4. 类和接口

`interface` 常用于定义类的结构，并可以通过 `implements` 关键字来实现接口。

```typescript
interface Person {
    firstName: string;
    lastName: string;
    getFullName(): string;
}

class User implements Person {
    constructor(public firstName: string, public lastName: string) {}

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

const user = new User("John", "Doe");
console.log(user.getFullName()); // John Doe
```

### 5. 高级类型

`type` 支持更多复杂类型的操作，比如条件类型、映射类型等。

```typescript
type ReadonlyPoint = Readonly<Point>;
type PartialPoint = Partial<Point>;
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

### 总结

- **相同点**：
  - 都可以用来定义对象结构。
  - 都可以扩展 `extends`。

- **不同点**：
  - `interface` 可以进行声明合并，而 `type` 不行。
  - `interface` 常用于定义类的结构并可以用 `implements` 关键字来实现接口，而 `type` 主要用于类型别名，更适合复杂类型定义，如联合类型和交叉类型。
  - `type` 支持一些更高级的类型操作，如条件类型、映射类型等。

根据具体需求选择 `type` 或 `interface`，在需要对象结构定义或标准类实现时，倾向于使用 `interface`；在需要灵活且复杂类型操作时，使用 `type`。