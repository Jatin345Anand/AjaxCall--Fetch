 window.addEventListener("load",init);
function init(){
  // document.querySelector("#xmldata").addEventListener("click",doXML3);
  // document.querySelector("#doaxios").addEventListener("click",doAXIOS); 
   document.querySelector("#dofetch").addEventListener("click",doFETCH);
}
var url="http://localhost:4300/mobiles";
function doXML2(){
    var pr = new Promise((resolve,reject)=>{
     var xhttp2= new XMLHttpRequest();
     xhttp2.open("GET","http://localhost:4300/mobiles");
     xhttp2.onload=()=>resolve(xhttp2.responseText);
     xhttp2.onerror=()=>reject(xhttp2.statusText);
     xhttp2.send();
    });
    // return pr.promise;
}
function doXML3(){
    var pr= doXML2();
    
pr.then(function (v){console.log(v)});
 
}
function doXML(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){ 
        if(this.readyState == 4 && this.status == 200){
            json = this.responseText;
            dataList = JSON.parse(json);
            console.log(dataList);
            MobileOperation.PrepareItem(dataList);
            MobileOperation.GetItem().forEach((io)=>console.log(`${io.name}`));
            console.log(`${this.responseText}`);
             document.getElementById("num").innerHTML=MobileOperation.GetItem().length;
            var ul= document.getElementById("songList");
          
            var tb = document.getElementById("tbodylist");
            tb.innerHTML="";
            MobileOperation.GetItem().forEach(printRow);
          
            MobileOperation.GetItem().forEach(function(io){
        var li= document.createElement("li");
        var img = document.createElement("img");
    
        img.setAttribute("src",io.url);
        li.innerHTML= io.id +" | "+io.name+" | "+io.price;
        li.appendChild(img);
        ul.appendChild(li);
            });
        }
    }
     // xhttp.open('get','http://cricapi.com/b7CYzlyYOrUCIIdbSlU753oGKN12/matches');
     xhttp.open('get','http://localhost:4300/mobiles');
     xhttp.send();
}
function printRow(io){
   var tablebody = document.querySelector("#tbodylist");
   var tr=tablebody.insertRow();
   let index=0;
   for(let key in io){
       
       if(key=="url"){
           tr.insertCell(index).innerHTML=`<img class='url' src='${io[key]}'/>`;
           index++;
           continue;
        }
        tr.insertCell(index).innerHTML=io[key];
       index++;
   }
   var operationtd = tr.insertCell(index);
//    var id = itemObject.id;
//   operationTd.appendChild(createIcon(id,"images/delete.png",toggleMarkUnMark));
//   operationTd.appendChild(createIcon(id,"images/edit.png",edit));
var btn = document.createElement("button");
btn.innerHTML="M";
btn.className="btn btn-danger"
btn.addEventListener("click",doMark);   
operationtd.appendChild(btn);
operationtd.appendChild(createIcon("images/delete.png"));

}
function createIcon(path){
  var img = document.createElement("img");
  img.src=path;
  img.className="icon";
  //img.setAttribute("i-d",id);
  img.addEventListener("click",doMark);
  return img;
}
function doMark(){
    console.log(`called mark..`);
}
function doAXIOS(){
 var pr = DoAxiosPR();
 pr.then(S,F);
 function S(data){
console.log("After promise1 = "+data);
console.log("After promise2 = "+data.data);

 }
 function F(error){
console.log("After promise = "+error);
 }
}
function DoAxiosPR(){

    var pr = new Promise((resolve,reject)=>{
        axios.get("http://localhost:4300/mobiles")
        .then(function (response) {
      pr.resolve(response.data);
          console.log(response.data);
          //printdata(response);
        }).catch(function (error) {
            pr.reject(error);
          console.log(error);
        }
    )});
   
  return pr.promise;
}
function doFETCH2(){

var pr = new Promise();
    fetch("http://localhost:4300/mobiles")
  .then(success,fail);
  function success(data){
  console.log(`data = ${data}`);
  console.log(`data.data = ${data.data}`);
  pr.resolve(data);
  }
  function fail(err){
      console.log(`error= ${err}`);
      pr.reject(err);
  }
  return pr.promise;
  console.log(`Promise.pr = ${pr.promise}`);
  pr.then(getdata,geterror);
  function getdata(data){
    console.log(`data = ${data}`);
    console.log(`data.data = ${data.data}`);
  }           
  function geterror(err){
    console.log(`error= ${err}`);
  }
}
function doFETCH(){
    var promise = new Promise(function(resolve, reject) {
        fetch("http://localhost:4300/mobiles").then(success,fail);
        function success(response){
          //  printdata(response);
            response.json().then(s,f);
            function s(s){
                resolve(s);
            
            }
            function f(e){
                //console.log(`error in success = ${e}`);
                reject(Error(e));       
            }
         }
            function fail(err){
                 reject(err); 
            }     
         
      });
      promise.then(function(result) {
        console.log(result); // "Stuff worked!"
       
        MobileOperation.PrepareItem(result);
        MobileOperation.GetItem().forEach((io)=>console.log(`${io.name}`));
        console.log(`${this.responseText}`);
         document.getElementById("num").innerHTML=MobileOperation.GetItem().length;
        var ul= document.getElementById("songList");
      
        var tb = document.getElementById("tbodylist");
        tb.innerHTML="";
        MobileOperation.GetItem().forEach(printRow);
      
        MobileOperation.GetItem().forEach(function(io){
    var li= document.createElement("li");
    var img = document.createElement("img");

    img.setAttribute("src",io.url);
    li.innerHTML= io.id +" | "+io.name+" | "+io.price;
    li.appendChild(img);
    ul.appendChild(li);
      }, function(err) {
        console.log(err); // Error: "It broke"
      });
      })
}
function printdata(data) {
 
for(var i=0;i<data.length;i++){
    console.log(`d =  ${data[i].name}`);
}
}