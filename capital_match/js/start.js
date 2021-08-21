const main = document.querySelector('#main');
const qna =  document.querySelector('#qna');
const result =  document.querySelector('#result');
const arr=[0,0,0,0,0,0,0,0];
const endpoint = arr.length;

function resultAnswer(){
  const resultName2 = document.querySelector('.resultname2');
  /*
  let table  = document.createElement('table');
  let thead  = document.createElement('thead');
  let tbody  = document.createElement('tbody');

  table.appendChild(thead);
  table.appendChild(tbody);

  document.getElementById('body').appendChild(table);
  let row_1 = document.createElement('tr');
  let num = document.createElement('th');
  num.innerHTML = "번호";
  let country = document.createElement('th');
  country.innerHTML = "국가명";
  let capital = document.createElement('th');
  capital.innerHTML = "수도명";
*/
  for(let i =0;i< arr.length;i++){

    if(Number(arr[i])===1){
        resultName2.innerHTML += answerSheet[i].name + " - " +answerSheet[i].capital+" O<br/>";
    }else{
      resultName2.innerHTML += answerSheet[i].name + " - " +answerSheet[i].capital+" X<br/>";
    }

  }
}

function calResult(){ //점수합산
  var sum=0;
  for(let i =0;i< arr.length;i++){
    sum+=Number(arr[i]);
  }
  return sum;
}

function setResult(){
  let point = calResult();
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = Math.floor((point/arr.length)*100) + "점<br/>"
  + "(정답 : " + point +"문제 / 전체 : " + arr.length +"문제)<br/>";
}

function goResult(){ //화면전환
  qna.style.WebkitAnimation = "fadeOut 0.5s";
  qna.style.animation = "fadeOut 0.5s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 0.5s";
    result.style.animation ="fadeIn 0.5s";
    setTimeout(() => {
      qna.style.display ="none";
      result.style.display="block";
    }, 200) })
    setResult();
}

function addAnswer(answerText, qIdx,idx){
  var a = document.querySelector(".answerBox");
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');
  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function(){
    var children = document.querySelectorAll('.answerList');
    for(let i =0 ; i<children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = 'fadeIn 0.5s';
      children[i].style.animation = 'fadeOut 0.5s';
    }
    setTimeout(() => {
      var target = qList[qIdx].a[idx].confirm; //답 여부
      arr[qIdx] =target; //배열에 답 저장하기

      for(let i =0 ; i<children.length; i++){
        children[i].style.display='none';
      }
      goNext(++qIdx);
    }, 200);
  }, false);
}

function goNext(qIdx){
  if(qIdx === endpoint) { //순번이 끝까지 갔다면
    goResult();
    return;
  }
  var q = document.querySelector(".qBox"); //아니면 반복
  q.innerHTML = qList[qIdx].q;
  for(let i in qList[qIdx].a){
    addAnswer(qList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar'); //진행률
  status.style.width = (100/endpoint) * (qIdx+1) + "%";
}

function begin(){
  main.style.WebkitAnimation = "fadeOut 0.5s";
  main.style.animation = "fadeOut 0.5s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 0.5s";
    qna.style.animation = "fadeIn 0.5s";
    setTimeout(() => {
      main.style.display="none";
      qna.style.display="block";

    },200)
    let qIdx=0;
    goNext(qIdx);
  },200)

}
