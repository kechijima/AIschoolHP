(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const l={threshold:.1},a=new IntersectionObserver(o=>{o.forEach(r=>{r.isIntersecting&&r.target.classList.add("active")})},l);document.querySelectorAll(".reveal").forEach(o=>{a.observe(o)});const i=document.createElement("style");i.textContent=`
  .reveal.active {
    opacity: 1;
    animation: fadeInUp 0.8s forwards;
  }
  .reveal {
    opacity: 0;
  }
`;document.head.appendChild(i);
