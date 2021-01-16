{
  console.log('OK');

  // DOMを変数に格納
  const searchBtn = document.getElementById('searchBtn');
  const searchBtn2 = document.getElementById('searchBtn2');
  const searchBtn3 = document.getElementById('searchBtn3');
  const searchBtn4 = document.getElementById('searchBtn4');
  const searchForm = document.forms['searchForm'];
  const testDiv = document.getElementById('test');

  // 検索条件
  let code = null;

  // イベントの登録
  searchBtn.addEventListener('click', clickSearchBtn);
  searchBtn2.addEventListener('click', clickSearchBtn2);
  searchBtn3.addEventListener('click', postJsonData);
  searchBtn4.addEventListener('click', postNoJsonData);

  // 検索
  function clickSearchBtn() {
    console.log("click!");

    // フォームで送信
    searchForm.action = '/';
    searchForm.method = 'post';
    searchForm.submit();
  }

  // 検索
  function clickSearchBtn2() {
    console.log("click!");

    // 送信するデータを取得
    code = document.getElementById('code').value;

    // 検索
    // postNoJsonData();
    postJsonData();
  }

  /**
   * ajaxでhtmlを取得
   * htmlの中から差し替えるIDの要素を取得
   * 差し替える場所に取得した要素をいれる
   */
  function postNoJsonData() {
    // URLを作成
    const host = location.hostname;
    const protocol = location.protocol;
    const port = location.port
    // const url = `${protocol}://${host}:${port}/search`;
    const url = 'http://localhost:8080/search'

    // 送信するデータを組み立てる
    const requestBody = `code=${code}`;

    // 通信初期化
    const req = new XMLHttpRequest();
    req.open('POST', url);
    req.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          let dataHtml = document.createElement('div');
          dataHtml.innerHTML = req.responseText;
          dataHtml.childNodes.forEach(child => {
            if (child.id == 'testData') {
              testDiv.innerHTML = child.outerHTML;
            }
          });
          // testDiv.innerHTML = req.responseText;
        } else {
          // エラー画面に遷移させる
        }
      } else {
        testDiv.innerHTML = "通信中";
      }
    }

    // 送信
    req.send(requestBody);
  }


  // jsonでおくって、jsonで受け取る
  function postJsonData() {
    // URLを作成
    const host = location.hostname;
    const protocol = location.protocol;
    const port = location.port
    // const url = `${protocol}://${host}:${port}/search`;
    const url = 'http://localhost:8080/search/json'

    // 送信するデータを組み立てる
    const data = {
      code,
    };
    const requestBody = JSON.stringify(data);


    // 通信初期化
    const req = new XMLHttpRequest();
    req.open('POST', url);
    req.withCredentials = true; // cookieをおくる
    req.responseType = 'json'; // jsonでうけとる
    req.setRequestHeader('content-type', 'application/json'); // jsonでおくる

    // csrfトークンをヘッダーにいれておくる
    // var token = $("meta[name='_csrf']").attr("content");
    // var header = $("meta[name='_csrf_header']").attr("content");
    // req.setRequestHeader(header, token);

    /**  onloadでstatusをみないといけないのでこっちは使わない
    req.onloadstart = function () {
      console.log('通信開始')
      testDiv.innerHTML = '通信中';
    }
    req.onerror = function () {
      console.log('通信失敗');
      testDiv.innerHTML = '通信に失敗しました。'
    }
    req.onabort = function () {
      console.log('通信中断');
    }
    req.ontimeout = function () {
      console.log('通信タイムアウト');
    }
    // onloadでエラーをひろえない
    req.onload = function () {
      console.log('*** onload');
      console.log('*** status = ' + req.status);

      const dataList = req.response;
      console.log(dataList);
      console.log(dataList.length);
      dataList.forEach(data => console.log(data.name));

      // 子要素削除
      testDiv.removeChild(testDiv.firstChild);
      // 子要素追加
      let ul = document.createElement('ul');
      for (let i = 0; i < dataList.length; i += 1) {
        let li = document.createElement('li');
        li.textContent = dataList[i].name;
        ul.appendChild(li);
      }
      testDiv.appendChild(ul);
    }
    errorが呼ばれないので、コメントアウトしてみる
    req.onloadend = function () {
      console.log('通信終了')
    }
    */

    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          const dataList = req.response;
          console.log(dataList);
          console.log(dataList.length);
          dataList.forEach(data => console.log(data.name));

          // 子要素削除
          testDiv.removeChild(testDiv.firstChild);
          // 子要素追加
          let ul = document.createElement('ul');
          for (let i = 0; i < dataList.length; i += 1) {
            let li = document.createElement('li');
            li.textContent = dataList[i].name;
            ul.appendChild(li);
          }
          testDiv.appendChild(ul);
        } else {
          testDiv.innerHTML = '通信に失敗しました。'
        }
      } else {
        testDiv.innerHTML = "通信中";
      }
    }

    // 送信
    req.send(requestBody);
  }

  /*
   * イベントハンドラでこれを使いたかったがうまく使えなかった。
  function getData(req) {
    if (req.readyState == 4) {
      if (req.status == 200) {
        testDiv.innerHTML = req.responseText;
      }
    } else {
      testDiv.innerHTML = "通信中";
    }
  }
  */
}