// 線画に色をのせた、やわらかいタッチのイラスト（SVG）を生成する
// <div class="illus" data-scene="hero"></div> のように置くと中身が描画される

const C = {
  skin: '#FBE1CF',
  skinShade: '#F2CBB1',
  hairDark: '#5A4334',
  hairBrown: '#9A6A48',
  hairLight: '#C08A5C',
  line: '#5B4636', // 線画の色（真っ黒ではなく茶色でやわらかく）
  blush: '#F6B1A6',
  gold: '#D9AE4E',
  goldLight: '#F6E7C3',
  red: '#D2384E',
  laptop: '#EEF0F3',
  laptopEdge: '#C9CED6',
  navy: '#4A5878',
  navyDark: '#3A4664',
  white: '#FFFFFF',
}

// 線画の共通属性
const OL = `stroke="${C.line}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`
const OL_THIN = `stroke="${C.line}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"`

// 太い線で描く腕（線画の縁取り → 色の順に重ねる）
function arm(d, color) {
  return `<path d="${d}" stroke="${C.line}" stroke-width="17.5" stroke-linecap="round" fill="none"/>
    <path d="${d}" stroke="${color}" stroke-width="13" stroke-linecap="round" fill="none"/>`
}

/**
 * 上半身の人物（viewBox 0 0 120 130 基準）
 * hair: 'short' | 'bun' | 'long' | 'side'
 */
