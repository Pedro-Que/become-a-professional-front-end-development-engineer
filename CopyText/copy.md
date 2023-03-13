# 复制文本

## js版本

#### 解释navigator.clipboard
> 剪贴板 [Clipboard](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API) API 为 [Navigator](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator) 接口添加了只读属性 clipboard，该属性返回一个可以读写剪切板内容的 [Clipboard](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard) 对象。在 Web 应用中，剪切板 API 可用于实现**剪切、复制、粘贴**的功能。
> 
> 只有在用户事先**授予网站或应用**对剪切板的**访问许可**之后，才能使用**异步**剪切板读写方法。许可操作必须通过取得权限 [Permissions API](https://developer.mozilla.org/zh-CN/docs/Web/API/Permissions_API) 的 "clipboard-read" 和/或 "clipboard-write" 项获得。


#### 解释document.execCommand
`已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；参见本页面底部的兼容性表格以指导你作出决定。请注意，该特性随时可能无法正常工作。`

> 当一个 HTML 文档切换到设计模式时，document暴露 execCommand 方法，该方法允许运行命令来操纵[可编辑内容区域](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/contenteditable)的元素。
>
> 大多数命令影响document的 [selection](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)（粗体，斜体等），当其他命令插入新元素（添加链接）或影响整行（缩进）。当使用contentEditable时，调用 <font style="background: #f2f1f1;">execCommand()</font> 将影响当前活动的可编辑元素。

```js
/**
 * 复制文本
 * @param {String} value 需要复制的文本
 */
export const copy = value => {
  if (!value) return console.log('无复制内容')
  // 判断当前环境是否支持navigator.clipboard 对象
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(value).then(() => {
      console.log('复制成功')
    }).catch(() => {
      console.log('复制失败')
    })
  } else {
    // 动态创建 input 标签
    const input = document.createElement("input")
    // 将该 input 设为 readonly 防止 iOS 下自动唤起键盘
    input.setAttribute('readonly', true)
    // 将要 copy 的值赋给 input 标签的 value 属性
    input.setAttribute('value', value)
    // 将 input 插入到 body 中
    document.body.appendChild(input)
    // 选中值并复制
    input.select()
    input.setSelectionRange(0, input.value.length)
    const result = document.execCommand('copy')
    if (result) {
      console.log('复制成功')
    } else {
      console.log('复制失败')
    }
    // 操作完成后删除标签
    document.body.removeChild(input)
  }
}
```