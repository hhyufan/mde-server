# LINQ

#### 1. LINQ 概述

##### 1.1 什么是 LINQ

`LINQ`（Language Integrated Query，语言集成查询）把 `查询` 能力直接做进 C# 语言：用统一的语法对 `内存集合`、`数据库`、`XML`、`JSON` 等数据源做筛选、投影、排序、分组、连接、聚合。

它的本质是 `IEnumerable<T>` 上的 `扩展方法`（`System.Linq.Enumerable`），配合 Lambda 使用；查询语法最终也会被编译器翻译成方法调用。

| 数据源 | 接口 | 提供者 |
|--------|------|--------|
| 内存集合（`List<T>`、数组） | `IEnumerable<T>` | `Enumerable` 类 |
| 数据库（EF Core） | `IQueryable<T>` | `Queryable` 类 |
| XML | `IEnumerable<XElement>` | `System.Xml.Linq` |
| JSON | `IEnumerable<JsonElement>` | `System.Text.Json` |

##### 1.2 查询语法与方法语法

两种写法完全等价，`查询语法` 更接近 SQL 便于阅读，`方法语法` 更灵活、可链式组合。

```csharp
var numbers = new[] { 1, 2, 3, 4, 5, 6 };

// 1. 查询语法（Query Syntax）
var querySyntax = from n in numbers
                  where n % 2 == 0
                  orderby n descending
                  select n * 10;

// 2. 方法语法（Method Syntax），实际调用的就是扩展方法
var methodSyntax = numbers
    .Where(n => n % 2 == 0)
    .OrderByDescending(n => n)
    .Select(n => n * 10);

Console.WriteLine(string.Join(", ", querySyntax));   // 60, 40, 20
Console.WriteLine(string.Join(", ", methodSyntax));  // 60, 40, 20
```

> **注意**：查询语法必须以 `select` 或 `group ... by` 结尾；`orderby` 要写在 `select` 之前。方法语法没有这个限制，且只有方法语法能直接调用 `Skip`、`Take`、`Distinct` 等方法（查询语法里需用括号包起来）。

#### 2. 延迟执行与立即执行

##### 2.1 延迟执行（Deferred Execution）

`Where`、`Select`、`OrderBy` 等算子只是 `构建查询`，并 `不立刻执行`；真正遍历（`foreach`）或物化（`ToList`）时才逐个元素计算。

```csharp
var source = new List<int> { 1, 2, 3 };

var query = source.Where(n =>
{
    Console.WriteLine($"  正在判断 {n}");
    return n > 1;
});

Console.WriteLine("查询已定义，但没有任何“正在判断”输出");

source.Add(4);                       // 查询定义之后再改源集合

var result = query.ToList();          // 此刻才真正执行
Console.WriteLine($"结果：{string.Join(", ", result)}");
```

输出会依次判断 1、2、3、4，最终结果 `2, 3, 4`——**说明查询捕获的是"源集合本身"，而不是定义时刻的快照**。

##### 2.2 立即执行（Immediate Execution）

返回 `单个值` 或 `具体集合` 的算子会立即执行：

```csharp
var nums = new[] { 5, 3, 8, 1 };

var list  = nums.Where(n => n > 2).ToList();       // 物化为 List<int>
var array = nums.Where(n => n > 2).ToArray();      // 物化为 int[]
var count = nums.Count(n => n > 2);                // 返回 int，立即执行
var sum   = nums.Sum();                            // 返回 int，立即执行
var first = nums.First(n => n > 4);                // 返回 int，立即执行

Console.WriteLine($"list={list.Count}, array={array.Length}, count={count}, sum={sum}, first={first}");
```

> **性能提示**：延迟执行很"省"，但如果查询被 `多次遍历`，每次都会重新执行一遍。想复用结果就先 `ToList()` 一次。在 EF Core 中，延迟执行还意味着"什么时候真正发 SQL"。

#### 3. 常用查询算子

##### 3.1 筛选与投影：Where / Select

