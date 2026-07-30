# 修正内容の確認 (Walkthrough)

「希望の日程で予約する」ボタンをクリックした際に、LINE 公式アカウントの友だち登録画面へ遷移するように修正を行いました。

## 変更内容

### index.html

#### [index.html](file:///c:/Users/Public/Desktop/workspace/AIschool/index.html) (209行目)

```diff
-          <a href="#" class="btn btn-primary">希望の日程で予約する</a>
+          <a href="https://lin.ee/sSl0WTE" class="btn btn-primary" target="_blank" rel="noopener noreferrer">希望の日程で予約する</a>
```

## 検証結果

### ソースコード確認
- [x] `href` 属性が `https://lin.ee/sSl0WTE` に正しく設定されている。
- [x] `target="_blank"` により、新しいタブで開くように設定されている。
- [x] `rel="noopener noreferrer"` により、セキュリティ上の配慮がなされている。

ローカル環境でビルドを行い、Firebase Hosting へのデプロイを完了しました。

### 公開先 URL
- [https://miraisekkeiai.web.app](https://miraisekkeiai.web.app)

最終的な動作確認は、上記 URL にてお願いいたします。
