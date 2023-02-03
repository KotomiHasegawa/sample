window.onload = function () {
    
    function loadEarthquake () {
        try{
            var apiHttp;
            apiHttp = new XMLHttpRequest();
            apiHttp.open("GET", "https://api.p2pquake.net/v1/human-readable", false);
            apiHttp.send(null);
        }catch(e){};
        var Rjson=JSON.parse(apiHttp.responseText);

        var i = 0;
        var cnt = 1;
        // 5件表示されるまでループ
        do{
            var idNew = "new"+cnt;
            var idTime = "time"+cnt;
            var idName = "name"+cnt;
            var idScale = "scale"+cnt;
            var idMagn = "magn"+cnt;

            // 発生時刻をyyyyMMddHHmmssSSS形式に変換
            var time_str = Rjson[i].time.replace("/", "").replace("/", "").replace(/ /g, "").replace(":", "").replace(":", "").replace(".", "");

            // 現在の10分前の時刻をyyyyMMddHHmmssSSS形式で取得
            var now = new Date();
            var before10min = now.getFullYear() + ("0"+(now.getMonth()+1)).slice(-2) + ("0"+now.getDate()).slice(-2) + ("0"+now.getHours()).slice(-2) + ("0"+now.getMinutes()).slice(-2) + ("0"+now.getSeconds()).slice(-2) + ("00"+now.getMilliseconds()).slice(-3)-1000000;

            // 現在時刻を年月日時分に変換
            var y = now.getFullYear();
            var m = now.getMonth()+1;
            var d = now.getDate();
            var H = now.getHours();
            var M = now.getMinutes();
            document.getElementById("nowTime").innerHTML = "現在時刻　"+y+"年"+m+"月"+d+"日"+H+"時"+M+"日"


            // 発生時刻を年月日時分に変換
            var timeChange = Rjson[i].time.replace("/", "年").replace("/", "月").replace(/ /g, "日").replace(":", "時").replace(":", "分").slice(0,17);


            // code=511（地震情報）で、震源地と最大震度が空でない地震データを取得
            if(Rjson[i].code==551 && Rjson[i].earthquake.hypocenter.name !=="" && Rjson[i].earthquake.maxScale!==null){
                // 発生時刻が現在時刻の10分前以内の場合！表示
                if(time_str>=before10min){
                    document.getElementById(idNew).innerHTML = "New"
                }else{
                    document.getElementById(idNew).innerHTML = ""
                }
                document.getElementById(idTime).innerHTML = timeChange
                document.getElementById(idName).innerHTML = Rjson[i].earthquake.hypocenter.name
                // 最大震度の表示形式変換
                if(Rjson[i].earthquake.maxScale==10){
                    document.getElementById(idScale).innerHTML="1"
                }else if(Rjson[i].earthquake.maxScale==20){
                    document.getElementById(idScale).innerHTML="2"
                }else if(Rjson[i].earthquake.maxScale==30){
                    document.getElementById(idScale).innerHTML="3"
                }else if(Rjson[i].earthquake.maxScale==40){
                    document.getElementById(idScale).innerHTML="4"
                }else if(Rjson[i].earthquake.maxScale==45){
                    document.getElementById(idScale).innerHTML="5弱"
                }else if(Rjson[i].earthquake.maxScale==50){
                    document.getElementById(idScale).innerHTML="5強"
                }else if(Rjson[i].earthquake.maxScale==55){
                    document.getElementById(idScale).innerHTML="6弱"
                }else if(Rjson[i].earthquake.maxScale==60){
                    document.getElementById(idScale).innerHTML="6強"
                }else if(Rjson[i].earthquake.maxScale==70){
                    document.getElementById(idScale).innerHTML="7"
                }
                // マグニチュードの値が空の場合「―」と表示
                if(Rjson[i].earthquake.hypocenter.magnitude==""){
                    document.getElementById(idMagn).innerHTML="―"
                }else{
                    document.getElementById(idMagn).innerHTML = Rjson[i].earthquake.hypocenter.magnitude
                }
                cnt += 1;
            };
            i += 1;
        }while(cnt<=5);
    };

    // 初回ロード時の呼び出し
    loadEarthquake();

    // 1分ごとにリロード
    setInterval(function(){
        loadEarthquake();
    },60000) 

};