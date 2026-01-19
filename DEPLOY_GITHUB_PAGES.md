# 📦 Ninky - GitHub Pagesデプロイ手順書

このドキュメントでは、NinkyをGitHub Pagesにデプロイする完全な手順を説明します。

---

## 🎯 前提条件

- ✅ GitHubアカウントを持っている
- ✅ Gitがインストールされている（確認: `git --version`）
- ✅ 基本的なGitコマンドを理解している

---

## 📋 手順1: GitHubリポジトリの作成

### 1-1. GitHubにログイン
[https://github.com](https://github.com) にアクセスしてログイン

### 1-2. 新規リポジトリを作成
1. 右上の「+」ボタン → 「New repository」をクリック
2. リポジトリ設定:
   - **Repository name**: `ninky` （または任意の名前）
   - **Description**: `役員任期管理PWAアプリ`
   - **Public / Private**: **Public** を選択（GitHub Pages無料版はPublicのみ）
   - **Initialize this repository with**: **何もチェックしない**（空のリポジトリで作成）
3. 「Create repository」をクリック

### 1-3. リポジトリURLをコピー
作成後に表示されるURLをコピーします：
```
https://github.com/ユーザー名/ninky.git
```

---

## 📋 手順2: ローカルでGit初期化・プッシュ

### 2-1. プロジェクトフォルダに移動
```bash
# Ninkyプロジェクトのフォルダに移動
cd /path/to/ninky
```

### 2-2. Gitリポジトリを初期化
```bash
# Gitリポジトリを初期化
git init

# すべてのファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: Ninky v2.2.1"
```

### 2-3. GitHubリポジトリと連携
```bash
# リモートリポジトリを追加（URLは手順1-3でコピーしたもの）
git remote add origin https://github.com/ユーザー名/ninky.git

# メインブランチ名を確認・変更（GitHub標準はmain）
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

**初回プッシュ時の認証**:
- GitHubのユーザー名とパスワード（またはPersonal Access Token）を入力
- Personal Access Tokenの作成方法: [GitHub公式ガイド](https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

---

## 📋 手順3: GitHub Pagesを有効化

### 3-1. リポジトリ設定を開く
1. GitHubのリポジトリページにアクセス
2. 「Settings」タブをクリック

### 3-2. GitHub Pagesを設定
1. 左サイドバーの「Pages」をクリック
2. **Source**（ソース）セクション:
   - **Branch**: `main` を選択
   - **Folder**: `/ (root)` を選択
3. 「Save」をクリック

### 3-3. デプロイ完了を待つ
- 数分後、ページ上部に以下のメッセージが表示されます：
  ```
  Your site is published at https://ユーザー名.github.io/ninky/
  ```
- このURLをクリックして、Ninkyが表示されるか確認

---

## 📋 手順4: デプロイ後の動作確認

### 4-1. 基本動作確認
1. 上記URLにアクセス
2. Ninkyのメイン画面が表示されるか確認
3. ブラウザの開発者ツール（F12）を開き、Consoleタブでエラーがないか確認

### 4-2. PWA機能確認

#### 🍎 **iOS（Safari）**
1. Safariで `https://ユーザー名.github.io/ninky/` を開く
2. 共有ボタン（↗️）→「ホーム画面に追加」
3. ホーム画面のアイコンが正しく表示されるか確認
4. アイコンをタップしてアプリとして起動

#### 🤖 **Android（Chrome）**
1. Chromeで上記URLを開く
2. 画面下部に「アプリをインストール」のバナーが表示される
3. 「インストール」をタップ
4. ホーム画面のアイコンを確認

#### 🪟 **Windows（Edge）**
1. Edgeで上記URLを開く
2. アドレスバー右の「＋」アイコンをクリック
3. 「インストール」をクリック
4. スタートメニューのアイコンを確認

### 4-3. オフライン動作確認
1. PWAをインストール後、アプリを開く
2. ブラウザの開発者ツール → Application → Service Workers
3. 「Offline」にチェックを入れる
4. ページをリロードして、オフラインでも動作するか確認

---

## 📋 手順5: カスタムドメイン設定（オプション）

独自ドメイン（例: `ninky.yourdomain.com`）を使いたい場合：

### 5-1. ドメインのDNS設定
お使いのドメイン管理サービスで、以下のDNSレコードを追加：

**Aレコード**（ルートドメイン用）:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAMEレコード**（サブドメイン用）:
```
ninky.yourdomain.com  →  ユーザー名.github.io
```

### 5-2. GitHub Pagesにカスタムドメインを設定
1. リポジトリの「Settings」→「Pages」
2. **Custom domain** に `ninky.yourdomain.com` を入力
3. 「Save」をクリック
4. **Enforce HTTPS** にチェックを入れる（PWA必須）

---

## 🔄 更新・再デプロイ手順

ファイルを修正した後、GitHubに反映する方法：

```bash
# ファイルを修正後

# 変更をステージング
git add .

# コミット（メッセージは修正内容に応じて変更）
git commit -m "機能追加: ○○機能を実装"

# GitHubにプッシュ
git push origin main
```

GitHub Pagesは自動的に再デプロイされます（1〜2分後）。

---

## 🧪 トラブルシューティング

### 問題1: ページが404エラーになる
**原因**: GitHub Pagesの有効化が完了していない  
**対処法**:
1. リポジトリの「Actions」タブで、デプロイジョブが成功しているか確認
2. 5〜10分待ってから再度アクセス

### 問題2: アイコンが表示されない
**原因**: パスの指定ミス  
**対処法**:
1. ブラウザの開発者ツール（F12）→ Networkタブ
2. 404エラーになっているファイルを確認
3. `index.html`、`ninky-manifest.json`、`sw.js` のパス指定を確認

### 問題3: Service Workerが動作しない
**原因**: HTTPSが有効になっていない  
**対処法**:
- GitHub PagesはデフォルトでHTTPSが有効
- 「Settings」→「Pages」で「Enforce HTTPS」がチェックされているか確認

### 問題4: PWAがインストールできない
**原因**: マニフェストファイルのパスエラー  
**対処法**:
1. 開発者ツール → Application → Manifest
2. エラーメッセージを確認
3. `ninky-manifest.json` のstart_urlやiconsのパスを確認

---

## 📊 デプロイ後のURL構成

デプロイ後、以下のURLでアクセスできます：

| ファイル | URL |
|---------|-----|
| **メインアプリ** | `https://ユーザー名.github.io/ninky/` |
| **マニフェスト** | `https://ユーザー名.github.io/ninky/ninky-manifest.json` |
| **アイコン512px** | `https://ユーザー名.github.io/ninky/icons/icon-512.png` |
| **Service Worker** | `https://ユーザー名.github.io/ninky/sw.js` |

---

## 🔐 セキュリティに関する注意

### ⚠️ LocalStorageに保存されるデータ
Ninkyは顧問先の役員情報をブラウザのLocalStorageに保存します。以下の点にご注意ください：

1. **Public WiFi使用時の注意**
   - 公共のWiFiでは通信が傍受される可能性があります
   - HTTPS通信であれば通信内容は暗号化されますが、不特定多数が使用する端末での利用は避けてください

2. **共有端末での使用禁止**
   - 複数人で使用する端末にはインストールしないでください
   - データはブラウザに紐づいて保存されます

3. **定期的なバックアップ**
   - LocalStorageのデータはブラウザのキャッシュクリアで消える可能性があります
   - CSV出力機能で定期的にバックアップを取得してください

4. **機密性の高いデータの取り扱い**
   - 個人情報保護法に準拠した管理を行ってください
   - 必要に応じて、アクセス制限やパスワード保護の実装を検討してください

---

## 📞 サポート

デプロイに関するご質問は、以下の情報をご用意の上お問い合わせください：
- GitHubリポジトリURL
- エラーメッセージのスクリーンショット
- ブラウザの開発者ツール（Console）のエラーログ

---

## 🎉 デプロイ完了チェックリスト

最終確認として、以下の項目をチェックしてください：

- [ ] GitHubリポジトリが作成されている
- [ ] すべてのファイルがプッシュされている
- [ ] GitHub Pagesが有効化されている
- [ ] デプロイURLにアクセスできる
- [ ] メイン画面が正常に表示される
- [ ] PWAアイコンが正しく表示される
- [ ] iOS/Android/Windowsでインストールできる
- [ ] オフラインモードで動作する
- [ ] Service Workerが登録されている（開発者ツールで確認）
- [ ] 404エラーがない（開発者ツールのNetworkタブで確認）

---

**🚀 すべてのチェックが完了したら、Ninkyの本格運用を開始してください！**
