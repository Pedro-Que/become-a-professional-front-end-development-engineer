# 复制文本

## js版本

#### 解释[`navigator.clipboard`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/clipboard)
> 剪贴板 [Clipboard](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API) API 为 [Navigator](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator) 接口添加了只读属性 `clipboard`，该属性返回一个可以读写剪切板内容的 [Clipboard](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard) 对象。在 Web 应用中，剪切板 API 可用于实现**剪切、复制、粘贴**的功能。
> 
> 只有在用户事先**授予网站或应用**对剪切板的**访问许可**之后，才能使用**异步**剪切板读写方法。许可操作必须通过取得权限 [Permissions API](https://developer.mozilla.org/zh-CN/docs/Web/API/Permissions_API) 的 `"clipboard-read"` 和/或 `"clipboard-write"` 项获得。

#### 解释[`document.execCommand`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand)
`已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；参见本页面底部的兼容性表格以指导你作出决定。请注意，该特性随时可能无法正常工作。`

> 当一个 HTML 文档切换到设计模式时，`document`暴露 `execCommand` 方法，该方法允许运行命令来操纵[可编辑内容区域](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/contenteditable)的元素。
>
> 大多数命令影响`document`的 [selection](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)（粗体，斜体等），当其他命令插入新元素（添加链接）或影响整行（缩进）。当使用`contentEditable`时，调用`execCommand()`将影响当前活动的可编辑元素。

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

## ts版本

跟js版本差不多，这里就不做过多的解释了。

```ts
/**
 * 复制文本
 * @param {String} value 需要复制的文本
 */
export const copy = (value: string) => {
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
    input.setAttribute('readonly', 'true')
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

## [vue2指令版本](https://v2.cn.vuejs.org/v2/guide/custom-directive.html)

#### 解释其中使用的[钩子函数](https://v2.cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0)
> `bind`：**只调用一次**，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
> `componentUpdated`：指令所在**组件的 VNode 及其子 VNode 全部更新**后调用。
> `unbind`：**只调用一次**，指令与元素**解绑时**调用。
> 
> 还有一些没使用的钩子请参考[官网钩子函数](https://v2.cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0)

#### 解释[钩子函数参数](https://v2.cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0)
> `el`：指令所绑定的元素，可以用来直接操作 **DOM**。
> `binding`：一个对象，包含以下 property：
> * `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
> 
> 还有一些没解释的参数请参考[官网钩子函数参数](https://v2.cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0)

```js
/**
 * 点击复制
 */
export default {
  bind(el, { value }) {
    el.$value = value
    el.handler = () => {
      if (!el.$value) return console.log('无复制内容')
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
        input.setAttribute('value', el.$value)
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
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }
}
```

## vue2+ts指令版本

跟vue2指令版本差不多，这里就不做过多的解释了。

```ts
import { Directive, DirectiveBinding } from 'vue'

interface MyHTMLElement extends HTMLElement {
  $value?: string;
  handler(): void;
}

/**
 * 点击复制
 */
const copy: Directive = {
  bind(el: MyHTMLElement, binding: DirectiveBinding<string>) {
    el.$value = binding.value
    el.handler = () => {
      if (!el.$value) return console.log('无复制内容')
      // 判断当前环境是否支持navigator.clipboard 对象
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(el.$value).then(() => {
          console.log('复制成功')
        }).catch(() => {
          console.log('复制失败')
        })
      } else {
        // 动态创建 input 标签
        const input = document.createElement("input")
        // 将该 input 设为 readonly 防止 iOS 下自动唤起键盘
        input.setAttribute('readonly', 'true')
        // 将要 copy 的值赋给 input 标签的 value 属性
        input.setAttribute('value', el.$value)
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
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el: MyHTMLElement, binding: DirectiveBinding<string>) {
    el.$value = binding.value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el: MyHTMLElement) {
    el.removeEventListener('click', el.handler)
  }
}

export default copy
```

## [vue3指令版本](https://cn.vuejs.org/guide/reusability/custom-directives.html)

#### 解释其中使用的[钩子函数](https://cn.vuejs.org/guide/reusability/custom-directives.html#directive-hooks)
> `mounted`：在绑定元素的**父组件及他自己的所有子节点**都**挂载完成后**调用
> `updated`：在绑定元素的**父组件及他自己的所有子节点都更新后**调用
> `unmounted`：绑定元素的**父组件卸载后**调用
>
> 还有一些没解释的钩子函数请参考[官网指令钩子](https://cn.vuejs.org/guide/reusability/custom-directives.html#directive-hooks)

#### 解释[钩子函数参数](https://cn.vuejs.org/guide/reusability/custom-directives.html#hook-arguments)
> `el`：指令绑定到的元素。这可以用于直接操作 **DOM**。
> `binding`：一个对象，包含以下属性。
> * `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
>
> 还有一些没解释的参数请参考[官网钩子参数](https://cn.vuejs.org/guide/reusability/custom-directives.html#hook-arguments)

```js
/**
 * 点击复制
 */
export default {
  mounted(el, { value }) {
    el.$value = value
    el.handler = () => {
      if (!el.$value) return console.log('无复制内容')
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
        input.setAttribute('value', el.$value)
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
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  updated(el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unmounted(el) {
    el.removeEventListener('click', el.handler)
  }
}
```

## vue3+ts指令版本

跟vue3指令版本差不多，这里就不做过多的解释了。

```ts
import { Directive, DirectiveBinding } from 'vue'

interface MyHTMLElement extends HTMLElement {
  $value?: string;
  handler(): void;
}

/**
 * 点击复制
 */
const copy: Directive = {
  mounted(el: MyHTMLElement, binding: DirectiveBinding<string>) {
    el.$value = binding.value
    el.handler = () => {
      if (!el.$value) return console.log('无复制内容')
      // 判断当前环境是否支持navigator.clipboard 对象
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(el.$value).then(() => {
          console.log('复制成功')
        }).catch(() => {
          console.log('复制失败')
        })
      } else {
        // 动态创建 input 标签
        const input = document.createElement("input")
        // 将该 input 设为 readonly 防止 iOS 下自动唤起键盘
        input.setAttribute('readonly', 'true')
        // 将要 copy 的值赋给 input 标签的 value 属性
        input.setAttribute('value', el.$value)
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
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  updated(el: MyHTMLElement, binding: DirectiveBinding<string>) {
    el.$value = binding.value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unmounted(el: MyHTMLElement) {
    el.removeEventListener('click', el.handler)
  }
}

export default copy
```