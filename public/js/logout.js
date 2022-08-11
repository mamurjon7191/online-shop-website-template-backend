document.querySelector(".logout").addEventListener("click", async () => {
  try {
    console.log(2);
    const res = await axios({
      method: "POST",
      url: "/logout",
    });
    if (res.status === 200) {
      alert("Siz tizimdan chiqdingiz");
      window.setTimeout(() => {
        location.assign("/home");
      }, 1000);
    }
    console.log(res);
  } catch (err) {
    console.log(err);
  }
});