function person({
  hair = 'short',
  hairColor = C.hairDark,
  shirt = '#F5CF7E',
  suit = false,
  mood = 'smile', // smile | worry | think
  hand = null, // 'chin' | 'cheek' | 'fist' | 'present' | null
  x = 0,
  y = 0,
  s = 1,
} = {}) {
  const p = []

  // 後ろ髪
  if (hair === 'long') {
    p.push(`<path d="M34 50 C30 24 50 16 62 17 C82 18 92 34 88 58 C90 70 92 82 86 92 L34 92 C28 80 32 66 34 50 Z" fill="${hairColor}" ${OL}/>`)
  }
  if (hair === 'bun') {
    p.push(`<circle cx="82" cy="29" r="11" fill="${hairColor}" ${OL}/>`)
  }

  // 体
  if (suit) {
    p.push(`<path d="M14 131 C14 98 34 86 60 86 C86 86 106 98 106 131" fill="${C.navy}" ${OL}/>`)
    p.push(`<path d="M49 87 L60 112 L71 87 Z" fill="${C.white}" ${OL_THIN}/>`)
    p.push(`<path d="M49 87 L56 101 L51 105 L43 93 Z M71 87 L64 101 L69 105 L77 93 Z" fill="${C.navyDark}" ${OL_THIN}/>`)
  } else {
    p.push(`<path d="M14 131 C14 98 34 86 60 86 C86 86 106 98 106 131" fill="${shirt}" ${OL}/>`)
    p.push(`<path d="M50 88 Q60 97 70 88" fill="none" ${OL_THIN}/>`)
  }

  // 首
  p.push(`<path d="M53 72 L53 87 Q60 92 67 87 L67 72 Z" fill="${C.skinShade}" ${OL_THIN}/>`)

  // 耳 → 顔
  p.push(`<ellipse cx="38.5" cy="53" rx="4.5" ry="6.5" fill="${C.skin}" ${OL_THIN}/>`)
  p.push(`<ellipse cx="81.5" cy="53" rx="4.5" ry="6.5" fill="${C.skin}" ${OL_THIN}/>`)
  p.push(`<ellipse cx="60" cy="50" rx="22" ry="25" fill="${C.skin}" ${OL}/>`)

  // 前髪
  if (hair === 'short') {
    p.push(`<path d="M37 50 C34 26 50 18 63 19 C79 20 88 32 83 50 C82 42 78 36 70 34 C62 40 50 40 42 38 C39 42 38 46 37 50 Z" fill="${hairColor}" ${OL}/>`)
    p.push(`<path d="M52 25 C58 23 64 23 70 26" fill="none" stroke="${C.white}" stroke-width="2" stroke-linecap="round" opacity=".45"/>`)
  } else if (hair === 'side') {
    p.push(`<path d="M37 52 C33 26 50 17 64 18 C80 19 89 32 84 52 C82 40 76 33 64 31 C58 38 46 41 39 42 Z" fill="${hairColor}" ${OL}/>`)
    p.push(`<path d="M55 23 C62 21 70 22 76 26" fill="none" stroke="${C.white}" stroke-width="2" stroke-linecap="round" opacity=".45"/>`)
  } else {
    p.push(`<path d="M37 54 C33 28 48 19 62 19 C78 19 88 30 84 54 C80 40 74 32 62 31 C56 38 46 42 38 44 Z" fill="${hairColor}" ${OL}/>`)
    p.push(`<path d="M50 25 C57 22 66 22 73 25" fill="none" stroke="${C.white}" stroke-width="2" stroke-linecap="round" opacity=".45"/>`)
  }

  // 表情
  const L = `stroke="${C.line}" stroke-width="2.2" stroke-linecap="round" fill="none"`
  if (mood === 'worry') {
    p.push(`<path d="M47 44 L55 42 M65 42 L73 44" ${L}/>`)
    p.push(`<circle cx="52" cy="51" r="2.3" fill="${C.line}"/><circle cx="68" cy="51" r="2.3" fill="${C.line}"/>`)
    p.push(`<path d="M54 64 Q60 60 66 64" ${L}/>`)
  } else if (mood === 'think') {
    p.push(`<path d="M47 44 L55 45 M65 45 L73 44" ${L}/>`)
    p.push(`<circle cx="52" cy="51" r="2.3" fill="${C.line}"/><circle cx="68" cy="51" r="2.3" fill="${C.line}"/>`)
    p.push(`<path d="M55 63 Q60 62 65 63" ${L}/>`)
  } else if (mood === 'gentle') {
    // 目を開けて口を閉じた、穏やかな微笑み
    p.push(`<ellipse cx="52" cy="50" rx="2.4" ry="2.8" fill="${C.line}"/><ellipse cx="68" cy="50" rx="2.4" ry="2.8" fill="${C.line}"/>`)
    p.push(`<circle cx="52.8" cy="49" r=".8" fill="${C.white}"/><circle cx="68.8" cy="49" r=".8" fill="${C.white}"/>`)
    p.push(`<path d="M54 61 Q60 65 66 61" ${L}/>`)
  } else if (mood === 'open') {
    // 目を開けて口を開けた、明るい笑顔
    p.push(`<ellipse cx="52" cy="50" rx="2.4" ry="2.8" fill="${C.line}"/><ellipse cx="68" cy="50" rx="2.4" ry="2.8" fill="${C.line}"/>`)
    p.push(`<circle cx="52.8" cy="49" r=".8" fill="${C.white}"/><circle cx="68.8" cy="49" r=".8" fill="${C.white}"/>`)
    p.push(`<path d="M53 59 Q60 69 67 59 Z" fill="#E8837A" ${OL_THIN}/>`)
  } else if (mood === 'wink') {
    p.push(`<path d="M48 51 Q52 47 56 51" ${L}/>`)
    p.push(`<ellipse cx="68" cy="50" rx="2.4" ry="2.8" fill="${C.line}"/><circle cx="68.8" cy="49" r=".8" fill="${C.white}"/>`)
    p.push(`<path d="M53 60 Q60 67 67 60" ${L}/>`)
  } else if (mood === 'focus') {
    // 真剣・集中（口はまっすぐ、眉を少し上げる）
    p.push(`<path d="M47 44 L55 43 M65 43 L73 44" ${L}/>`)
    p.push(`<ellipse cx="52" cy="51" rx="2.3" ry="2.6" fill="${C.line}"/><ellipse cx="68" cy="51" rx="2.3" ry="2.6" fill="${C.line}"/>`)
    p.push(`<path d="M56 62 L64 62" ${L}/>`)
  } else {
    p.push(`<path d="M48 51 Q52 47 56 51 M64 51 Q68 47 72 51" ${L}/>`)
    p.push(`<path d="M52 60 Q60 68 68 60 Z" fill="${C.white}" ${OL_THIN}/>`)
  }
  p.push(`<ellipse cx="46" cy="58" rx="4.5" ry="2.8" fill="${C.blush}" opacity=".7"/><ellipse cx="74" cy="58" rx="4.5" ry="2.8" fill="${C.blush}" opacity=".7"/>`)

  // 手
  const sleeve = suit ? C.navy : shirt
  const hand_ = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${C.skin}" ${OL}/>`
  if (hand === 'chin') {
    p.push(arm('M30 128 C30 110 40 92 52 82', sleeve), hand_(56, 76, 8, 7))
  } else if (hand === 'cheek') {
    p.push(arm('M30 128 C26 108 30 88 38 76', sleeve), hand_(41, 66, 8, 9))
  } else if (hand === 'fist') {
    p.push(arm('M24 126 C20 110 22 92 30 80', sleeve), hand_(31, 72, 8, 8))
  } else if (hand === 'present') {
    p.push(arm('M96 124 C104 112 108 98 110 88', sleeve), hand_(111, 80, 7, 9))
  }

  return `<g transform="translate(${x} ${y}) scale(${s})">${p.join('')}</g>`
}

