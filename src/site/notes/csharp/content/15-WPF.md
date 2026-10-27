# WPF

#### 1. WPF 概述

##### 1.1 什么是 WPF

`WPF`（Windows Presentation Foundation）是 .NET 的 `桌面 UI 框架`，用 `XAML` 声明式描述界面，用 C# 写逻辑，靠 `DirectX` 做矢量渲染。

| 对比项 | WPF | WinForms |
|--------|-----|----------|
| 界面描述 | `XAML` 声明式，界面与逻辑分离 | 拖控件生成的代码，界面即代码 |
| 渲染 | 矢量、硬件加速、支持缩放不失真 | GDI+ 位图，缩放易模糊 |
| 布局 | `Grid`/`StackPanel` 等自适应布局 | 绝对坐标 `Location`/`Size` |
| 数据展示 | `数据绑定` + `MVVM` | 手动赋值、`DataSource` |
| 外观定制 | `Style`/`ControlTemplate` 可彻底重写 | 受限于控件自身绘制 |
| 平台 | 仅 Windows（.NET 8/10 均支持） | 仅 Windows |

> 跨平台桌面可考虑 `Avalonia`；微软新的原生方案是 `WinUI 3`，但 WPF 仍在长期维护，存量项目极多。

##### 1.2 创建与运行

```bash
# 需要安装 .NET SDK，并勾选“ .NET 桌面开发”工作负载
dotnet new wpf -n WpfDemo
cd WpfDemo
dotnet run
```

也可以用 Visual Studio 2022 新建「WPF 应用程序」项目，按 `F5` 调试运行。

#### 2. 项目结构与 XAML 基础

##### 2.1 项目文件

| 文件 | 作用 |
|------|------|
| `WpfDemo.csproj` | 项目配置，`<UseWPF>true</UseWPF>` 是启用 WPF 的关键 |
| `App.xaml` | 应用入口，声明全局资源与启动窗口 |
| `App.xaml.cs` | 应用生命周期（`OnStartup`/`OnExit`） |
| `MainWindow.xaml` | 窗口的界面结构 |
| `MainWindow.xaml.cs` | 窗口的 `代码后置`（事件、逻辑） |

##### 2.2 XAML 语法与代码后置

XAML 本质是 `XML`：一个元素 = 一个控件对象，一个属性 = 一个赋值。`x:Class` 指定对应的 C# 类，`x:Name` 会在代码后置里生成一个同名字段。

```xml
<Window x:Class="WpfDemo.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="我的第一个 WPF 窗口" Height="300" Width="400">
    <Grid>
        <TextBlock x:Name="TitleText"
                   Text="Hello WPF"
                   FontSize="24"
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center" />
    </Grid>
</Window>
```

```csharp
using System.Windows;

namespace WpfDemo;

// 必须是 partial：另一半由 XAML 编译器生成
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();   // 构建控件树，并把 x:Name 字段赋值
        TitleText.Text = "代码里也能改 XAML 中的控件";
    }
}
```

> **注意**：WPF 项目 `不能使用顶层语句`，入口是 `App.xaml` 里指定的 `StartupUri`，所以代码组织方式与控制台项目不同。

##### 2.3 布局容器

WPF 的布局是 `自适应` 的：父容器测量、子元素按 `HorizontalAlignment`/`VerticalAlignment`/`Margin` 排布。

| 容器 | 特点 |
|------|------|
| `Grid` | 行列网格，最常用；`*` 表示按比例占满剩余空间 |
| `StackPanel` | 顺序堆叠，`Orientation` 控制方向 |
| `DockPanel` | 按 `DockPanel.Dock` 四边停靠 |
| `WrapPanel` | 排满一行自动换行 |
| `Canvas` | 绝对坐标，`Canvas.Left`/`Top` |

```xml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto" />   <!-- 标题栏：按内容高度 -->
        <RowDefinition Height="*" />      <!-- 主体：占满剩余 -->
        <RowDefinition Height="32" />     <!-- 状态栏：固定高度 -->
    </Grid.RowDefinitions>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="200" />
        <ColumnDefinition Width="*" />
    </Grid.ColumnDefinitions>

    <TextBlock Grid.Row="0" Grid.ColumnSpan="2"
               Text="文件管理器" FontSize="18" Padding="8" Background="#EEEEEE" />

    <ListBox Grid.Row="1" Grid.Column="0" />
    <Border Grid.Row="1" Grid.Column="1" Background="#FAFAFA" />

    <StatusBar Grid.Row="2" Grid.ColumnSpan="2">
        <TextBlock Text="就绪" />
    </StatusBar>
</Grid>
```

#### 3. 常用控件

##### 3.1 控件分类

