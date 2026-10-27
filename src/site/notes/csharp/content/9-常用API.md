# 常用API

#### 1. string

##### 1.1 不可变性与常用方法

`string` 是 `引用类型` 但 `不可变`：任何"修改"（`Replace`、`Trim`、`+`）都会在堆上 `新建` 一个字符串。

```csharp
string s = "  Hello World  ";

Console.WriteLine(s.Length);                     // 15
Console.WriteLine(s.Trim());                     // Hello World
Console.WriteLine(s.Trim().ToUpper());           // HELLO WORLD
Console.WriteLine(s.Contains("World"));          // True
Console.WriteLine(s.IndexOf('W'));               // 8
Console.WriteLine(s.Replace("World", "C#"));     //   Hello C#
Console.WriteLine(s.Substring(2, 5));            // Hello
Console.WriteLine(string.Join("-", "a,b,c".Split(',')));   // a-b-c
Console.WriteLine(string.IsNullOrWhiteSpace(" "));         // True

// 不可变：Trim 产生的是新对象
string t = s.Trim();
Console.WriteLine(ReferenceEquals(s, t));        // False
```

| 方法 | 说明 |
|------|------|
| `Substring(start, len)` / `s[..5]` | 取子串，范围运算符更简洁 |
| `IndexOf` / `LastIndexOf` | 找不到返回 `-1`，不抛异常 |
| `Contains` / `StartsWith` / `EndsWith` | 判断包含或前后缀 |
| `Split` / `Join` | 拆分与合并 |
| `ToUpper` / `ToLower` / `Trim` | 大小写与空白处理 |
| `PadLeft` / `PadRight` | 补空格或字符 |
| `string.IsNullOrEmpty` / `IsNullOrWhiteSpace` | 判空的唯一推荐写法 |

> **注意**：比较字符串用 `==` 或 `string.Equals(a, b, StringComparison.OrdinalIgnoreCase)`；`ToLower() == other` 会多分配一个字符串，且受区域设置影响。

#### 2. StringBuilder

频繁拼接用 `StringBuilder`：它在同一个缓冲区上追加，最后只 `ToString()` 一次。

```csharp
var sb = new StringBuilder();
for (int i = 1; i <= 3; i++)
{
    sb.Append(i).Append(',');
}
sb.AppendLine("done");
sb.Replace(',', '|');
sb.Insert(0, ">> ");
Console.WriteLine(sb.ToString());      // >> 1|2|3|done
Console.WriteLine(sb.Length);          // 字符数
sb.Clear();
Console.WriteLine(sb.Length);          // 0
```

> **性能提示**：循环里 `result += item` 是 `O(n²)`（每次都新建字符串）；`StringBuilder` 是 `O(n)`。少量拼接（3~5 段）直接用 `+` 或插值即可，编译器会优化成 `string.Concat`。

#### 3. Math

```csharp
Console.WriteLine(Math.Round(2.5));            // 2，默认银行家舍入（ToEven）
Console.WriteLine(Math.Round(2.5, MidpointRounding.AwayFromZero));   // 3
Console.WriteLine(Math.Ceiling(1.2));          // 2，向上取整
Console.WriteLine(Math.Floor(1.8));            // 1，向下取整
Console.WriteLine(Math.Truncate(-1.8));        // -1，直接截断
Console.WriteLine(Math.Pow(2, 10));            // 1024
Console.WriteLine(Math.Sqrt(16));              // 4
Console.WriteLine(Math.Abs(-5));               // 5
Console.WriteLine(Math.Clamp(15, 0, 10));      // 10
```

`Math.Round` 默认是 `银行家舍入`（`2.5 → 2`、`3.5 → 4`），要四舍五入必须显式传 `MidpointRounding.AwayFromZero`。金额计算不要用 `double`，用 `decimal`。

#### 4. 日期与时间

##### 4.1 DateTime / DateTimeOffset

```csharp
DateTime now = DateTime.Now;                   // 本地时间，Kind = Local
Console.WriteLine(now.ToString("yyyy-MM-dd HH:mm:ss"));

var dto = DateTimeOffset.Now;                  // 带时区偏移，跨时区首选
Console.WriteLine(dto.Offset);                 // +08:00

var parsed = DateTime.ParseExact("2024-01-02", "yyyy-MM-dd", null);
Console.WriteLine(parsed.DayOfWeek);           // Tuesday

TimeSpan span = new DateTime(2024, 1, 3) - new DateTime(2024, 1, 1);
Console.WriteLine(span.TotalHours);            // 48
Console.WriteLine(now.AddDays(7) > now);       // True
```

| 类型 | 含义 | 适用 |
|------|------|------|
| `DateTime` | 日期 + 时间，带 `Kind`（Local/Utc/Unspecified） | 单个时区内的展示 |
| `DateTimeOffset` | 日期时间 + 时区偏移 | 跨时区、存库、日志 |
| `TimeSpan` | 时间间隔 | 差值、超时、时长 |
| `DateOnly` / `TimeOnly` | 只有日期 / 只有时间 | 生日、营业时间 |

- 存库统一用 `UTC`（`DateTime.UtcNow` / `DateTimeOffset.UtcNow`），展示时再转本地
- 格式化用自定义格式串：`yyyy` 年、`MM` 月、`dd` 日、`HH` 24 小时、`mm` 分、`ss` 秒
- 解析优先 `TryParseExact`，避免格式随区域设置漂移

#### 5. Guid

```csharp
Guid id = Guid.NewGuid();                    // 全局唯一标识
Console.WriteLine(id.ToString("N"));         // 32 位无连字符
Console.WriteLine(id.ToString("D"));         // 带连字符
Console.WriteLine(id == Guid.Empty);         // False
Console.WriteLine(Guid.TryParse(id.ToString(), out var back));   // True
Console.WriteLine(back == id);               // True
```

