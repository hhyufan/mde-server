# IDE开发与使用

#### 1. 开发工具选择

##### 1.1 主流 IDE

| 工具 | 平台 | 特点 | 适合人群 |
|------|------|------|----------|
| Visual Studio 2022 | Windows | 功能最全，调试器强大，开箱即用 | 初学者、桌面/Web 开发 |
| VS Code + C# Dev Kit | 跨平台 | 轻量、启动快、插件生态丰富 | 同时写前端、Linux 服务器 |
| JetBrains Rider | 跨平台 | 智能重构强，付费 | 熟悉 JetBrains 的团队 |

初学者建议 **Visual Studio 2022 社区版**（免费），安装时勾选“**.NET 桌面开发**”工作负载；只写控制台程序也够用。使用 .NET 10 需要 VS 2022 17.14 或更新版本。

##### 1.2 VS Code 最小配置

1. 安装 .NET SDK
2. 安装扩展 **C# Dev Kit**（会自动带上 C#、.NET Install Tool）
3. 打开项目所在文件夹，并信任工作区
4. 按 `F5`，选择 `.NET` 调试器即可运行

> **注意**：VS Code 不“自带”编译器，真正干活的仍然是 `dotnet` CLI 与 Roslyn。

#### 2. 解决方案与项目

##### 2.1 概念区别

- **项目（Project）**：一个 `.csproj`，编译为一个程序集（`.dll` / `.exe`）
- **解决方案（Solution）**：一个 `.sln`（新版 SDK 也支持 `.slnx`），组织多个项目
- **依赖方向**：应用项目引用类库项目，反之不成立

##### 2.2 用 CLI 组织多项目

```bash
dotnet new sln -n ShopDemo
dotnet new console -n ShopDemo.App
dotnet new classlib -n ShopDemo.Core
dotnet sln add ShopDemo.App ShopDemo.Core
dotnet add ShopDemo.App reference ShopDemo.Core
dotnet build
```

- `dotnet sln add` 把项目加入解决方案
- `dotnet add reference` 建立项目引用，等价于 VS 里的“添加项目引用”
- 解决方案只是容器，本身不参与编译

##### 2.3 在 Visual Studio 中对应

- **解决方案资源管理器**：树形展示解决方案 → 项目 → 文件夹 → 文件
- 右键项目 → **属性**：图形化编辑 `.csproj` 中的大部分配置
- 右键解决方案 → **添加 → 现有项目**：把已有项目纳入解决方案

#### 3. 常用快捷键

| 操作 | Visual Studio 2022 | VS Code |
|------|--------------------|---------|
| 启动调试 | `F5` | `F5` |
| 不调试运行 | `Ctrl+F5` | `Ctrl+F5` |
| 切换断点 | `F9` | `F9` |
| 逐语句（进入方法） | `F11` | `F11` |
| 逐过程（不进入方法） | `F10` | `F10` |
| 跳出当前方法 | `Shift+F11` | `Shift+F11` |
| 停止调试 | `Shift+F5` | `Shift+F5` |
| 格式化文档 | `Ctrl+K, Ctrl+D` | `Shift+Alt+F` |
| 快速操作/修复 | `Ctrl+.` | `Ctrl+.` |
| 转到定义 | `F12` | `F12` |
| 查找所有引用 | `Shift+F12` | `Shift+Alt+F12` |

#### 4. 断点调试

##### 4.1 基本流程

1. 在可疑行左侧单击，出现红点（或按 `F9`）
2. `F5` 启动调试，程序在断点处暂停
3. 用 **局部变量**、**监视** 窗口查看值
4. `F10` 逐过程、`F11` 逐语句、`Shift+F11` 跳出
5. `F5` 继续到下一个断点，`Shift+F5` 停止

##### 4.2 调试示例

下面的代码故意留了一个 bug：平均分应该是小数，但 `sum / scores.Length` 是整数除法。用断点观察 `sum` 与 `average` 即可发现。

