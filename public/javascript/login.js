async function loginNow(event) {
  event.preventDefault();
  const email = document.querySelector("#loginEmail").value.trim();
  const password = document.querySelector("#loginPass").value.trim();
  console.log("USER", email, password);
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    }
  }
}

async function signupNow(event) {
  event.preventDefault();

  const email = document.querySelector("#signupEmail").value.trim();
  const password = document.querySelector("#signupPass").value.trim();
  const username = document.querySelector("#signupUser").value.trim();
  console.log("USER", email, password, username);
  if (email && username && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
        username,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector("#loginBtn").addEventListener("click", loginNow);
document.querySelector("#signupBtn").addEventListener("click", signupNow);
