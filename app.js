const BASE_URL="https://backend-6b1n.onrender.com";

async function login(){
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;
let res=await fetch(`${BASE_URL}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});
let data=await res.json();
if(res.ok){localStorage.setItem("user_email",email);window.location="dashboard.html";}
else{alert(data.detail);}
}

async function register(){
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;
let res=await fetch(`${BASE_URL}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});
let data=await res.json();
if(res.ok){alert("Registered");window.location="index.html";}
else{alert(data.detail);}
}

async function book(){
let email=localStorage.getItem("user_email");
let res=await fetch(`${BASE_URL}/book`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_email:email,service:"general"})});
let data=await res.json();
document.getElementById("status").innerText="Token: "+data.token_number+" Wait: "+data.estimated_time;
}

function logout(){localStorage.clear();window.location="index.html";}