```csharp
var people = new[]
{
    new { Name = "张三", Age = 18, City = "北京" },
    new { Name = "李四", Age = 25, City = "上海" },
    new { Name = "王五", Age = 32, City = "北京" },
    new { Name = "赵六", Age = 16, City = "上海" },
};

// Where：筛选
var adults = people.Where(p => p.Age >= 18);

// Select：投影成新形状（匿名类型）
var brief = adults.Select(p => new { p.Name, p.City });

foreach (var item in brief)
    Console.WriteLine($"{item.Name} - {item.City}");

// 带索引的重载
var indexed = people.Select((p, i) => $"{i + 1}. {p.Name}");
Console.WriteLine(string.Join(" | ", indexed));
```

##### 3.2 一对多展开：SelectMany

`SelectMany` 把 `集合的集合` 压平成一维序列，是处理"一对多"关系的关键算子。

```csharp
var orders = new[]
{
    new { Id = 1, Items = new[] { "苹果", "香蕉" } },
    new { Id = 2, Items = new[] { "橘子" } },
    new { Id = 3, Items = new[] { "苹果", "葡萄", "香蕉" } },
};

// Select 得到的是嵌套结构：IEnumerable<string[]>
var nested = orders.Select(o => o.Items);

// SelectMany 压平成一维：IEnumerable<string>
var flat = orders.SelectMany(o => o.Items);
Console.WriteLine(string.Join(", ", flat));      // 苹果, 香蕉, 橘子, 苹果, 葡萄, 香蕉

// 去重后的商品清单
var menu = orders.SelectMany(o => o.Items).Distinct();
Console.WriteLine(string.Join(", ", menu));      // 苹果, 香蕉, 橘子, 葡萄

// 查询语法用两个 from 实现同样的效果
var query = from o in orders
            from item in o.Items
            select item;
```

##### 3.3 排序：OrderBy / ThenBy

```csharp
var students = new[]
{
    new { Name = "张三", Score = 88 },
    new { Name = "李四", Score = 95 },
    new { Name = "王五", Score = 88 },
    new { Name = "赵六", Score = 70 },
};

// 主键升序，次键也升序
var sorted = students.OrderBy(s => s.Score).ThenBy(s => s.Name);
foreach (var s in sorted)
    Console.WriteLine($"{s.Score} {s.Name}");

// 降序
var desc = students.OrderByDescending(s => s.Score).ThenBy(s => s.Name);

// 反转
var reversed = sorted.Reverse();
Console.WriteLine($"最高分：{desc.First().Name}");
```

> `OrderBy` 只做一次排序；如果用 `students.OrderBy(x => x.Score).OrderBy(x => x.Name)`，第二次排序会覆盖第一次的结果——必须用 `ThenBy`。

##### 3.4 分组：GroupBy

`GroupBy` 返回 `IGrouping<TKey, TElement>` 序列，每个分组上可以继续聚合。

```csharp
var byCity = people.GroupBy(p => p.City);

foreach (var group in byCity)
{
    Console.WriteLine($"城市：{group.Key}，人数：{group.Count()}，平均年龄：{group.Average(p => p.Age):F1}");
    foreach (var p in group)
        Console.WriteLine($"    {p.Name}（{p.Age}）");
}

// 查询语法 + into 延续查询
var stats = from p in people
            group p by p.City into g
            orderby g.Count() descending
            select new { City = g.Key, Count = g.Count(), AvgAge = g.Average(x => x.Age) };

foreach (var s in stats)
    Console.WriteLine($"{s.City}: {s.Count} 人，平均 {s.AvgAge:F1}");
```

##### 3.5 连接：Join

