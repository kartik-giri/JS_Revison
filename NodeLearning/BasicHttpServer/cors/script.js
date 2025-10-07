let sum =async ()=>{
    let a = document.querySelector("#a").value;
    let b = document.querySelector("#b").value;
let res = await fetch(`http://localhost:3001/sum`,{
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
     body: JSON.stringify({a:a,b:b})
})

let objData = await res.json();
console.log(objData);

document.querySelector("#result").textContent = objData.result
}

