let join_bt = document.getElementById('join-button');
let exit_bt = document.getElementById('exit-button');

join_bt.onclick = function () {
  let answer = prompt("토끼가 좋아하는 채소는?", '');
  if (answer === "당근") {
    alert("환영합니다.");
    return;
  }
  alert("모르면 못 들어옵니다.");
}

exit_bt.onclick = function () {
  let exitGame = confirm("게임을 종료하시겠습니까?");
  if (exitGame) {
    alert("방에서 나갔습니다.");
  }
}