| 分类 | 控件 |
|------|------|
| 文本 | `TextBlock`（只读）、`TextBox`、`PasswordBox`、`RichTextBox` |
| 按钮 | `Button`、`RepeatButton`、`ToggleButton` |
| 选择 | `CheckBox`、`RadioButton`、`ComboBox`、`ListBox`、`Slider` |
| 列表 | `ListView`、`DataGrid`、`TreeView` |
| 容器 | `Grid`、`Border`、`GroupBox`、`TabControl`、`Expander` |
| 菜单与提示 | `Menu`、`ToolBar`、`ContextMenu`、`ToolTip` |

##### 3.2 表单示例

```xml
<StackPanel Margin="16">
    <TextBlock Text="用户注册" FontSize="20" FontWeight="Bold" Margin="0,0,0,12" />

    <TextBlock Text="姓名" />
    <TextBox x:Name="NameBox" Margin="0,4,0,12" />

    <TextBlock Text="密码" />
    <PasswordBox x:Name="PwdBox" Margin="0,4,0,12" />

    <TextBlock Text="城市" />
    <ComboBox x:Name="CityBox" Margin="0,4,0,12" SelectedIndex="0">
        <ComboBoxItem Content="北京" />
        <ComboBoxItem Content="上海" />
        <ComboBoxItem Content="广州" />
    </ComboBox>

    <CheckBox x:Name="AgreeBox" Content="我已阅读并同意用户协议" Margin="0,0,0,12" />

    <Button x:Name="SubmitButton" Content="提交"
            Width="100" HorizontalAlignment="Left"
            Click="SubmitButton_Click" />
</StackPanel>
```

##### 3.3 事件处理

事件处理写在代码后置里，签名固定为 `(object sender, RoutedEventArgs e)`。

```csharp
private void SubmitButton_Click(object sender, RoutedEventArgs e)
{
    if (string.IsNullOrWhiteSpace(NameBox.Text))
    {
        MessageBox.Show("姓名不能为空", "提示");
        return;
    }

    if (PwdBox.Password.Length < 6)
    {
        MessageBox.Show("密码至少 6 位", "提示");
        return;
    }

    if (AgreeBox.IsChecked != true)
    {
        MessageBox.Show("请先同意用户协议", "提示");
        return;
    }

    string city = (CityBox.SelectedItem as ComboBoxItem)?.Content?.ToString() ?? "未选择";
    MessageBox.Show($"注册成功：{NameBox.Text}（{city}）", "成功");
}
```

#### 4. 数据绑定

##### 4.1 Binding 基础

格式：`{Binding 属性名, Mode=..., UpdateSourceTrigger=...}`。控件从 `DataContext` 上按 `Path` 找值。

| 设置 | 说明 |
|------|------|
| `Mode=OneWay` | 源 → 目标（默认） |
| `Mode=TwoWay` | 双向，输入类控件默认双向 |
| `UpdateSourceTrigger=PropertyChanged` | 每次按键就回写源 |
| `UpdateSourceTrigger=LostFocus` | 失焦才回写（`TextBox` 默认） |
| `StringFormat` | 格式化显示，如 `{}{0:C}` |

##### 4.2 INotifyPropertyChanged

`ViewModel` 属性变化时必须 `发出通知`，否则界面不会刷新。这是 WPF 数据绑定的核心机制。

```csharp
using System.ComponentModel;
using System.Runtime.CompilerServices;

public class PersonViewModel : INotifyPropertyChanged
{
    private string _name = "";
    private int _age;

    public string Name
    {
        get => _name;
        set
        {
            if (_name == value) return;
            _name = value;
            OnPropertyChanged();                 // 通知 Name 变了
            OnPropertyChanged(nameof(Summary));  // 依赖它的属性也要通知
        }
    }

    public int Age
    {
        get => _age;
        set
        {
            if (_age == value) return;
            _age = value;
            OnPropertyChanged();
            OnPropertyChanged(nameof(Summary));
        }
    }

    public string Summary => $"{Name}（{Age} 岁）";

    public event PropertyChangedEventHandler? PropertyChanged;

    private void OnPropertyChanged([CallerMemberName] string? propertyName = null)
        => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
}
```

> `[CallerMemberName]` 让编译器自动填入调用方的属性名，省去手写字符串，也不会因改名而漏改。

##### 4.3 绑定到界面

```xml
<StackPanel Margin="16">
    <TextBlock Text="姓名" />
    <TextBox Text="{Binding Name, UpdateSourceTrigger=PropertyChanged}" Margin="0,4,0,12" />

    <TextBlock Text="年龄" />
    <Slider Minimum="0" Maximum="120" Value="{Binding Age}" Margin="0,4,0,12" />

    <TextBlock Text="{Binding Summary}" FontSize="18" FontWeight="Bold" />

    <ListBox ItemsSource="{Binding People}" DisplayMemberPath="Name" Height="120" />
</StackPanel>
```