```csharp
int[] scores = { 80, 92, 75, 88 };
int sum = 0;

for (int i = 0; i < scores.Length; i++)
{
    sum += scores[i];                    // 在这里打断点，逐次观察 sum
}

double average = sum / scores.Length;    // 整数除法，结果是 83 而不是 83.75
Console.WriteLine($"总分 {sum}，平均分 {average}");
```

修复方式：写成 `(double)sum / scores.Length` 或 `scores.Average()`。

##### 4.3 条件断点与监视

- 右键断点 → **条件**：例如 `i == 3`，只在满足时暂停
- 右键断点 → **操作**：输出日志而不暂停，不改代码也能追踪
- **监视** 窗口可输入任意表达式，如 `scores.Length`、`sum / 4.0`
- **调用堆栈** 窗口看清方法调用链，双击可跳转

##### 4.4 用断言暴露问题

`Debug.Assert` 只在 Debug 配置生效，条件不成立时中断并给出断言信息，适合检查“绝不应该发生”的情况。

```csharp
using System.Diagnostics;

int Divide(int a, int b)
{
    Debug.Assert(b != 0, "除数不能为 0");
    return a / b;
}

Console.WriteLine(Divide(10, 2));

try
{
    Console.WriteLine(Divide(10, 0));
}
catch (DivideByZeroException ex)
{
    Console.WriteLine($"捕获异常：{ex.Message}");
}
```

> **提示**：调试时可在 VS 的“异常设置”中勾选 `Common Language Runtime Exceptions`，让调试器在异常**抛出点**中断，而不是等到 `catch`。

#### 5. 生成配置：Debug 与 Release

##### 5.1 差异

| 维度 | Debug | Release |
|------|-------|---------|
| 优化 | 关闭，便于单步调试 | 开启，性能更好 |
| 调试符号 | 完整 `.pdb` | 默认也生成，可关闭 |
| 预定义符号 | `DEBUG`、`TRACE` | `RELEASE`、`TRACE` |
| 输出目录 | `bin/Debug/net10.0/` | `bin/Release/net10.0/` |
| 断言 | `Debug.Assert` 生效 | 调用被移除 |

##### 5.2 条件编译

```csharp
#if DEBUG
Console.WriteLine("[Debug] 调试配置");
#else
Console.WriteLine("[Release] 发布配置");
#endif

Console.WriteLine($"DEBUG 符号：{IsDebugBuild()}");
Logger.Log("这条日志只在 Debug 下输出");

static bool IsDebugBuild()
{
#if DEBUG
    return true;
#else
    return false;
#endif
}

internal static class Logger
{
    [System.Diagnostics.Conditional("DEBUG")]
    public static void Log(string message) => Console.WriteLine($"[LOG] {message}");
}
```

- `#if` 是预处理指令，不满足条件的分支**根本不参与编译**
- `[Conditional("DEBUG")]` 标记的方法，在 Release 下连调用都会被编译器删掉
- 不要把业务逻辑写进 `#if DEBUG`，否则两种配置行为不一致

##### 5.3 命令行验证

```bash
dotnet run -c Release
dotnet publish -c Release -o ./publish
```

发布前至少用 Release 跑一遍，避免“Debug 正常、Release 出错”。

#### 6. 热重载与附加进程

- `dotnet watch run`：监听文件变化，自动重新编译并重启（VS 中对应“热重载”）
- **附加到进程**（VS：调试 → 附加到进程）：调试已经在运行的程序，如 IIS、Windows 服务
- 修改方法签名等热重载不支持的场景，需要重新启动

#### 7. 小结

| 主题 | 关键结论 |
|------|----------|
| 工具 | 初学者用 VS 2022；跨平台选 VS Code + C# Dev Kit |
| 结构 | 解决方案管多个项目，项目管一个程序集 |
| 调试 | 断点 + 逐语句 + 监视，先复现再定位 |
| 配置 | Debug 便于调试，Release 才是最终行为 |