```csharp
var customers = new[]
{
    new { Id = 1, Name = "张三" },
    new { Id = 2, Name = "李四" },
    new { Id = 3, Name = "王五" },   // 没有订单
};

var orderList = new[]
{
    new { OrderId = 101, CustomerId = 1, Amount = 99.5m },
    new { OrderId = 102, CustomerId = 1, Amount = 20m },
    new { OrderId = 103, CustomerId = 2, Amount = 300m },
};

// 内连接：只保留两边都匹配的
var inner = from c in customers
            join o in orderList on c.Id equals o.CustomerId
            select new { c.Name, o.OrderId, o.Amount };

foreach (var row in inner)
    Console.WriteLine($"{row.Name} 的订单 {row.OrderId}：{row.Amount:C}");

// 左连接：用 join ... into + DefaultIfEmpty 保留没有订单的客户
var left = from c in customers
           join o in orderList on c.Id equals o.CustomerId into gj
           from o in gj.DefaultIfEmpty()
           select new { c.Name, OrderId = o?.OrderId ?? 0, Amount = o?.Amount ?? 0m };

Console.WriteLine($"客户数：{left.Count()}（含无订单客户）");
```

##### 3.6 元素与量词：First / Single / Any / All

```csharp
var arr = new[] { 3, 1, 4, 1, 5 };

Console.WriteLine(arr.First());                       // 3，空序列抛异常
Console.WriteLine(arr.FirstOrDefault(n => n > 10));   // 0，找不到返回默认值
Console.WriteLine(arr.Last());                        // 5
Console.WriteLine(arr.ElementAt(2));                  // 4

Console.WriteLine(arr.Any());                         // True，等价 Count() > 0 但更高效
Console.WriteLine(arr.Any(n => n > 4));               // True
Console.WriteLine(arr.All(n => n > 0));               // True

try
{
    var one = arr.Single(n => n == 4);                // 恰好一个才成功
    Console.WriteLine(one);
}
catch (InvalidOperationException)
{
    Console.WriteLine("不满足“恰好一个”");
}
```

> **注意**：`FirstOrDefault()` 与 `SingleOrDefault()` 在找不到时返回 `default`；对值类型是 `0`，对引用类型是 `null`。若数据本应唯一，用 `Single` 能及早暴露脏数据。

##### 3.7 集合运算与去重

```csharp
var a = new[] { 1, 2, 2, 3 };
var b = new[] { 3, 4, 5 };

Console.WriteLine(string.Join(",", a.Distinct()));    // 1,2,3
Console.WriteLine(string.Join(",", a.Union(b)));      // 1,2,3,4,5（并集 + 去重）
Console.WriteLine(string.Join(",", a.Intersect(b)));  // 3（交集）
Console.WriteLine(string.Join(",", a.Except(b)));     // 1,2（差集）
Console.WriteLine(string.Join(",", a.Concat(b)));     // 1,2,2,3,3,4,5（拼接，不去重）
```

> 这些算子默认用 `Equals`/`GetHashCode` 比较；自定义类型想要按业务字段去重，需要重写这两个方法，或传入 `IEqualityComparer<T>`。

##### 3.8 分页与序列生成

```csharp
var all = Enumerable.Range(1, 100);

// 取第 2 页，每页 10 条
int page = 2, size = 10;
var pageData = all.Skip((page - 1) * size).Take(size);
Console.WriteLine(string.Join(",", pageData));        // 11..20

// Chunk（.NET 6+）直接按批切分
foreach (var chunk in all.Chunk(30))
    Console.WriteLine($"批次大小：{chunk.Length}");

// 生成序列
Console.WriteLine(string.Join(",", Enumerable.Repeat("x", 3)));   // x,x,x
Console.WriteLine(Enumerable.Empty<int>().Count());               // 0
```

#### 4. 综合实战：成绩统计

