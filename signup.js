function signup(event) {
  event.preventDefault();
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  const email = document.getElementById("signupEmail").value;

  fetch("https://fakestoreapi.com/users", {
    method: "POST",
    body: JSON.stringify({
      email,
      username,
      password,
      name: {
        firstname: "John",
        lastname: "Doe",
      },
      address: {
        city: "New York",
        street: "123 Main",
        number: 1,
        zipcode: "10001",
        geolocation: {
          lat: "0",
          long: "0",
        },
      },
      phone: "123-456-7890",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      document.getElementById(
        "message"
      ).textContent = `Signup successful for ${username}`;
      localStorage.setItem("username", username);
      window.location.href = "index.html";
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("message").textContent = "Signup failed!";
    });
}