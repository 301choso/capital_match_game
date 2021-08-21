const main = document.querySelector('#main');
const qna =  document.querySelector('#qna');
const result =  document.querySelector('#result');
const arr=[0,0,0,0,0,0,0,0];
const endpoint = arr.length;

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
  resultName.innerHTML = Math.floor((point/arr.length)*100) +'점';
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
