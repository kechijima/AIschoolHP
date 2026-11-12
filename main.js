import './style.css'
import { HTMLProcessingParser } from '@budoux/html_processor.js'
import { model as jaModel } from '@budoux/data/models/ja.js'
import { renderIllustrations } from './illustrations.js'

// 文節の途中で改行しないよう、BudouX で改行位置を入れる
// （iPhone の Safari は CSS の word-break: auto-phrase に未対応のため）
const parser = new HTMLProcessingParser(jaModel)
document.querySelectorAll('main, .footer').forEach((el) => parser.applyToElement(el))

renderIllustrations()

// スクロールでふわっと表示
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.1 })

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

// スマホ用メニュー
const header = document.querySelector('.header')
const menuBtn = document.querySelector('.menu-btn')
menuBtn.addEventListener('click', () => {
  const open = header.classList.toggle('nav-open')
  menuBtn.setAttribute('aria-expanded', String(open))
  menuBtn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く')
})
document.querySelectorAll('.nav-links a').forEach((a) =>
  a.addEventListener('click', () => {
    header.classList.remove('nav-open')
    menuBtn.setAttribute('aria-expanded', 'false')
  }),
)
