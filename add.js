const BASE_URL = "https://melon-potent-period.glitch.me/skills";

const submitBtn = document.getElementById("submit-btn");
const h1Element = document.getElementById("unsuccessful-message");

async function postData(url) {
  const skill = document.getElementById("add-skill").value;
  if (skill) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skill: skill,
        }),
      });
      if (response.ok) {
        const data = await response.json();

        alert("Successfully added");
        window.location.replace("./index.html");
        console.log(data);
      } else {
        alert("Error: " + response.status);
        h1Element.textContent = "Error: " + response.status;
      }
    } catch (error) {
      alert(error);
      console.error(error);
      h1Element.textContent = error.message;
    }
  } else {
    h1Element.textContent = "Please enter skill correctly.";
  }
}

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  postData(BASE_URL);
});

document
  .getElementById("see-skills-table-page")
  .addEventListener("click", () => {
    window.location.href = "./index.html";
  });
