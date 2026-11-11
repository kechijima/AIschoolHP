// やわらかいフラットイラスト（SVG）を生成する
// <div class="illus" data-scene="hero"></div> のように置くと中身が描画される

const C = {
  skin: '#F7D7C0',
  skinShade: '#EDC0A3',
  hairDark: '#3A2A22',
  hairBrown: '#7A4A2E',
  hairLight: '#A86B3C',
  line: '#3A2A22',
  blush: '#F4A9A0',
  gold: '#D4A63A',
  goldLight: '#F3E2B5',
  red: '#C8102E',
  laptop: '#DDE1E7',
  laptopEdge: '#B9C0CA',
  navy: '#26334D',
  white: '#FFFFFF',
}

/**
 * 上半身の人物（viewBox 0 0 120 130 基準）
 * hair: 'short' | 'bun' | 'long' | 'side'
 */
function person({
  hair = 'short',
  hairColor = C.hairDark,
  shirt = '#F2C46D',
  suit = false,
  mood = 'smile', // smile | worry | think
  hand = null, // 'chin' | 'cheek' | 'fist' | 'present' | null
  x = 0,
  y = 0,
  s = 1,
} = {}) {
  const parts = []

  // 体
  if (suit) {
    parts.push(`<path d="M14 130 C14 98 34 86 60 86 C86 86 106 98 106 130 Z" fill="${C.navy}"/>`)
    parts.push(`<path d="M48 86 L60 112 L72 86 Z" fill="${C.white}"/>`)
    parts.push(`<path d="M48 86 L56 100 L52 104 L44 92 Z M72 86 L64 100 L68 104 L76 92 Z" fill="#1B2438"/>`)
  } else {
    parts.push(`<path d="M14 130 C14 98 34 86 60 86 C86 86 106 98 106 130 Z" fill="${shirt}"/>`)
    parts.push(`<path d="M50 86 Q60 96 70 86" fill="none" stroke="${C.white}" stroke-width="3" stroke-linecap="round" opacity=".7"/>`)
  }

  // 首
  parts.push(`<rect x="53" y="70" width="14" height="18" rx="6" fill="${C.skinShade}"/>`)

  // 後ろ髪
  if (hair === 'long') {
    parts.push(`<path d="M34 50 C30 24 50 16 62 17 C82 18 92 34 88 58 C90 70 92 82 86 92 L76 90 L44 90 L34 92 C28 80 32 66 34 50 Z" fill="${hairColor}"/>`)
  }
  if (hair === 'bun') {
    parts.push(`<circle cx="82" cy="30" r="11" fill="${hairColor}"/>`)
  }

  // 顔
  parts.push(`<ellipse cx="60" cy="50" rx="22" ry="25" fill="${C.skin}"/>`)
  parts.push(`<ellipse cx="38.5" cy="53" rx="4" ry="6" fill="${C.skin}"/>`)
  parts.push(`<ellipse cx="81.5" cy="53" rx="4" ry="6" fill="${C.skin}"/>`)

  // 前髪
  if (hair === 'short') {
    parts.push(`<path d="M37 50 C34 26 50 18 63 19 C79 20 88 32 83 50 C82 42 78 36 70 34 C62 40 50 40 42 38 C39 42 38 46 37 50 Z" fill="${hairColor}"/>`)
  } else if (hair === 'side') {
    parts.push(`<path d="M37 52 C33 26 50 17 64 18 C80 19 89 32 84 52 C82 40 76 33 64 31 C58 38 46 41 39 42 Z" fill="${hairColor}"/>`)
  } else {
    // bun / long
    parts.push(`<path d="M37 54 C33 28 48 19 62 19 C78 19 88 30 84 54 C80 40 74 32 62 31 C56 38 46 42 38 44 Z" fill="${hairColor}"/>`)
  }

  // 表情
  if (mood === 'worry') {
    parts.push(`<path d="M47 45 L55 43 M65 43 L73 45" stroke="${C.line}" stroke-width="2" stroke-linecap="round"/>`)
    parts.push(`<circle cx="52" cy="51" r="2.2" fill="${C.line}"/><circle cx="68" cy="51" r="2.2" fill="${C.line}"/>`)
    parts.push(`<path d="M54 64 Q60 60 66 64" fill="none" stroke="${C.line}" stroke-width="2" stroke-linecap="round"/>`)
  } else if (mood === 'think') {
    parts.push(`<path d="M47 44 L55 45 M65 45 L73 44" stroke="${C.line}" stroke-width="2" stroke-linecap="round"/>`)
    parts.push(`<circle cx="52" cy="51" r="2.2" fill="${C.line}"/><circle cx="68" cy="51" r="2.2" fill="${C.line}"/>`)
    parts.push(`<path d="M55 63 L65 63" stroke="${C.line}" stroke-width="2" stroke-linecap="round"/>`)
  } else {
    parts.push(`<path d="M48 51 Q52 47 56 51 M64 51 Q68 47 72 51" fill="none" stroke="${C.line}" stroke-width="2.2" stroke-linecap="round"/>`)
    parts.push(`<path d="M52 60 Q60 68 68 60" fill="${C.white}" stroke="${C.line}" stroke-width="2" stroke-linejoin="round"/>`)
  }
  parts.push(`<ellipse cx="46" cy="58" rx="4" ry="2.5" fill="${C.blush}" opacity=".55"/><ellipse cx="74" cy="58" rx="4" ry="2.5" fill="${C.blush}" opacity=".55"/>`)

  // 手
  const sleeve = suit ? C.navy : shirt
  if (hand === 'chin') {
    parts.push(`<path d="M30 130 C30 110 40 92 52 82" stroke="${sleeve}" stroke-width="13" stroke-linecap="round" fill="none"/>`)
    parts.push(`<ellipse cx="56" cy="76" rx="8" ry="7" fill="${C.skin}"/>`)
  } else if (hand === 'cheek') {
    parts.push(`<path d="M30 130 C26 108 30 88 38 76" stroke="${sleeve}" stroke-width="13" stroke-linecap="round" fill="none"/>`)
    parts.push(`<ellipse cx="41" cy="66" rx="8" ry="9" fill="${C.skin}"/>`)
  } else if (hand === 'fist') {
    parts.push(`<path d="M24 128 C20 110 22 92 30 80" stroke="${sleeve}" stroke-width="13" stroke-linecap="round" fill="none"/>`)
    parts.push(`<circle cx="31" cy="72" r="8" fill="${C.skin}"/>`)
  } else if (hand === 'present') {
    parts.push(`<path d="M96 126 C104 112 108 98 110 88" stroke="${sleeve}" stroke-width="13" stroke-linecap="round" fill="none"/>`)
    parts.push(`<ellipse cx="111" cy="80" rx="7" ry="9" fill="${C.skin}"/>`)
  }

  return `<g transform="translate(${x} ${y}) scale(${s})">${parts.join('')}</g>`
}