function laptop(x, y, w = 70) {
  const h = w * 0.46
  return `<g transform="translate(${x} ${y})">
    <rect x="0" y="0" width="${w}" height="${h}" rx="4" fill="${C.laptop}" ${OL}/>
    <circle cx="${w / 2}" cy="${h / 2}" r="2.8" fill="${C.gold}"/>
    <path d="M-8 ${h} L${w + 8} ${h} L${w + 2} ${h + 6} L-2 ${h + 6} Z" fill="${C.laptopEdge}" ${OL_THIN}/>
  </g>`
}

function bulb(x, y) {
  return `<g transform="translate(${x} ${y})">
    <path d="M0 0 C-10 0 -14 9 -10 16 C-7 20 -6 23 -6 26 L6 26 C6 23 7 20 10 16 C14 9 10 0 0 0 Z" fill="#FFF1BF" ${OL}/>
    <path d="M-5 31 L5 31" ${OL}/>
    <path d="M0 -7 L0 -13 M-14 -2 L-19 -7 M14 -2 L19 -7 M-18 12 L-24 12 M18 12 L24 12" stroke="${C.gold}" stroke-width="2.6" stroke-linecap="round"/>
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
    <rect x="0" y="20" width="9" height="14" rx="2" fill="#EBCB82" ${OL_THIN}/>
    <rect x="13" y="10" width="9" height="24" rx="2" fill="#E2BC66" ${OL_THIN}/>
    <rect x="26" y="0" width="9" height="34" rx="2" fill="${C.gold}" ${OL_THIN}/>
  </g>`
}

function question(x, y) {
  return `<text x="${x}" y="${y}" font-family="sans-serif" font-weight="700" font-size="26" fill="${C.line}">?</text>`
}

// モヤモヤ：竜巻のように渦を巻き、下に線が伸びるぐるぐる（x, y は上端の中心）
function moya(x, y, w = 34) {
  const loops = 6
  const steps = loops * 24
  const pts = []
  for (let i = 0; i <= steps; i++) {
    const p = i / steps // 0 → 1（上から下へ）
    const t = (i / 24) * Math.PI * 2
    const r = (w / 2) * (1 - p * 0.78) // 下へ行くほど細く
    const px = r * Math.cos(t) + Math.sin(p * 9) * 1.2 // 少し揺らして手描き風に
    const py = p * w * 0.62 + r * 0.26 * Math.sin(t)
    pts.push(`${px.toFixed(1)} ${py.toFixed(1)}`)
  }
  const h = w * 0.62
  const tail = `M${pts[pts.length - 1]} q 3 ${h * 0.18} -1 ${h * 0.34} q -3 ${h * 0.16} 1 ${h * 0.34} l -2 ${h * 0.22}`
  return `<g transform="translate(${x} ${y})" fill="none" stroke="${C.line}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M${pts.join(' L')}"/>
    <path d="${tail}"/>
  </g>`
}

function clipboard(x, y) {
  return `<g transform="translate(${x} ${y})">
    <rect x="0" y="0" width="30" height="38" rx="3" fill="#EFD39A" ${OL}/>
    <rect x="4" y="6" width="22" height="28" rx="1.5" fill="${C.white}" ${OL_THIN}/>
    <rect x="9" y="-3" width="12" height="6" rx="2" fill="${C.gold}" ${OL_THIN}/>
    <path d="M8 14 H22 M8 20 H22 M8 26 H18" stroke="#D8CFC4" stroke-width="2" stroke-linecap="round"/>
  </g>`
}

function gradCap(x, y) {
  return `<g transform="translate(${x} ${y})">
    <path d="M10 14 L10 22 C10 26 38 26 38 22 L38 14 L24 20 Z" fill="${C.navyDark}" ${OL}/>
    <path d="M0 10 L24 0 L48 10 L24 20 Z" fill="${C.navy}" ${OL}/>
    <path d="M44 12 L44 26" stroke="${C.gold}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="44" cy="28" r="3" fill="${C.gold}" ${OL_THIN}/>
  </g>`
}

// 3段の階段と旗（初級・中級・上級）
function stairs(x, y) {
  return `<g transform="translate(${x} ${y})">
    <path d="M0 48 L0 34 L16 34 L16 20 L32 20 L32 6 L48 6 L48 48 Z" fill="${C.goldLight}" ${OL}/>
    <path d="M40 6 L40 -16" ${OL}/>
    <path d="M40 -16 L54 -11 L40 -6 Z" fill="${C.red}" ${OL_THIN}/>
  </g>`
}