```csharp
var records = new[]
{
    new { Class = "一班", Name = "张三", Score = 88 },
    new { Class = "一班", Name = "李四", Score = 95 },
    new { Class = "一班", Name = "王五", Score = 72 },
    new { Class = "二班", Name = "赵六", Score = 91 },
    new { Class = "二班", Name = "钱七", Score = 65 },
    new { Class = "二班", Name = "孙八", Score = 83 },
};

var report = records
    .GroupBy(r => r.Class)
    .Select(g => new
    {
        Class = g.Key,
        Count = g.Count(),
        Average = g.Average(r => r.Score),
        Max = g.Max(r => r.Score),
        Top = g.OrderByDescending(r => r.Score).First().Name,
    })
    .OrderByDescending(x => x.Average);

foreach (var r in report)
    Console.WriteLine($"{r.Class}：{r.Count} 人，均分 {r.Average:F1}，最高 {r.Max}（{r.Top}）");

// 每个班前三名
var top3 = records
    .GroupBy(r => r.Class)
    .SelectMany(g => g.OrderByDescending(r => r.Score).Take(3))
    .Select(r => $"{r.Class}-{r.Name}:{r.Score}");

Console.WriteLine(string.Join(" | ", top3));
```

#### 5. IEnumerable 与 IQueryable

`IQueryable<T>` 继承自 `IEnumerable<T>`，但查询会被 `表达式树` 记录，交给提供者翻译成目标语言（如 SQL），而不是在内存里逐条执行。

```csharp
// EF Core 用法示意：db 是 DbContext，Orders 是 DbSet<Order>
// 需要 Microsoft.EntityFrameworkCore 与对应数据库提供程序
IQueryable<Order> query = db.Orders
    .Where(o => o.Amount > 100)     // 会被翻译进 WHERE 子句
    .OrderByDescending(o => o.CreatedAt);

var list = query.ToList();          // 到这里才真正执行 SQL

// 危险写法：Where 里调用了 C# 方法，无法翻译成 SQL
// var bad = db.Orders.Where(o => MyHelper.IsVip(o.CustomerId)).ToList();
```

> **性能提示**：`IQueryable` 上应只用能被翻译成 SQL 的表达式；一旦 `ToList()`/`AsEnumerable()` 物化，后续 `Where` 就变成内存过滤，数据已经全部拉回了。

#### 6. 常见陷阱

##### 6.1 多次枚举

```csharp
IEnumerable<int> GetNumbers()
{
    Console.WriteLine(">>> 开始生成数据");
    yield return 1;
    yield return 2;
    yield return 3;
}

var data = GetNumbers();
Console.WriteLine(data.Count());     // 触发一次生成
Console.WriteLine(data.Count());     // 又触发一次

var materialized = data.ToList();    // 只生成一次，后续复用
Console.WriteLine(materialized.Count);
```

##### 6.2 闭包捕获循环变量

```csharp
// for 循环的 i 是同一个变量，所有 lambda 共享最终值
var actions = new List<Action>();
for (int i = 0; i < 3; i++)
    actions.Add(() => Console.WriteLine($"for: {i}"));
foreach (var a in actions) a();      // 3 3 3

// foreach 的变量在 C# 5 之后是“每次迭代新变量”
var actions2 = new List<Action>();
foreach (var n in new[] { 1, 2, 3 })
    actions2.Add(() => Console.WriteLine($"foreach: {n}"));
foreach (var a in actions2) a();     // 1 2 3

// 修复 for 的写法：在循环体内复制一份
var actions3 = new List<Action>();
for (int i = 0; i < 3; i++)
{
    int copy = i;
    actions3.Add(() => Console.WriteLine($"fixed: {copy}"));
}
foreach (var a in actions3) a();     // 0 1 2
```

#### 7. 小结

| 主题 | 关键结论 |
|------|----------|
| 两种语法 | 查询语法与方法语法等价，复杂链式用方法语法 |
| 延迟执行 | `Where`/`Select` 不立即执行，`ToList`/`Count`/`First` 才执行 |
| 多次枚举 | 会重复计算，复用前先 `ToList()` |
| `Select` vs `SelectMany` | 前者保留嵌套，后者压平 |
| 排序 | 多级排序必须 `ThenBy`，不能用两次 `OrderBy` |
| 分组 | `GroupBy` + `into` 可继续聚合、排序 |
| 查找 | 只判存在用 `Any()`，不要 `Count() > 0` |
| `IQueryable` | 表达式要能被翻译成 SQL，尽早物化会丢性能 |
