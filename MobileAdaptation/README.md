# 移动端适配

## 前言

移动互联网发展至今，各种移动设备应运而生，但它们的**物理分辨率**可以说是**五花八门**，一般情况UI会为我们提供375尺寸或者750尺寸的设计稿，所以为了让H5页面能够在这些**不同的设备**上尽量**表现的一致**，前端工程师就不得不对页面进行**移动端适配**了。

## 前置知识

在学习移动端适配前我们需要了解一些相关的前置知识。

| 设备                  | 平台    | 屏幕尺寸（in） | 长宽比 | 逻辑像素（dp） | 物理像素（px） | 倍率 |
| --------------------- | ------- | -------------- | ------ | -------------- | -------------- | ---- |
| Android One           | Android | 4.5    2.2*3.9 | 16:9   | 320*569        | 480*854        | 1.5  |
| Moto G                | Android | 4.5    2.2*3.9 | 16:9   | 360*640        | 720*1280       | 2    |
| Moto X                | Android | 4.7    2.3*4.1 | 16:9   | 360*640        | 720*1280       | 2    |
| Moto X (2nd Gen)      | Android | 5.2    2.5*4.5 | 16:9   | 360*640        | 1080*1920      | 3    |
| Nexus 5               | Android | 5.0    2.4*4.3 | 16:9   | 360*640        | 1080*1920      | 3    |
| Samsung Galaxy Note 4 | Android | 5.7    2.8*5.0 | 16:9   | 480*853        | 1440*2560      | 3    |
| Samsung Galaxy S5     | Android | 5.1    2.9*5.6 | 16:9   | 360*640        | 1080*1920      | 3    |
| Samsung Galaxy S6     | Android | 5.1    2.5*4.4 | 16:9   | 360*640        | 1440*2560      | 4    |
| iPhone                | IOS     | 3.5    1.9*2.9 | 3:2    | 320*480        | 320*480        | 1    |
| iPhone 4              | IOS     | 3.5    2.0*2.9 | 3:2    | 320*480        | 640*960        | 2    |
| iPhone 5              | IOS     | 4.0    2.0*3.5 | 16:9   | 320*568        | 640*1136       | 2    |
| iPhone 6              | IOS     | 4.7    2.3*4.1 | 16:9   | 375*667        | 750*1334       | 2    |

#### 屏幕尺寸

> 屏幕尺寸是指显示器、电视等**显示设备的对角线长度**，通常用英寸（inch）作为单位表示。`1英寸=2.54厘米`

电子设备一般都用英寸来描述屏幕的物理大小，比如我们使用的手机、电脑等设备。常见的电脑尺寸有13、22、27英寸等。英寸（inch，缩写为in）在荷兰语中的意思指的是大拇指，一英寸就是指普通人的拇指宽度。

#### 像素pixel

> 像素(pixel)是**计算机图像**处理中**最基本的单元**，指的是图像中**最小的可控制的点**。每个像素都有一个特定的位置和色彩值，用于构成整个图像。图像的清晰度、细节和颜色深度等特性都取决于像素的数量和排列方式。在数字图像中，像素通常用二进制数据表示，每个像素的色彩值由若干位的二进制数来表示，每位二进制数被称为一个“比特（bit）”，比特的数量越多，则可以表示的颜色数量也越多。例如，一张 800x600 像素的图像，就是由 480,000 个像素组成的。

#### 屏幕分辨率

> 屏幕分辨率是指**显示设备**在水平和垂直方向上**所能显示的像素点数**，通常用宽度像素数×高度像素数的方式表示。例如，1366×768 的屏幕分辨率指的是显示器在水平方向上有 1366 个像素，在垂直方向上有 768 个像素。屏幕分辨率越高，能够显示的图像细节和清晰度就越高，图像也会更加真实、自然。

我们可以看到上图中有两种像素：逻辑像素与物理像素，并且它们数值不一样，还有就是为什么一般UI给我们提供的设计稿上的分辨率与真实机型的分辨率不一样。

#### 物理像素

> 物理像素（也称为设备像素）是**显示设备**中的**最小物理单元**，用于在屏幕上显示图像和文本。**物理像素的数量决定了屏幕的分辨率，即屏幕上可以显示多少像素。**
>
> 每个物理像素由一个红、绿、蓝（RGB）三个子像素构成，它们合在一起形成一个完整的像素。在计算机显示器上，物理像素通常呈现为一个小的正方形或矩形。物理像素的大小可以根据显示器的大小和分辨率而不同。
>
> 在移动设备上，一个物理像素通常对应于一个逻辑像素（也称为CSS像素），即网页设计师所使用的像素单位。这意味着在高分辨率屏幕上，一个物理像素可能显示多个逻辑像素，使文本和图像看起来更加清晰和锐利。