`Guid.NewGuid()` 生成的是 `128 位` 随机值，适合做数据库主键、临时文件名；但它 `不是` 顺序的，做聚集索引时不如自增 `long` 或 `Guid v7` 友好。

#### 6. Random

```csharp
Random rnd = new Random(42);             // 固定种子 → 结果可复现
Console.WriteLine(rnd.Next(1, 7));       // [1, 7) 的整数
Console.WriteLine(rnd.NextDouble());     // [0, 1) 的小数

int[] cards = { 1, 2, 3, 4, 5 };
Random.Shared.Shuffle(cards);            // .NET 8+，线程安全的全局实例
Console.WriteLine(string.Join(",", cards));

byte[] buffer = new byte[4];
Random.Shared.NextBytes(buffer);
Console.WriteLine(buffer[0]);
```

- `new Random()` 用时间做种子，同一毫秒内多次 `new` 会得到 `相同序列`
- 多线程共享一个 `Random` 会破坏内部状态，用 `Random.Shared` 或每线程一个
- **安全场景**（令牌、密码盐）必须用 `RandomNumberGenerator`，`Random` 是可预测的伪随机

#### 7. Regex

```csharp
using System.Text.RegularExpressions;

var re = new Regex(@"^(?<user>[a-z0-9_]{3,16})@(?<host>\w+\.\w+)$");
Match m = re.Match("tom_01@example.com");
Console.WriteLine(m.Success);                 // True
Console.WriteLine(m.Groups["user"].Value);    // tom_01

Console.WriteLine(Regex.IsMatch("2024-01-02", @"^\d{4}-\d{2}-\d{2}$"));   // True
Console.WriteLine(Regex.Replace("a1b2c3", @"\d", "#"));                   // a#b#c#

foreach (Match item in Regex.Matches("a1 b22", @"\d+"))
{
    Console.WriteLine(item.Value);            // 1 22
}
```

> **性能提示**：`Regex` 每次静态调用都要解析模式。热路径上把 `Regex` 存成字段并加 `RegexOptions.Compiled`；匹配不可信输入时务必传 `matchTimeout`，防止灾难性回溯卡死线程。

#### 8. 扩展方法

给已有类型"加方法"而不用改原类型：静态类 + 静态方法 + 第一个参数加 `this`。

```csharp
public static class StringExtensions
{
    public static bool IsNullOrBlank(this string? s) => string.IsNullOrWhiteSpace(s);

    public static string Truncate(this string s, int max)
        => s.Length <= max ? s : s[..max] + "...";
}

Console.WriteLine("  ".IsNullOrBlank());       // True，像实例方法一样调用
Console.WriteLine("HelloWorld".Truncate(5));   // Hello...
```

- 扩展方法只是 `静态方法` 的语法糖，编译后就是普通静态调用
- 不能访问类型的私有成员，也不能真正"覆盖"已有实例方法
- 与实例方法同名时，`实例方法优先`；扩展方法之间按命名空间可见性取最近的一个

#### 9. Convert 与格式化

```csharp
Console.WriteLine(Convert.ToInt32(null));        // 0，null 不抛异常
Console.WriteLine(Convert.ToInt32("42"));        // 42
Console.WriteLine(Convert.ToBoolean("true"));    // True

Console.WriteLine(1234.5.ToString("N2"));        // 1,234.50，千分位两位
Console.WriteLine(255.ToString("X"));            // FF，十六进制
Console.WriteLine(0.256.ToString("P1"));         // 25.6%，百分比
Console.WriteLine(1234.5m.ToString("C"));        // 货币，按当前区域

// 解析失败不抛异常，最安全
Console.WriteLine(int.TryParse("abc", out int n));   // False
// 指定不变文化，避免服务器区域设置影响
Console.WriteLine(double.TryParse("1.5", System.Globalization.NumberStyles.Any,
    System.Globalization.CultureInfo.InvariantCulture, out double d));   // True
```

| 写法 | 结果 |
|------|------|
| `F2` | 两位小数（`3.14`） |
| `N2` | 千分位 + 两位小数 |
| `P1` | 百分比一位小数 |
| `X` / `x` | 十六进制大小写 |
| `C` | 货币符号 |
| `yyyy-MM-dd` | 日期格式 |

#### 10. Environment 与 GC

- `Environment.NewLine`：平台换行符（Windows `\r\n`）
- `Environment.CurrentDirectory` / `GetEnvironmentVariable("PATH")`
- `Environment.MachineName` / `ProcessorCount`
- `Environment.Exit(0)`：立即结束进程，`finally` 不执行
- `GC.GetTotalMemory(false)`：粗略观察托管堆占用
- `GC.Collect()`：`不要` 手动调用，GC 自己更清楚什么时候回收

> **注意**：`Environment.Exit` 会跳过 `using` 的 `Dispose`，资源可能没刷新到磁盘。需要优雅退出时，用取消令牌 + 正常返回，让 `finally` 走完。

#### 11. 小结

| 知识点 | 关键结论 |
|--------|----------|
| `string` | 不可变，频繁拼接改用 `StringBuilder` |
| 比较 | 用 `==` / `string.Equals` + `StringComparison` |
| 数值 | 金额用 `decimal`；`Math.Round` 默认银行家舍入 |
| 时间 | 存 UTC 用 `DateTimeOffset`，展示再转本地 |
| 随机 | 多线程用 `Random.Shared`；安全场景用 `RandomNumberGenerator` |
| 正则 | 缓存 `Regex` 实例并设置超时 |
| 扩展方法 | 静态类 + `this` 参数，是静态调用的语法糖 |
| 解析 | 优先 `TryParse`，并显式传入 `CultureInfo` |
