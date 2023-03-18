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
        // 动态创建 textarea 标签
        const textarea = document.createElement('textarea')
        // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘
        textarea.setAttribute('readonly', 'true')
        // 将要 copy 的值赋给 textarea 标签的 value 属性
        textarea.setAttribute('value', el.$value)
        // 将 textarea 插入到 body 中
        document.body.appendChild(textarea)
        // 选中值并复制
        textarea.select()
        textarea.setSelectionRange(0, textarea.value.length)
        const result = document.execCommand('copy')
        if (result) {
          console.log('复制成功')
        } else {
          console.log('复制失败')
        }
        // 操作完成后删除标签
        document.body.removeChild(textarea)
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