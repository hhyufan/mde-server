# 委托与Lambda

#### 1. 委托基础

##### 1.1 什么是委托

`委托`（`delegate`）是 C# 里 `类型安全` 的 `函数指针`：它把 `方法` 当作值保存、传递和调用。

- **本质**：引用类型，内部保存方法引用和 `调用列表`
- **类型安全**：参数类型、参数个数、返回值必须与声明完全匹配
- **解耦**：调用方只依赖 `签名`，不关心具体是哪个方法

使用委托分三步：`声明委托类型` → `创建委托实例` → `调用`。

##### 1.2 声明、实例化与调用

```csharp
// 用自定义委托类型保存"算法"
Calculator add = new Calculator(Add);   // 指向静态方法
Calculator sub = Sub;                   // 方法组转换，最常用
Calculator mul = (a, b) => a * b;       // Lambda

Console.WriteLine(add(3, 4));           // 7，调用可省略 Invoke
Console.WriteLine(sub(9, 4));           // 5
Console.WriteLine(mul(3, 4));           // 12
Console.WriteLine(add.Invoke(1, 2));    // 3，等价写法

static int Add(int a, int b) => a + b;
static int Sub(int a, int b) => a - b;

// 委托类型声明：两个 int 进，一个 int 出
delegate int Calculator(int a, int b);
```

- 可以指向 `静态方法`、`实例方法`、`另一个委托`
- 委托不可变：`+=` 生成新委托，不修改原实例
- 可作参数、字段、返回值，是回调和事件的基础

> **注意**：`ref`/`out` 参数、可选参数、返回值类型都参与签名匹配，不匹配直接编译报错。

##### 1.3 内置委托：Action、Func、Predicate

| 委托 | 签名 | 典型用途 |
|------|------|----------|
| `Action` | `void ()` | 无参、无返回值 |
| `Action<T1,T2>` | `void (T1,T2)` | 最多支持 16 个参数 |
| `Func<TResult>` | `TResult ()` | 有返回值 |
| `Func<T,TResult>` | `TResult (T)` | 转换、映射、查询条件 |
| `Predicate<T>` | `bool (T)` | 条件判断 |

```csharp
Action<string> log = message => Console.WriteLine($"[LOG] {message}");
Func<int, int, int> max = Math.Max;
Predicate<int> isEven = n => n % 2 == 0;

log("开始处理");
Console.WriteLine(max(3, 9));       // 9
Console.WriteLine(isEven(10));      // True

// 把"行为"作为参数传入
PrintIf(7, isEven);

static void PrintIf(int value, Predicate<int> condition)
    => Console.WriteLine(condition(value) ? $"{value} 满足条件" : "不满足");
```

> **性能提示**：`Action`/`Func` 是内置泛型委托，避免为每个签名自定义委托类型；高频路径可复用同一个委托实例。

#### 2. 多播委托

##### 2.1 += 与 -=

一个委托可以挂多个方法，称为 `多播委托`，调用时按 `添加顺序` 依次执行。

```csharp
Func<int> answer = () => 1;
answer += () => 2;
answer += () => 3;
Console.WriteLine(answer());                          // 3，只返回最后一个结果
Console.WriteLine(answer.GetInvocationList().Length); // 3，调用列表长度

Action notify = () => Console.WriteLine("邮件");
Action sms = () => Console.WriteLine("短信");
notify += sms;
notify += () => Console.WriteLine("站内信");
notify();                                             // 邮件、短信、站内信

notify -= sms;
notify();                                             // 邮件、站内信
```

- `+=` 追加，`-=` 移除 `最后一个匹配` 的委托
- 有返回值的多播委托，只能拿到 `最后一个` 方法的返回值
- 用 `GetInvocationList()` 可以手动逐个调用并收集所有返回值
- 中间某个方法抛异常，后面的方法 `不会执行`