// ビデオ通話の画面
function videoCall(x, y) {
  return `<g transform="translate(${x} ${y})">
    <rect x="0" y="0" width="44" height="34" rx="6" fill="${C.white}" ${OL}/>
    <circle cx="22" cy="14" r="6" fill="${C.skin}" ${OL_THIN}/>
    <path d="M13 28 C13 22 17 20 22 20 C27 20 31 22 31 28" fill="${C.navy}" ${OL_THIN}/>
    <path d="M10 34 L6 42 L18 34" fill="${C.white}" ${OL_THIN}/>
  </g>`
}

// 小さなお店
function shop(x, y) {
  return `<g transform="translate(${x} ${y})">
    <rect x="4" y="18" width="52" height="40" rx="2" fill="${C.white}" ${OL}/>
    <path d="M0 6 L60 6 L60 18 L0 18 Z" fill="${C.red}" ${OL}/>
    <path d="M12 6 L12 18 M24 6 L24 18 M36 6 L36 18 M48 6 L48 18" stroke="${C.white}" stroke-width="3"/>
    <path d="M0 6 L60 6 L60 18 L0 18 Z" fill="none" ${OL}/>
    <rect x="12" y="30" width="14" height="28" fill="${C.goldLight}" ${OL_THIN}/>
    <rect x="32" y="28" width="16" height="12" fill="#DDEBF3" ${OL_THIN}/>
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
      `<circle cx="160" cy="130" r="118" fill="${C.goldLight}" opacity=".6"/>
       <circle cx="250" cy="50" r="18" fill="${C.goldLight}"/>
       <circle cx="40" cy="70" r="10" fill="${C.goldLight}"/>
       ${sparks(60, 40)}
       ${sparks(262, 120, true)}
       ${person({ hair: 'bun', hairColor: C.hairBrown, shirt: '#FCEBD8', x: 30, y: 72, s: 1.45 })}
       ${person({ hair: 'side', hairColor: C.hairDark, suit: true, x: 128, y: 38, s: 1.7 })}`,
      '笑顔の受講生のイラスト',
    ),

  worry1: () =>
    svg('0 0 140 130', `${moya(30, 4, 42)}${person({ hair: 'short', shirt: '#E3D2BC', mood: 'think', hand: 'chin', x: 20, y: 0 })}`, '悩む男性のイラスト'),
  worry2: () =>
    svg(
      '0 0 140 130',
      `${moya(116, 6, 42)}${person({ hair: 'long', hairColor: C.hairLight, shirt: '#F7DE9A', mood: 'worry', hand: 'cheek', x: 4, y: 0 })}`,
      '頬に手を当てて悩む女性のイラスト',
    ),
  worry3: () =>
    svg(
      '0 0 140 130',
      `${question(22, 34)}${person({ hair: 'short', hairColor: C.hairBrown, shirt: '#F5CF7E', mood: 'worry', x: 28, y: 0 })}${laptop(16, 96, 62)}`,
      'パソコンの前で悩む男性のイラスト',
    ),

  goal1: () =>
    svg('0 0 160 130', `${bulb(28, 18)}${person({ hair: 'long', hairColor: C.hairBrown, shirt: '#F7DE9A', mood: 'open', x: 40, y: 0 })}${laptop(30, 98, 70)}`, 'アイデアを思いつく女性のイラスト'),
  goal2: () =>
    svg(
      '0 0 160 130',
      `${sparks(30, 40)}${sparks(136, 40, true)}${person({ hair: 'short', hairColor: C.hairDark, shirt: '#F5CF7E', mood: 'focus', x: 22, y: 0 })}${laptop(16, 98, 70)}`,
      'パソコンで作業する男性のイラスト',
    ),
  goal3: () =>
    svg('0 0 160 130', `${bars(118, 26)}${person({ hair: 'side', hairColor: C.hairBrown, suit: true, hand: 'fist', x: 20, y: 0 })}${laptop(10, 98, 66)}`, 'ガッツポーズをするスーツの男性のイラスト'),

  consult: () =>
    svg(
      '0 0 150 130',
      `${sparks(120, 22, true)}${person({ hair: 'bun', hairColor: C.hairBrown, shirt: '#F5DDB0', hand: 'present', mood: 'wink', x: 6, y: 0 })}${clipboard(30, 90)}`,
      '案内をする女性スタッフのイラスト',
    ),

  // 本スクールの特徴
  feature1: () =>
    svg(
      '0 0 200 130',
      `${sparks(100, 20)}${person({ hair: 'long', hairColor: C.hairLight, shirt: '#F7DE9A', mood: 'gentle', x: 0, y: 10, s: 0.92 })}${person({ hair: 'side', hairColor: C.hairDark, suit: true, hand: 'present', x: 82, y: 4, s: 0.97 })}`,
      '講師が受講生に伴走するイラスト',
    ),
  feature2: () =>
    svg('0 0 200 130', `${stairs(128, 66)}${person({ hair: 'short', hairColor: C.hairBrown, shirt: '#F5CF7E', hand: 'present', mood: 'open', x: 10, y: 0 })}`, '初級から上級へ段階的に学ぶイラスト'),
  feature3: () =>
    svg('0 0 200 130', `${videoCall(138, 14)}${person({ hair: 'bun', hairColor: C.hairBrown, shirt: '#FCEBD8', mood: 'focus', x: 30, y: 0 })}${laptop(24, 98, 70)}`, 'オンラインで個別指導を受けるイラスト'),
  feature4: () =>
    svg('0 0 200 130', `${shop(128, 64)}${sparks(124, 44)}${person({ hair: 'side', hairColor: C.hairDark, shirt: '#F5DDB0', hand: 'fist', x: 14, y: 0 })}`, '小さなお店を支援するイラスト'),

  // 受講の流れ
  flow1: () => svg('0 0 140 130', `${person({ hair: 'bun', hairColor: C.hairBrown, shirt: '#F5DDB0', hand: 'present', mood: 'gentle', x: 4, y: 0 })}`, '無料相談のイラスト'),
  flow2: () =>
    svg(
      '0 0 160 130',
      `${person({ hair: 'long', hairColor: C.hairLight, shirt: '#F7DE9A', mood: 'gentle', x: -6, y: 14, s: 0.9 })}${person({ hair: 'side', hairColor: C.hairDark, suit: true, x: 58, y: 8, s: 0.95 })}`,
      'カウンセリングのイラスト',
    ),
  flow3: () => svg('0 0 140 130', `${person({ hair: 'short', hairColor: C.hairBrown, shirt: '#F5CF7E', mood: 'focus', x: 10, y: 0 })}${laptop(6, 98, 62)}`, 'オンライン授業のイラスト'),
  flow4: () =>
    svg('0 0 140 130', `${person({ hair: 'side', hairColor: C.hairDark, suit: true, hand: 'fist', x: 14, y: 4 })}${gradCap(46, 0)}${sparks(124, 50, true)}`, '卒業のイラスト'),
}

// ソコスト（https://soco-st.com/）のフリーイラスト
// public/illust/<番号>.svg は、配色をサイトに合わせて置き換え、一部は人物だけを切り出したもの
const SOCO = {
  worry1: { id: '27151', alt: '腕を組んで考える男性', moya: true },
  worry2: { id: '27188', alt: '腕を組んで悩む女性', moya: true },
  worry3: { id: '29394', alt: 'パソコンの前で疲れた様子の男性' },
  goal1: { id: '26796', alt: 'パソコンで作業する女性' },
  goal2: { id: '16911', alt: '売上アップを喜ぶ男性' },
  goal3: { id: '17069', alt: '握手をして商談がまとまった様子' },
  consult: { id: '21247', alt: '案内をする女性スタッフ' },
  feature1: { id: '17053', alt: '握手をする講師と受講生' },
  feature2: { id: '21632', alt: '初心者マークを持ってガッツポーズをする女性' },
  feature3: { id: '25330', alt: 'ノートパソコンでオンラインレッスンを受ける様子' },
  feature4: { id: '20970', alt: '売上アップを喜ぶお店の男性' },
  flow1: { id: '21265', alt: '相談を受け付ける女性スタッフ' },
  flow2: { id: '15726', alt: '向かい合ってカウンセリングを受ける女性' },
  flow3: { id: '25314', alt: 'パソコンでオンライン授業を受ける様子' },
  flow4: { id: '27332', alt: '未来を見つめる男女' },
}

export function renderIllustrations(root = document) {
  root.querySelectorAll('[data-scene]').forEach((el) => {
    const soco = SOCO[el.dataset.scene]
    if (soco) {
      const mark = soco.moya ? svg('-24 -4 48 64', moya(0, 0, 40), '').replace('role="img" aria-label=""', 'class="moya-mark" aria-hidden="true"') : ''
      el.innerHTML = `<img src="/illust/${soco.id}.svg" alt="${soco.alt}のイラスト" loading="lazy" decoding="async" />${mark}`
      return
    }
    const scene = scenes[el.dataset.scene]
    if (scene) el.innerHTML = scene()
  })
}
