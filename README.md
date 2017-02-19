# kazaoki/webalive



## 概要

ウェブサイトの死活監視に使えそうな docker イメージです。

指定したURLに、指定したタイミングでアクセスし、アクセス不能の場合（20x, 30x以外）に、指定した方法で通知を行うだけのものです。
シンプルですが、複数のウェブサイトが指定でき、EメールだけでなくSlackにも通知可能なので、大規模なウェブ監視でなければ、それなりに有用かと思います。



## 設定の方法

#### ymlファイルで指定

ymlファイルはコンテナ内の `/etc/webalive.yml` に配置してください。

```yaml
# webalive.yml
# [hogehoge]
- url: https://hogehoge.com/
  timing: "0 * * * *"
  email: notice@xxx.xx
  slack: https://slack_web_hook_url
  always: no

# [hugehuge]
- url: https://hugehuge.com/
  timing: "0 1 * * *"
  email: notice@xxx.xx
  always: yes 
```
```sh
# dockerコマンド例
docker run -d -v webalive.yml:/etc/webalive.yml kazaoki/webalive
```



#### 環境変数でがんばって指定

環境変数で複数のウェブを指定したい場合は、`WA1～` `WA2～` のように数値をつけてください。

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

####  docker-compose ファイル
`docker-compose` を使うとこんな感じです。
```yaml
# docker-compose.yml
version: '2'
services:

  # ymlファイルでの指定
  # ------------------------------------------------------------------
  webalive_by_yaml:
    container_name: webalive
    image: kazaoki/webalive
    restart: always
    volumes:
      - ./webalive.yml:/etc/webalive.yml

  # # 環境変数での指定
  # # ------------------------------------------------------------------
  # webalive_by_env:
  #   container_name: webalive
  #   image: kazaoki/webalive
  #   restart: always
  #   environment:
  #     # [web site 1]
  #     - WA1_URL="https://google.com"
  #     - WA1_TIMING="0 * * * *"
  #     - WA1_EMAIL="notice@xxx.xx"
  #     - WA1_SLACK="https://slack_web_hook_url"
  #     - WA1_ALWAYS="no"
  #     # [web site 2]
  #     - WA2_URL="https://hugehuge.com/"
  #     - WA2_TIMING="0 1 * * *"
  #     - WA2_EMAIL="notice@xxx.xx"
  #     - WA2_ALWAYS="yes"
  #     # [web site 3]
  #     - WA3_URL="https://yahoo.jp/"
  #     - WA3_TIMING="0 1 * * *"
  #     - WA3_SLACK="https://slack_web_hook_url"
  #     - WA3_SUBJECT="日本語サブジェクト"
  #     - WA3_ALWAYS="no"
```


## 詳細

| 項目名(YAML) | 項目名(環境変数)     | 説明                                  |
| --------- | ------------- | ----------------------------------- |
| `url`     | `WA1_URL`     | 必須。監視するURLです。httpでもhttpsでもOKです。     |
| `timing`  | `WA1_TIMING`  | 必須。cronフォーマットで指定してください。             |
| `email`   | `WA1_EMAIL`   | 任意。通知先メールアドレスです。                    |
| `slack`   | `WA1_SLACK`   | 任意。ウェブフックURLを指定してSlackに通知できます。      |
| `subject` | `WA1_SUBJECT` | 通知する件名を自分で決めたい時に指定します。日本語使えるといいですね。 |
| `always`  | `WA1_ALWAYS`  | `yes` か `no` が書けます。省略時は `no` です。    |

`WA1～` は、複数ウェブサイトがある場合は数値を変えて下さい。



## 注意点

- Eメールはsendmailでの送信（FromもToも同じ）にしているので、もっと細かく指定したいとか、SMTP指定したいとか本文いじりたいとかは、現状では対応してません。

  ​


## License
MIT