> **注意**：`-=` 对匿名 lambda 通常无效，因为每次 lambda 都是新的委托实例；要能移除，就把委托存进变量，或改用具名方法。

#### 3. 匿名方法与 Lambda

##### 3.1 匿名方法

`匿名方法`（C# 2）用 `delegate` 关键字内联写方法体，省去单独命名的方法。

```csharp
int factor = 3;

Func<int, int> triple = delegate (int x)
{
    return x * factor;              // 可直接使用外层变量
};

// 省略参数列表：适合"不关心参数"的回调
Action<int> ignore = delegate { Console.WriteLine("忽略参数"); };

Console.WriteLine(triple(5));       // 15
ignore(42);
```

- 省略参数列表时能转成任意签名的委托，但拿不到参数；匿名方法支持 `ref`/`out`，Lambda 不支持
- 新代码一般用 Lambda，只有需要忽略参数或维护旧代码时才用匿名方法

##### 3.2 Lambda 表达式

Lambda 是匿名方法的简写，语法为 `参数 => 表达式或语句块`。

```csharp
Func<int, int> square = x => x * x;                              // 表达式体
Func<int, int, int> add = (a, b) => a + b;                       // 多参数加括号
Func<int, int> abs = x => { if (x < 0) return -x; return x; };   // 语句体
Action<string> print = s => Console.WriteLine(s);
Func<int> now = () => Environment.TickCount;                     // 无参数

// 显式标注参数类型，便于重载解析
Func<double, double> half = (double x) => x / 2;

print($"{square(5)} {add(2, 3)} {abs(-7)} {half(9)} {now()}");
```

- 表达式体自动作为返回值，省略 `return` 和 `{}`；单参数可省括号，多参数必须加括号
- 显式写参数类型可帮助重载解析，也便于阅读

##### 3.3 闭包与变量捕获

Lambda 可以引用外部局部变量，`Lambda + 被捕获变量` 称为 `闭包`。编译器生成闭包类，把变量提升为字段，所以捕获的是 `变量本身`，不是创建时的值。

```csharp
// 循环陷阱：三个 Lambda 共享同一个 i
var actions = new List<Action>();
for (int i = 0; i < 3; i++)
{
    actions.Add(() => Console.WriteLine($"捕获 {i}"));
}
foreach (var action in actions) action();    // 3 3 3

// 修正：每轮复制一份
var fixedActions = new List<Action>();
for (int i = 0; i < 3; i++)
{
    int copy = i;
    fixedActions.Add(() => Console.WriteLine($"复制 {copy}"));
}
foreach (var action in fixedActions) action(); // 0 1 2
```

> **注意**：`foreach` 的迭代变量从 C# 5 起是每轮新变量，闭包安全；`for` 的循环变量只有一个，必须手动复制。闭包会让变量活到委托被回收为止。

#### 4. 事件

##### 4.1 event 与 EventHandler

`事件` 是对委托字段的封装：外部只能 `+=` / `-=`，只有声明事件的类能触发它。

```csharp
var order = new OrderService();
order.OrderCreated += (sender, e) =>
    Console.WriteLine($"[邮件] 订单 {e.OrderId} 金额 {e.Amount:C}");
order.OrderCreated += OnOrderCreated;

order.PlaceOrder("A001", 199.9m);

static void OnOrderCreated(object? sender, OrderEventArgs e)
    => Console.WriteLine($"[日志] {(sender as OrderService)?.Name} 创建了 {e.OrderId}");

class OrderEventArgs : EventArgs
{
    public string OrderId { get; init; } = "";
    public decimal Amount { get; init; }
}

class OrderService
{
    public string Name { get; set; } = "订单服务";
    public event EventHandler<OrderEventArgs>? OrderCreated;   // 外部只能订阅/退订

    public void PlaceOrder(string id, decimal amount)
        => OrderCreated?.Invoke(this, new OrderEventArgs { OrderId = id, Amount = amount });
}
```