function laptop(x, y, w = 70) {
  const h = w * 0.46
  return `<g transform="translate(${x} ${y})">
    <rect x="0" y="0" width="${w}" height="${h}" rx="4" fill="${C.laptop}" stroke="${C.laptopEdge}" stroke-width="2"/>
    <circle cx="${w / 2}" cy="${h / 2}" r="2.5" fill="${C.gold}"/>
    <path d="M-8 ${h} L${w + 8} ${h} L${w + 2} ${h + 6} L-2 ${h + 6} Z" fill="${C.laptopEdge}"/>
  </g>`
}

function bulb(x, y) {
  return `<g transform="translate(${x} ${y})" stroke="${C.gold}" stroke-width="2.5" stroke-linecap="round" fill="none">
    <path d="M0 0 C-10 0 -14 9 -10 16 C-7 20 -6 23 -6 26 L6 26 C6 23 7 20 10 16 C14 9 10 0 0 0 Z" fill="#FFF3C4"/>
    <path d="M-4 31 L4 31"/>
    <path d="M0 -8 L0 -14 M-14 -2 L-19 -7 M14 -2 L19 -7 M-18 12 L-24 12 M18 12 L24 12"/>
  </g>`
}

function sparks(x, y, flip = false) {
  const t = flip ? `translate(${x} ${y}) scale(-1 1)` : `translate(${x} ${y})`
  return `<g transform="${t}" stroke="${C.gold}" stroke-width="3.5" stroke-linecap="round">
    <path d="M0 0 L-6 -12"/><path d="M8 4 L8 -10"/><path d="M-8 8 L-18 2"/>
  </g>`
}

function bars(x, y) {
  return `<g transform="translate(${x} ${y})" fill="${C.gold}">
    <rect x="0" y="20" width="9" height="14" rx="2" opacity=".7"/>
    <rect x="13" y="10" width="9" height="24" rx="2" opacity=".85"/>
    <rect x="26" y="0" width="9" height="34" rx="2"/>
  </g>`
}

function question(x, y) {
  return `<text x="${x}" y="${y}" font-family="sans-serif" font-weight="700" font-size="26" fill="${C.line}">?</text>`
}

function scribble(x, y) {
  return `<g transform="translate(${x} ${y})" fill="none" stroke="${C.line}" stroke-width="1.8" stroke-linecap="round">
    <path d="M0 10 C0 0 14 -4 20 2 C26 -4 38 0 36 10 C42 14 38 24 30 22 C26 28 12 28 8 22 C0 24 -4 14 0 10 Z" fill="${C.white}"/>
    <path d="M8 12 C12 6 18 16 22 10 C26 4 30 14 28 16 C24 20 14 20 12 16"/>
  </g>`
}

function clipboard(x, y) {
  return `<g transform="translate(${x} ${y})">
    <rect x="0" y="0" width="30" height="38" rx="3" fill="#E9C98A" stroke="#C49A4A" stroke-width="2"/>
    <rect x="4" y="6" width="22" height="28" rx="1.5" fill="${C.white}"/>
    <rect x="9" y="-3" width="12" height="6" rx="2" fill="#C49A4A"/>
    <path d="M8 14 H22 M8 20 H22 M8 26 H18" stroke="#D9D9D9" stroke-width="2" stroke-linecap="round"/>
  </g>`
}

