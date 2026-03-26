#   
const BASE_URL = "https://advance-queue-management-backend.onrender.com";  
  
  
// ================= LOGIN =================  
async function login(){  
  
    let email = document.getElementById("email").value;  
    let password = document.getElementById("password").value;  
  
    if(!email || !password){  
        alert("Please fill all fields");  
        return;  
    }  
  
    try{  
  
        let res = await fetch(`${BASE_URL}/login`,{  
            method:"POST",  
            headers:{  
                "Content-Type":"application/json"  
            },  
            body:JSON.stringify({email,password})  
        });  
  
        let data = await res.json();  
  
        if(res.ok){  
  
            localStorage.setItem("user_email", email);  
            localStorage.setItem("role", data.role);  
  
            if(data.role === "admin"){  
                window.location = "admin.html";  
            } else {  
                window.location = "dashboard.html";  
            }  
  
        } else {  
            alert(data.detail || "Login failed");  
        }  
  
    } catch(err){  
        console.error(err);  
        alert("Server error");  
    }  
}  
  
  
// ================= REGISTER =================  
async function register(){  
  
    let email = document.getElementById("email").value;  
    let password = document.getElementById("password").value;  
    let role = document.getElementById("role").value;  
  
    if(!email || !password){  
        alert("Please fill all fields");  
        return;  
    }  
  
    try{  
  
        let res = await fetch(`${BASE_URL}/register`,{  
            method:"POST",  
            headers:{  
                "Content-Type":"application/json"  
            },  
            body:JSON.stringify({email,password,role})  
        });  
  
        let data = await res.json();  
  
        if(res.ok){  
            alert("Registration successful! Please login.");  
            window.location = "index.html";  
        } else {  
            alert(data.detail || "Registration failed");  
        }  
  
    } catch(err){  
        console.error(err);  
        alert("Server error");  
    }  
}  
  
  
// ================= BOOK TOKEN =================  
async function book(){  
  
    let email = localStorage.getItem("user_email");  
  
    if(!email){  
        alert("Please login first");  
        window.location = "index.html";  
        return;  
    }  
  
    try{  
  
        let res = await fetch(`${BASE_URL}/book`,{  
            method:"POST",  
            headers:{  
                "Content-Type":"application/json"  
            },  
            body:JSON.stringify({  
                user_email: email,  
                service: "general"  
            })  
        });  
  
        let data = await res.json();  
  
        if(res.ok){  
            document.getElementById("info").innerText =  
                `Token Number: ${data.token_number} | Estimated Wait: ${data.estimated_time} mins`;  
        } else {  
            alert("Booking failed");  
        }  
  
    } catch(err){  
        console.error(err);  
        alert("Server error");  
    }  
}  
  
  
// ================= ADMIN: NEXT TOKEN =================  
async function nextToken(){  
  
    try{  
  
        let res = await fetch(`${BASE_URL}/tokens`);  
        let data = await res.json();  
  
        let next = data.find(t => t.status === "waiting");  
  
        if(next){  
  
            await fetch(`${BASE_URL}/update/${next.token_number}?status=served`,{  
                method:"PUT"  
            });  
  
            document.getElementById("adminInfo").innerText =  
                `Now Serving Token: ${next.token_number}`;  
  
        } else {  
            document.getElementById("adminInfo").innerText =  
                "No tokens in queue";  
        }  
  
    } catch(err){  
        console.error(err);  
        alert("Error updating token");  
    }  
}  
  
  
// ================= LIVE DISPLAY =================  
async function liveDisplay(){  
  
    try{  
  
        let res = await fetch(`${BASE_URL}/queue-display`);  
        let data = await res.json();  
  
        document.getElementById("now").innerText = data.now_serving;  
        document.getElementById("next").innerText = data.next_token;  
  
    } catch(err){  
        console.error(err);  
    }  
}  
  
  
// Auto refresh ONLY on display page  
if(window.location.pathname.includes("display.html")){  
    setInterval(liveDisplay, 2000);  
}  
  
  
// ================= LOGOUT =================  
function logout(){  
    localStorage.clear();  
    window.location = "index.html";  
}  
  
  
// ================= AUTO REDIRECT =================  
  
// Prevent accessing dashboard without login  
if(window.location.pathname.includes("dashboard.html") ||  
   window.location.pathname.includes("admin.html")){  
  
    if(!localStorage.getItem("user_email")){  
        window.location = "index.html";  
    }  
}  
