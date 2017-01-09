# CLI与API使用模式

在进入配置项讲解之前，我们首先看一看webpack为我们提供的使用方式：CLI和API。

## CLI

CLI即Command Line Interface，顾名思义，也就是命令行用户界面。到目前为止，我们所有的示例都是以这种方式调用的，例如：

```sh
webpack example1.1.js bundle1.1.js
```

如果我们直接执行`webpack`，不加任何参数（且当前目录不存在配置文件），则会显示webpack的帮助信息，里面有非常多的参数可用。事实上，除了我们前面这种出于演示的目的直接在命令行中写参数之外，大部分生产环境下使用时都会需要加上非常多的参数，导致整个命令非常长，既不利于记忆编写，也不利于传播交接等。因此，一般会将配置项写在同目录的`webpack.config.js`中，然后执行`webpack`即可，webpack会从该配置文件中读取参数，此时不需要在命令行中传入任何参数。

```sh
# 执行时webpack会去寻找当前目录下的webpack.config.js当作配置文件使用
webpack

# 也可以用参数-c指定配置文件
webpack -c mycofnig.js
```

配置文件`webpack.config.js`的写法则是：

```javascript
module.exports = {
	// 配置项
};
```

值得注意的是，配置文件是一个真正的JS文件，因此配置项只要是一个对象即可，并不要求是JSON。也就意味着你可以使用表达式，也可以进行动态计算，或者甚至使用继承的方式生成配置项。

## API

API则是指将webpack作为Node.js模块使用，例如：

```javascript
webpack({
	// 配置项
	entry:'main.js',
	...
},callback);
```

到目前为止，我们所有的示例都还没有用到这种用法。但这种用法并不少见，尤其是在和构建工具（如Gulp）搭配使用的时候，都是使用的这种方式。你也可以自己写一段程序来调用webpack。相比CLI模式而言，使用API模式会更加灵活，因为可以与你的各种工具进行集成，甚至共享一些环境变量然后动态生成打包配置等等，在复杂项目中会很有用。

同理，API模式中的配置项对象也是一个真正的对象。