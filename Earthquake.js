function boxCheck(){
  document.getElementById("Earthquake").innerText="～～で震度〇の地震がありました（時間）";
  document.getElementById("cancelBtn").style.display="";
}

function change(){
  document.getElementById("Earthquake").innerText="現在地震はありません";
  document.getElementById("cancelBtn").style.display="none";
  document.getElementById("mark").checked=false;
}