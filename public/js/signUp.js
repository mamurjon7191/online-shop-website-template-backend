const enterSystem = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signUp",
      data: {
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      },
    });

    if (res.status === 200) {
      alert(
        "We have send verification link to your Email.Please get into website through this link.Thank you for understanding."
      );
      window.setTimeout(() => {
        location.assign("/sign-up");
      }, 1000);
    }
  } catch (err) {
    console.log(err);
  }
};

document.querySelector(".btnSignUp").addEventListener("click", function (e) {
  console.log(3);
  e.preventDefault();
  const name = document.querySelector(".username1").value;
  const email = document.querySelector(".email1").value;
  const password = document.querySelector(".password1").value;
  const passwordConfirm = document.querySelector(".passwordConfirm1").value;

  enterSystem(name, email, password, passwordConfirm);

  console.log(name);
  console.log(email);
  console.log(password);
  console.log(passwordConfirm);
});
