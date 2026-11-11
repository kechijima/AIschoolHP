import './style.css'
import { renderIllustrations } from './illustrations.js'

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
