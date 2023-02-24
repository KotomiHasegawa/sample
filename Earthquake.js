window.onload = function () {
    
    function loadEarthquake () {
        try{
            var apiHttp;
            apiHttp = new XMLHttpRequest();
            apiHttp.open("GET", "https://api.p2pquake.net/v1/human-readable", false);
            apiHttp.send(null);
        }catch(e){
            
        };
        var Rjson=JSON.parse(apiHttp.responseText);

        var i = 0;  //APIから情報をとるカウント
        var count = 1;  //5件表示するカウント

        // 5件表示されるまでループ
        do{
            var idNew = "new"+count;     //10分以内の情報に「New」表示
            var idTime = "time"+count;   //「発生時刻」に表示
            var idName = "name"+count;   //「震源地」に表示
            var idScale = "scale"+count; //「震度」に表示
            var idMagn = "magn"+count;   //「マグニチュード」に表示

            // 地震発生時刻をyyyymmddHHMMssSSS形式に変換
            var time_str = Rjson[i].time.replace("/", "").replace("/", "").replace(/ /g, "").replace(":", "").replace(":", "").replace(".", "");

            // 現在の10分前の時刻をyyyymmddHHMMssSSS形式で取得
            var now = new Date();
            var before10min = now.getFullYear() + ("0"+(now.getMonth()+1)).slice(-2) + ("0"+now.getDate()).slice(-2) + ("0"+now.getHours()).slice(-2) + ("0"+now.getMinutes()).slice(-2) + ("0"+now.getSeconds()).slice(-2) + ("00"+now.getMilliseconds()).slice(-3)-1000000;

            // 現在時刻を年月日時分に変換
            var yyyy = now.getFullYear();
            var mm = ("0"+(now.getMonth()+1)).slice(-2);
            var dd =("0"+now.getDate()).slice(-2);
            var HH = now.getHours();
            var MM = ("0"+now.getMinutes()).slice(-2);
            document.getElementById("nowTime").innerHTML = yyyy+"年"+mm+"月"+dd+"日"+HH+"時"+MM+"分"

            // 地震発生時刻を年月日時分に変換
            var timeChange = Rjson[i].time.replace("/", "年").replace("/", "月").replace(/ /g, "日").replace(":", "時").replace(":", "分").slice(0,17);

            // code=511（地震情報）で、震源地と最大震度が空や？でないデータを取得
            if(Rjson[i].code==551 && Rjson[i].earthquake.hypocenter.name !=="" && Rjson[i].earthquake.maxScale!==null && Rjson[i].earthquake.hypocenter.name.indexOf('?')=="-1"){
                // 地震発生時刻が現在時刻の10分前以内の場合Newを表示
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
                count += 1;
            };
            i += 1;
        }while(count<=5);
    };

    // 初回ロード時の呼び出し
    loadEarthquake();

    // 1分ごとにリロード
    setInterval(function(){
        loadEarthquake();
    },60000) 

};