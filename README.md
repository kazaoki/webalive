# kazaoki/webalive



## 説明

ウェブサイトの死活監視に使えそうな docker イメージです。



## 概要

#### ymlファイルで指定

```yaml
# webalive.yml
# [hogehoge]
- url: https://hogehoge.com/
  timing: 0 * * * *
  email: notice@xxx.xx
  slack: https://slack_web_hook_url
  always: no

# [hugehuge]
- url: https://hugehuge.com/
  timing: 0 1 * * *
  email: notice@xxx.xx
  always: yes 
```
```sh
docker run -d -v webalive.yml:/etc/webalive.yml kazaoki/webalive
```



#### 環境変数でがんばって指定

```sh
docker run -d \
  -e WA1_URL="https://google.com/" \
  -e WA1_TIMING="0 * * * *" \
  -e WA1_EMAIL="notice@xxx.xx" \
  -e WA1_SLACK="https://slack_web_hook_url" \
  -e WA1_ALWAYS="no" \
  -e WA2_URL="https://yahoo.com/" \
  -e WA2_TIMING="0 1 * * *" \
  -e WA2_EMAIL="notice@xxx.xx" \
  -e WA2_ALWAYS="yes" \
  kazaoki/webalive
```

環境変数とymlファイルの両方が指定されている場合は、URLをキーに環境変数を優先にマージします。

`docker-compose` を使うと楽かもですね。



## 詳細

| 項目名(YAML) | 項目名(環境変数)     | 説明                                  |
| --------- | ------------- | ----------------------------------- |
| `url`     | `WA1_URL`     | 必須。監視するURLです。httpでもhttpsでもOKです。     |
| `timing`  | `WA1_TIMING`  | 必須。cronフォーマットで指定してください。             |
| `email`   | `WA1_EMAIL`   | 通知先メールアドレスです。                       |
| `slack`   | `WA1_SLACK`   | ウェブフックを利用してSlackに通知できます。            |
| `subject` | `WA1_SUBJECT` | 通知する件名を自分で決めたい時に指定します。日本語使えるといいですね。 |
| `always`  | `WA1_ALWAYS`  | `yes` か `no` が書けます。省略時は `no` です。    |

`WA1～` は、複数ウェブサイトがある場合は数値を変えて下さい。

同じ数値（変数名）があると上書きされてしまいます。



## 注意点

- 現状、通知の本文は変更出来ません。いじりたい場合はこのプロジェクトをフォークして下さい。
- Eメール/Slack以外の通知対応は今のところ考えていません。