#   
<!DOCTYPE html>  
<html>  
<head>  
<title>Register</title>  
<link rel="stylesheet" href="style.css">  
</head>  
<body>  
  
<div class="card">  
<h2>Create Account</h2>  
  
<input type="email" id="email" placeholder="Email">  
<input type="password" id="password" placeholder="Password">  
  
<select id="role">  
<option value="user">User</option>  
<option value="admin">Admin</option>  
</select>  
  
<button onclick="register()">Register</button>  
  
<p>Already have an account?    
<a href="index.html">Login here</a></p>  
  
</div>  
  
<script src="app.js"></script>  
  
</body>  
</html>  