在同一个设备上，它的物理像素是固定的，也就是厂家在生产显示设备时就决定的实际点的个数，对于不同设备物理像素点的大小是不一样的。（设备控制显示的最小单位，我们常说的1920*1080像素分辨素就是用的物理像素单位）

如果都使用物理像素就会带来问题：举个例子，21英寸显示器的分辨率是1440x1080，5.8英寸的iPhone X的分辨率是2436×1125，我们用CSS画一条线，其长度是20px，如果都以物理像素作为度量单位，那么在显示器上看起来正常，在iPhone X屏幕上就变得非常小。

#### 逻辑像素

> 逻辑像素（也称为CSS像素）是一种**虚拟的单位**，通常用于网页设计中。它是在**网页上**显示文本和图像的**基本单位**，用于定义元素的大小、位置和间距等。
>
> 逻辑像素的大小并**不是固定的**，它可以根据**显示设备的分辨率和缩放级别而变化**。在高分辨率屏幕上，一个逻辑像素可以对应多个物理像素，以确保图像和文本的清晰度和锐利度。而在低分辨率屏幕上，一个逻辑像素可以对应一个物理像素。
>
> 逻辑像素是一种**与设备无关的像素单位**，因此可以在不同设备上保持一致的大小和外观。这使得网页设计师可以更好地控制网页的布局和外观，使其在不同设备上都能够呈现出良好的效果。

OK，其实乔大大在之前就想到了会有这个问题，苹果在iPhone4的发布会上首次提出了**Retina Display（视网膜屏幕）**的概念，在iPhone4使用的视网膜屏幕中，把4个像素当1个像素使用，这样让屏幕看起来更精致，并且在不同屏幕中，相同的逻辑像素呈现的尺寸是一致的。所以高分辨率的设备，多了一个逻辑像素。我们从第一张图中可以看到不同设备的逻辑像素仍然是有差异的，只不过差异没有物理像素那么大，于是便诞生了移动端页面需要适配这个问题。（与设备无关的逻辑像素，代表可以通过程序控制使用的虚拟像素）

#### PPI

> PPI全称为Pixels Per Inch，指的是**每英寸像素数量**，是用于测量屏幕、打印机和其他显示设备分辨率的单位。PPI值越高，屏幕上的图像和文本就会更清晰、更锐利。
>
> 在屏幕上，PPI是根据屏幕分辨率和屏幕尺寸计算出来的。例如，一个1920x1080像素分辨率的23英寸屏幕，其PPI为96。而同样分辨率的13英寸屏幕，其PPI则更高，大约为168。
>
> 在打印机上，PPI指的是打印机每英寸可以打印的点数。这个概念类似于屏幕上的PPI，但是在打印机上它被称为DPI（Dots Per Inch）。
>
> 需要注意的是，PPI并不是唯一决定屏幕或打印品质的因素，其他因素如显示技术、色彩表现、对比度等也会影响显示效果。但PPI是衡量设备分辨率的重要指标之一。

它的计算公式为：`PPI = √(横向像素数² + 纵向像素数²) / 屏幕对角线尺寸`（其中，横向像素数和纵向像素数是屏幕的水平像素数和垂直像素数，屏幕对角线尺寸是指屏幕的对角线长度，通常以英寸（inch）为单位）

* PPI**低于100**的屏幕，像素密度**较低**，显示效果**相对较差**，特别是在显示小字体、线条等细节时会出现**锯齿或模糊**现象。
* PPI在**100-200之间**的屏幕，像素密度**较为适中**，显示效果**相对较好**，特别是在**日常使用场景下效果良好**。
* PPI**超过200**的屏幕，像素密度**较高**，显示效果**非常出色**，特别是在高清视频、游戏等要求**高清晰度的场景下表现非常突出**。

#### DPR

> DPR全称为Device Pixel Ratio，指的是**设备像素比**，是用于描述**设备像素**和**CSS像素**之间关系的**比率**。在高分辨率屏幕设备上，一个CSS像素可能对应多个设备像素，这时DPR可以告诉浏览器如何渲染网页，以适应不同的设备像素密度。

它的计算公式为：`DPR = 物理像素宽度 / CSS像素宽度`

当设备像素比为1:1时，使用1（1×1）个设备像素显示1个CSS像素；

当设备像素比为2:1时，使用4（2×2）个设备像素显示1个CSS像素；

当设备像素比为3:1时，使用9（3×3）个设备像素显示1个CSS像素。

#### 概念关系图

屏幕尺寸、屏幕分辨率-->对角线分辨率/屏幕尺寸-->屏幕像素密度PPI | 设备像素比dpr = 物理像素 / 设备独立像素dip(dp) | viewport: scale | CSS像素px