function gradCap(x, y) {
  return `<g transform="translate(${x} ${y})">
    <path d="M0 10 L24 0 L48 10 L24 20 Z" fill="${C.navy}"/>
    <path d="M10 14 L10 22 C10 26 38 26 38 22 L38 14 L24 20 Z" fill="#1B2438"/>
    <path d="M44 12 L44 26" stroke="${C.gold}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="44" cy="28" r="3" fill="${C.gold}"/>
  </g>`
}

function svg(viewBox, inner, label) {
  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${inner}</svg>`
}

const scenes = {
  // ヒーロー：笑顔の男女
  hero: () =>
    svg(
      '0 0 300 260',
      `<circle cx="160" cy="130" r="118" fill="${C.goldLight}" opacity=".55"/>
       <circle cx="250" cy="50" r="18" fill="${C.goldLight}"/>
       <circle cx="40" cy="70" r="10" fill="${C.goldLight}"/>
       ${sparks(60, 40)}
       ${sparks(262, 120, true)}
       ${person({ hair: 'bun', hairColor: C.hairBrown, shirt: '#FBEAD6', x: 30, y: 72, s: 1.45 })}
       ${person({ hair: 'side', hairColor: C.hairDark, suit: true, x: 128, y: 38, s: 1.7 })}`,
      '笑顔の受講生のイラスト',
    ),

  worry1: () =>
    svg(
      '0 0 140 130',
      `${scribble(4, 12)}${person({ hair: 'short', shirt: '#D9C7B0', mood: 'think', hand: 'chin', x: 20, y: 0 })}`,
      '悩む男性のイラスト',
    ),
  worry2: () =>
    svg(
      '0 0 140 130',
      `${scribble(96, 18)}${person({ hair: 'long', hairColor: C.hairLight, shirt: '#F6D88C', mood: 'worry', hand: 'cheek', x: 4, y: 0 })}`,
      '頬に手を当てて悩む女性のイラスト',
    ),
  worry3: () =>
    svg(
      '0 0 140 130',
      `${question(22, 34)}${person({ hair: 'short', hairColor: C.hairBrown, shirt: '#F2C46D', mood: 'worry', x: 28, y: 0 })}${laptop(16, 96, 62)}`,
      'パソコンの前で悩む男性のイラスト',
    ),

  goal1: () =>
    svg(
      '0 0 160 130',
      `${bulb(28, 18)}${person({ hair: 'long', hairColor: C.hairBrown, shirt: '#F6D88C', x: 40, y: 0 })}${laptop(30, 98, 70)}`,
      'アイデアを思いつく女性のイラスト',
    ),
  goal2: () =>
    svg(
      '0 0 160 130',
      `${sparks(30, 40)}${sparks(136, 40, true)}${person({ hair: 'short', hairColor: C.hairDark, shirt: '#F2C46D', x: 22, y: 0 })}${laptop(16, 98, 70)}`,
      'パソコンで作業する男性のイラスト',
    ),
  goal3: () =>
    svg(
      '0 0 160 130',
      `${bars(118, 26)}${person({ hair: 'side', hairColor: C.hairBrown, suit: true, hand: 'fist', x: 20, y: 0 })}${laptop(10, 98, 66)}`,
      'ガッツポーズをするスーツの男性のイラスト',
    ),

  consult: () =>
    svg(
      '0 0 150 130',
      `${sparks(120, 22, true)}${person({ hair: 'bun', hairColor: C.hairBrown, shirt: '#F3D9A6', hand: 'present', x: 6, y: 0 })}${clipboard(30, 90)}`,
      '案内をする女性スタッフのイラスト',
    ),

  // 受講の流れ用
  flow1: () =>
    svg('0 0 140 130', `${person({ hair: 'bun', hairColor: C.hairBrown, shirt: '#F3D9A6', hand: 'present', x: 4, y: 0 })}`, '無料相談のイラスト'),
  flow2: () =>
    svg(
      '0 0 160 130',
      `${person({ hair: 'long', hairColor: C.hairLight, shirt: '#F6D88C', x: -6, y: 14, s: 0.9 })}${person({ hair: 'side', hairColor: C.hairDark, suit: true, x: 58, y: 8, s: 0.95 })}`,
      'カウンセリングのイラスト',
    ),
  flow3: () =>
    svg('0 0 140 130', `${person({ hair: 'short', hairColor: C.hairBrown, shirt: '#F2C46D', x: 10, y: 0 })}${laptop(6, 98, 62)}`, 'オンライン授業のイラスト'),
  flow4: () =>
    svg(
      '0 0 140 130',
      `${person({ hair: 'side', hairColor: C.hairDark, suit: true, hand: 'fist', x: 14, y: 4 })}${gradCap(46, 0)}${sparks(124, 50, true)}`,
      '卒業のイラスト',
    ),
}

export function renderIllustrations(root = document) {
  root.querySelectorAll('[data-scene]').forEach((el) => {
    const scene = scenes[el.dataset.scene]
    if (scene) el.innerHTML = scene()
  })
}
