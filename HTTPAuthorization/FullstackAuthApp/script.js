let funcSignUp = async ()=>{
    let name= document.querySelector("#userText").value;
    let userpassword = document.querySelector("#passwordText").value;

    let response = await axios.post("http://localhost:3000/sign-up", {
        userName: name,
        password: userpassword
    })

    alert(`${response.data.message}`)
}

let funcSignIn = async ()=>{
    let name= document.querySelector("#userIn").value;
    let userpassword = document.querySelector("#passwordIn").value;

    let response = await axios.post("http://localhost:3000/sign-in", {
        userName: name,
        password: userpassword
    })

    // let userJWT = response.data.message;

    //localStorage is a browser feature that lets you store small pieces of data (key-value pairs) in the user’s browser.
    // ✅ It persists even after a page reload or closing the browser tab (until manually cleared).
    localStorage.setItem("jwtToken", response.data.message);

    alert(`${response.data.message}`)

}

let getInfo = async ()=>{
    let getResponse = await axios.get("http://localhost:3000/me", {
        headers: {
            authorization : localStorage.getItem("jwtToken")
        }
    })

    let userDataDiv = document.createElement("div");
    userDataDiv.textContent = getResponse.data.userName;

    let userPasswordDiv = document.createElement("div");
    userPasswordDiv.textContent = getResponse.data.userPassword;

    document.querySelector("#InfoContainer").appendChild(userDataDiv);
     document.querySelector("#InfoContainer").appendChild(userPasswordDiv);
}

const logout = async()=> {
    localStorage.removeItem("jwtToken");
}

getInfo()