代码后置里设置数据上下文即可：

- `DataContext = new PersonViewModel();`
- 集合类属性用 `ObservableCollection<T>`，增删元素会自动通知 `ListBox` 刷新

##### 4.4 值转换器 IValueConverter

当"显示的值"和"存的值"不一致时（如 `bool` → 中文），用转换器。

```csharp
using System.Globalization;
using System.Windows.Data;

public class AgeToTextConverter : IValueConverter
{
    // 源 -> 界面
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        int age = value is int i ? i : 0;
        return age >= 18 ? "成年" : "未成年";
    }

    // 界面 -> 源（单向绑定可直接抛异常）
    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        => throw new NotSupportedException();
}
```

在 XAML 资源里注册后使用：`Text="{Binding Age, Converter={StaticResource AgeToText}}"`。

##### 4.5 命令 ICommand

MVVM 里不写 `Click` 事件，而是把行为封装成 `Command` 绑定到按钮，便于测试与解耦。

```csharp
using System.Windows.Input;

public class RelayCommand : ICommand
{
    private readonly Action<object?> _execute;
    private readonly Func<object?, bool>? _canExecute;

    public RelayCommand(Action<object?> execute, Func<object?, bool>? canExecute = null)
    {
        _execute = execute;
        _canExecute = canExecute;
    }

    public bool CanExecute(object? parameter) => _canExecute?.Invoke(parameter) ?? true;

    public void Execute(object? parameter) => _execute(parameter);

    // 交给 CommandManager 统一触发刷新，省去手动 RaiseCanExecuteChanged
    public event EventHandler? CanExecuteChanged
    {
        add => CommandManager.RequerySuggested += value;
        remove => CommandManager.RequerySuggested -= value;
    }
}
```

#### 5. 样式与模板

##### 5.1 Style

`Style` 把一组属性设置打包复用，`TargetType` 决定作用于哪种控件。

```xml
<Window.Resources>
    <Style x:Key="PrimaryButton" TargetType="Button">
        <Setter Property="Background" Value="#2D7FF9" />
        <Setter Property="Foreground" Value="White" />
        <Setter Property="Padding" Value="12,6" />
        <Setter Property="BorderThickness" Value="0" />
        <Setter Property="Template">
            <Setter.Value>
                <ControlTemplate TargetType="Button">
                    <Border Background="{TemplateBinding Background}"
                            CornerRadius="4"
                            Padding="{TemplateBinding Padding}">
                        <ContentPresenter HorizontalAlignment="Center"
                                          VerticalAlignment="Center" />
                    </Border>
                </ControlTemplate>
            </Setter.Value>
        </Setter>
        <Style.Triggers>
            <Trigger Property="IsMouseOver" Value="True">
                <Setter Property="Background" Value="#1E63C8" />
            </Trigger>
            <Trigger Property="IsEnabled" Value="False">
                <Setter Property="Opacity" Value="0.5" />
            </Trigger>
        </Style.Triggers>
    </Style>
</Window.Resources>
```

- `x:Key`：资源键，用 `{StaticResource PrimaryButton}` 引用
- 省略 `x:Key` 且指定 `TargetType` 时，会成为该类型控件的 `隐式样式`
- `ControlTemplate` 彻底重写外观；`TemplateBinding` 把模板内部元素绑定到控件属性
- `Trigger` 按属性值切换样式，替代手写状态代码

##### 5.2 DataTemplate

`DataTemplate` 决定"一条数据长什么样"，配合 `ItemsSource` 使用，是列表界面的核心。

```xml
<ListBox ItemsSource="{Binding Todos}">
    <ListBox.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <CheckBox IsChecked="{Binding IsDone}" VerticalAlignment="Center" />
                <TextBlock Text="{Binding Title}" Margin="8,0,0,0" VerticalAlignment="Center" />
                <TextBlock Text="{Binding CreatedAt, StringFormat='（{0:MM-dd}）'}"
                           Foreground="Gray" Margin="8,0,0,0" VerticalAlignment="Center" />
            </StackPanel>
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

##### 5.3 资源与路由事件

- 资源查找顺序：控件自身 → 父级 → `Window.Resources` → `App.xaml` → 系统主题
- 公共样式放 `App.xaml` 或用 `ResourceDictionary` 拆成独立文件，通过 `MergedDictionaries` 合并
- `路由事件` 会沿视觉树传递：`PreviewXxx` 是 `隧道`（父 → 子），`Xxx` 是 `冒泡`（子 → 父）；把 `e.Handled = true` 可阻止继续传递

#### 6. MVVM 实战：待办清单

##### 6.1 分层职责

| 层 | 职责 |
|----|------|
| `Model` | 数据结构，如 `TodoItem` |
| `ViewModel` | 界面状态、命令、业务逻辑，实现 `INotifyPropertyChanged` |
| `View` | 纯 XAML，只做绑定，不写业务代码 |

##### 6.2 Model 与 ViewModel

```csharp
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;

