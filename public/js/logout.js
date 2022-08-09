document.querySelector(".logout").addEventListener("click", async () => {
  try {
    console.log(2);
    const res = await axios({
      method: "GET",
      url: "/logout",
    });
    if (res.status === 200) {
      alert("Siz tizimdan chiqdingiz");
      window.setTimeout(() => {
        location.assign("/login");
      }, 1000);
    }
    console.log(res);
  } catch (err) {
    console.log(err);
  }
});
