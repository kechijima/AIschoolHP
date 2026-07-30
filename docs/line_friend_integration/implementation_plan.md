# LINE公式アカウント友だち登録の統合

「希望の日程で予約する」ボタンをクリックした際に、指定されたLINE公式アカウントの友だち登録画面へ遷移するように変更します。

## 変更内容

### index.html

#### [MODIFY] [index.html](file:///c:/Users/Public/Desktop/workspace/AIschool/index.html)

- 209行目の「希望の日程で予約する」ボタンの `href` 属性を `https://lin.ee/sSl0WTE` に変更します。
- 必要に応じて、`target="_blank"` および `rel="noopener noreferrer"` を追加して、新しいタブで開くようにします（ユーザー体験の向上のため）。

## 検証計画

### 手動確認
- ブラウザで `index.html` を開き、最下部の「希望の日程で予約する」ボタンをクリックします。
- `https://lin.ee/sSl0WTE` に正しく遷移することを確認します。