#### Viewport

Viewport（视口）是指**浏览器窗口**或**app中的webview**显示网页的区域。一般来讲PC端的视口指的是浏览器窗口区域，而移动端就有点复杂，它有三个视口：

* **layout viewport**：布局视口
* **visual viewport**：视觉视口
* **ideal viewport**：理想视口

##### layout viewport

布局视口是指网页中用于**布局的可视区域的大小**。它是由**浏览器**提出的一种**虚拟的布局视口**，用来**解决**页面在**手机上显示的问题**。这种视口可以通过`<meta>`标签设置`viewport`来改变。移动设备上的浏览器都会把自己默认的viewport设为980px或1024px（也可能是其它值，这个是由设备自己决定的），但带来的后果就是浏览器会出现横向滚动条，因为浏览器可视区域的宽度是比这个默认的viewport的宽度要小的。

我们可以通过`document.documentElement.clientWidth`来获取布局视口大小

##### visual viewport

视觉视口是指**浏览器**窗口中**可见的区域**，即用户可以看到的网页内容的部分。默认与当前浏览器窗口大小相等，当用户对浏览器进行缩放时，不会改变布局视口的大小，但会改变视觉窗口的大小。

我们可以通过`window.innerWidth`来获取视觉视口大小。

##### ideal viewport

理想中的视口。这个概念最早由苹果提出，其他浏览器厂商陆续跟进，目的是解决在布局视口下页面元素过小的问题，显示在理想视口中的页面具有最理想的宽度，用户无需进行缩放。所谓理想视口，即页面绘制区域可以完美适配设备宽度的视口大小，不需要出现滚动条即可正常查看网站的所有内容，且文字图片清晰，如所有iphone的理想视口宽度都为320px，安卓设备的理想视口有320px、360px等等。

当页面缩放比例为`100%`时，`理想视口 = 视觉视口`。

我们可以通过`screen.width`来获取理想视口大小。

#### meta viewport

对于移动端页面，可以采用`<meta>`标签来配置视口大小和缩放等。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes">
```

meta viewport 元标签的常用属性包括：

* `width`: 指定视口的宽度，可以是具体像素值，也可以是设备独立像素 (dp)，还可以设为`device-width`这样的关键字。表示设备的实际宽度，一般为了自适应布局，普遍的做法是将width设置为`device-width`。
* `height`: 指定视口的高度，可以是具体像素值，也可以是设备独立像素 (dp)，还可以设为`device-height`这样的关键字。表示设备的实际高度，一般不会设置视窗的高度，这样内容超出的话采用滚动方式浏览。
* `initial-scale`: 指定初始缩放比例，可以配置`0.0～10`的数字，一般设置为 `1.0`。**initial-scale=1表示不进行缩放，视窗刚好等于理想视窗**，当大于1时表示将视窗进行放大，小于1时表示缩小。这里只表示初始视窗缩放值，用户也可以自己进行缩放，例如双指拖动手势缩放或者双击手势放大。**安卓设备上的initial-scale默认值： 无默认值**，一定要设置，这个属性才会起作用。在iphone和ipad上，无论你给viewport设的宽的是多少，如果**没有指定默认的缩放值**，则iphone和ipad会**自动计算这个缩放值**，以达到当前页面不会出现横向滚动条（或者说viewport的宽度就是屏幕的宽度）的目的。
* `minimum-scale`: 指定允许的**最小缩放比例**，可以配置`0.0～10`的数字。通常情况下，不会定义该属性的值，页面太小将难以浏览。
* `maximum-scale`: 指定允许的**最大缩放比例**，可以配置`0.0～10`的数字。
* `user-scalable`: 是否允许用户手动缩放页面，可以设置为 `yes` 或 `no`。当配置成`no`时，用户将不能通过手势操作的方式对页面进行缩放。

这里需要注意的是`viewport`只对**移动端浏览器有效**，对**PC端浏览器**是**无效**的。

#### 适配与缩放

为了让移动端页面获得更好的显示效果，我们必须让**布局视口**、**视觉视口**都尽可能**等于理想视口**，所以我们一般会设置`width=device-width`，这就相当于让**布局视口等于理想视口**；设置`initial-scale=1.0`，相当于让**视觉视口等于理想视口**；

上面提到`width`可以决定布局视口的宽度，实际上它并不是布局视口的唯一决定性因素，设置`initial-scale`也有肯能影响到布局视口，因为布局视口宽度取的是`width`和视觉视口宽度的最大值。

例如：若手机的理想视口宽度为`400px`，设置`width=device-width`，`initial-scale=2`，此时`视觉视口宽度 = 理想视口宽度 / initial-scale即200px`，布局视口取两者最大值即`device-width 400px`。

若设置`width=device-width`，`initial-scale=0.5`，此时`视觉视口宽度 = 理想视口宽度 / initial-scale即800px`，布局视口取两者最大值即`800px`。

## 移动端适配方案

当我们在做H5移动端开发时，用到的最多的单位是`PX`，也就是**CSS像素**，当页面缩放比为`1:1`时，**一个CSS像素等于一个设备独立像素**。但**CSS像素**是很容易**被改变**的，比如用户对页面进行**放大**，CSS像素会被放大，此时的CSS像素会跨越更多的设备像素。

`页面缩放系数 = CSS像素 / 设备独立像素`

#### [rem适配](https://github.com/Pedro-Que/become-a-professional-front-end-development-engineer/tree/main/MobileAdaptation/rem)

> rem（root em）是CSS3新增的一个相对单位，是指相对于根元素字体大小的单位，它的大小是相对于文档根元素的字体大小而定的。

基于`rem`单位的定义，我们只需要控制不同设备下的`html`的`font-size`大小便可以实现适配，对于不需要做适配的属性值我们依然使用`px`作为单位。

##### [js方法](https://github.com/Pedro-Que/become-a-professional-front-end-development-engineer/blob/main/MobileAdaptation/rem/js/demo.html)

通过js动态获取当前布局视口的宽度除以我们预定的值，得到并设置不同设备下`html`的`font-size`的大小

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .box {
      width: 15rem;
      height: 4rem;
      font-size: .8rem;
      background: #43c985;
    }
  </style>
  <script>
    function setRootRem() {
      const root = document.documentElement
      /**
       * 以iPhone6为例，布局视口为375px，我们把它分成15份，则1rem = 25px
       * 这时UI给定的一个的宽为375px（设备独立像素）
       * 我们只需要将它设置为375 / 25 = 15rem
       */
      const scale = root.clientWidth / 15
      root.style.fontSize = `${scale}px`
    }
    setRootRem()
    window.addEventListener('resize', setRootRem)
  </script>
</head>

<body>
  <div class="box">PedroQue99</div>
</body>

</html>
```