- 标准签名是 `(object? sender, TEventArgs e)`，`sender` 是触发者
- `TEventArgs` 必须继承 `EventArgs`
- `?.Invoke` 避免没有订阅者时的空引用
- 事件不是委托字段，类外写 `order.OrderCreated = null` 编译不过

> **注意**：及时用 `-=` 退订——长生命周期发布者持有短生命周期订阅者会内存泄漏；也不要用 `public EventHandler` 暴露字段，否则外部可 `Invoke` 或整体赋值。

#### 5. 表达式树

##### 5.1 Expression<Func<T,bool>>

`Expression<TDelegate>` 把 Lambda 保存成 `数据结构` 而不是可执行代码，可以遍历、改写，再 `Compile()` 成委托。ORM（如 EF Core）正是靠它把 C# 表达式翻译成 SQL。

```csharp
Expression<Func<Student, bool>> expr = s => s.Age >= 18 && s.Name.StartsWith("张");

Console.WriteLine(expr.NodeType);             // Lambda
Console.WriteLine(expr.Body);                 // ((s.Age >= 18) AndAlso s.Name.StartsWith("张"))

Func<Student, bool> compiled = expr.Compile();          // 编译成普通委托
Console.WriteLine(compiled(new Student { Name = "张三", Age = 20 })); // True
Console.WriteLine(compiled(new Student { Name = "李四", Age = 16 })); // False

class Student
{
    public string Name { get; init; } = "";
    public int Age { get; init; }
}
```

| 对比项 | `Func<T,bool>` | `Expression<Func<T,bool>>` |
|--------|----------------|----------------------------|
| 能否解析 | 不能 | 可以遍历 `Body`/`Parameters` |
| 典型用途 | 内存中的判断 | 翻译成 SQL、动态拼接条件 |
| 限制 | 无 | 只能是表达式体 Lambda，不能有语句体 |

> **注意**：给 `Expression<Func<T,bool>>` 赋值语句体 Lambda 会报 `CS0834`。表达式树也不支持可选参数、`ref`/`out`、动态类型等。

#### 6. 委托与接口的选择

```csharp
decimal[] prices = { 100m, 200m, 50m };

Console.WriteLine(Total(prices, p => p * 0.9m));          // 委托：临时策略
Console.WriteLine(Total(prices, new VipPricing().Price)); // 接口方法组：可复用策略

static decimal Total(decimal[] items, Func<decimal, decimal> price)
{
    decimal sum = 0;
    foreach (decimal item in items) sum += price(item);
    return sum;
}

interface IPricing { decimal Price(decimal amount); }
class VipPricing : IPricing { public decimal Price(decimal amount) => amount * 0.8m; }
```

| 维度 | 委托 | 接口 |
|------|------|------|
| 状态 | 适合无状态逻辑 | 可有字段、状态、依赖 |
| 组合 | 天然支持 `+=` 多播 | 需要自己维护列表 |
| 典型场景 | 回调、策略、LINQ | 服务、仓储、依赖注入 |

- 只有一个方法、调用方临时给逻辑：用 `Func`/`Action`
- 需要多方法协作、保存状态、被容器管理：用接口

> **注意**：接口更容易演进（可加默认实现），委托签名一旦公开就很难改；框架类库倾向接口，业务回调倾向委托。

#### 7. 小结

| 知识点 | 关键结论 |
|--------|----------|
| 委托 | 类型安全的函数指针，签名必须匹配 |
| 内置委托 | `Action` 无返回，`Func` 有返回，`Predicate` 返回 `bool` |
| 多播 | `+=` 追加、`-=` 移除，返回值只保留最后一个 |
| Lambda | `参数 => 表达式`；闭包捕获的是变量，`for` 循环内要复制一份 |
| 事件 | 封装委托，外部只能订阅/退订 |
| 表达式树 | Lambda 的数据结构形式，用于翻译成 SQL |
| 接口 vs 委托 | 单方法用委托，多成员/有状态用接口 |