// Model
public class TodoItem : INotifyPropertyChanged
{
    private bool _isDone;

    public string Title { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public bool IsDone
    {
        get => _isDone;
        set
        {
            _isDone = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(IsDone)));
        }
    }

    public event PropertyChangedEventHandler? PropertyChanged;
}

// ViewModel
public class TodoViewModel : INotifyPropertyChanged
{
    public ObservableCollection<TodoItem> Todos { get; } = new();

    private string _newTitle = "";
    public string NewTitle
    {
        get => _newTitle;
        set { _newTitle = value; OnPropertyChanged(); }
    }

    public ICommand AddCommand { get; }
    public ICommand RemoveDoneCommand { get; }

    public TodoViewModel()
    {
        AddCommand = new RelayCommand(_ =>
        {
            if (string.IsNullOrWhiteSpace(NewTitle)) return;
            Todos.Add(new TodoItem { Title = NewTitle.Trim() });
            NewTitle = "";
        });

        RemoveDoneCommand = new RelayCommand(_ =>
        {
            // 先 ToList 再删，避免遍历时修改集合
            foreach (var done in Todos.Where(t => t.IsDone).ToList())
                Todos.Remove(done);
        });
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    private void OnPropertyChanged([CallerMemberName] string? propertyName = null)
        => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
}
```

##### 6.3 View

```xml
<Window x:Class="WpfDemo.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="待办清单" Height="450" Width="420">
    <Grid Margin="16">
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto" />
            <RowDefinition Height="*" />
            <RowDefinition Height="Auto" />
        </Grid.RowDefinitions>

        <StackPanel Grid.Row="0" Orientation="Horizontal">
            <TextBox Width="260" VerticalContentAlignment="Center"
                     Text="{Binding NewTitle, UpdateSourceTrigger=PropertyChanged}" />
            <Button Content="添加" Command="{Binding AddCommand}" Margin="8,0,0,0" Padding="12,6" />
        </StackPanel>

        <ListBox Grid.Row="1" Margin="0,12" ItemsSource="{Binding Todos}">
            <ListBox.ItemTemplate>
                <DataTemplate>
                    <CheckBox IsChecked="{Binding IsDone}" Content="{Binding Title}" />
                </DataTemplate>
            </ListBox.ItemTemplate>
        </ListBox>

        <Button Grid.Row="2" Content="清除已完成"
                Command="{Binding RemoveDoneCommand}"
                HorizontalAlignment="Left" Padding="12,6" />
    </Grid>
</Window>
```

代码后置只需一行 `DataContext = new TodoViewModel();`，界面与逻辑彻底分离。

#### 7. 常见问题

##### 7.1 跨线程更新 UI

WPF 的控件只能在 `创建它的线程（UI 线程）` 上访问，后台线程直接改会抛 `InvalidOperationException`。

```csharp
private async void RefreshButton_Click(object sender, RoutedEventArgs e)
{
    StatusText.Text = "加载中...";

    // await 之后的代码自动回到 UI 线程，可以直接操作控件
    await Task.Delay(1000);
    StatusText.Text = "加载完成";
}

private void LoadInBackground()
{
    Task.Run(() =>
    {
        Thread.Sleep(1000);        // 模拟耗时计算（后台线程）
        // 直接改 StatusText 会抛异常，必须切回 UI 线程
        Dispatcher.Invoke(() => StatusText.Text = "后台加载完成");
    });
}
```

##### 7.2 发布

```bash
# 框架依赖发布：体积小，但目标机器要装 .NET 桌面运行时
dotnet publish -c Release -r win-x64 --self-contained false

# 自包含发布：单机可跑，体积较大
dotnet publish -c Release -r win-x64 --self-contained true
```

#### 8. 小结

| 主题 | 关键结论 |
|------|----------|
| XAML | 一个元素一个控件，`x:Class` 关联代码后置，`x:Name` 生成字段 |
| 布局 | 优先 `Grid`，`*` 分配剩余空间，避免硬编码坐标 |
| 数据绑定 | `ViewModel` 必须实现 `INotifyPropertyChanged`，集合用 `ObservableCollection<T>` |
| 命令 | 用 `ICommand` 代替 `Click` 事件，是 MVVM 的关键 |
| 样式 | `Style` 复用属性，`ControlTemplate` 换外观，`DataTemplate` 定数据项 |
| 线程 | UI 只能在 UI 线程更新，`await` 后自动回归，必要时 `Dispatcher.Invoke` |