![iPhone6效果如图所示](https://upload-images.jianshu.io/upload_images/19735956-9e19301c8eee54f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![iPhone5效果如图所示](https://upload-images.jianshu.io/upload_images/19735956-af1b730e5b82b645.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

OK！这里我们可以看到，选择不同设备进行测试时，根节点的`font-size`会随着设备的布局视口的宽度变化而变化，所以这里的元素宽度15rem永远等于当前布局视口的宽度，`font-size`也会随设备变化而变化。这就是所谓的移动端适配，其实这种方案最早是由阿里提出来的一个开源移动端适配解决方案`flexible`，原理非常简单。

##### [css媒体查询](https://github.com/Pedro-Que/become-a-professional-front-end-development-engineer/blob/main/MobileAdaptation/rem/css/adaptation.css)

使用css媒体查询直接设置一些常用设备下的`html`的`font-size`大小。

```css
/* 命名为 adaptation.css */
@media (min-width:240px) {
  html {
    font-size: 16px;
  }
}

@media (min-width:320px) {
  html {
    font-size: 21.33333333px;
  }
}

@media (min-width:360px) {
  html {
    font-size: 24px;
  }
}

@media (min-width:375px) {
  html {
    font-size: 25px;
  }
}

@media (min-width:384px) {
  html {
    font-size: 25.6px;
  }
}

@media (min-width:400px) {
  html {
    font-size: 26.66666667px;
  }
}

@media (min-width:411px) {
  html {
    font-size: 27.4px;
  }
}

@media (min-width:414px) {
  html {
    font-size: 27.6px;
  }
}

@media (min-width:424px) {
  html {
    font-size: 28.26666667px;
  }
}

@media (min-width:480px) {
  html {
    font-size: 32px;
  }
}

@media (min-width:540px) {
  html {
    font-size: 36px;
  }
}
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>Document</title>
  <!-- 使用上述文件 -->
  <link rel="stylesheet" href="./adaptation.css">
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .box {
      width: 15rem;
      height: 4rem;
      font-size: .8rem;
      background: #43c985;
    }
  </style>
</head>

<body>
  <div class="box">PedroQue99</div>
</body>

</html>
```

![iPhone6效果如图所示](https://upload-images.jianshu.io/upload_images/19735956-51453e3b7046cac6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![iPhone5效果如图所示](https://upload-images.jianshu.io/upload_images/19735956-8ab51059a0627133.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

OK！这里我们可以看到，测试结果跟上面的`js方法`差不多。但是这种方法没有`js方法`准确，毕竟它只是定义了一些**常用**机型的根节点的`font-size`大小，而且也不够灵活。

##### [scss媒体查询]()