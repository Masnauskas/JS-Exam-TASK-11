const BASE_URL = "https://melon-potent-period.glitch.me/skills";

const BASE_URL_FOR_DELETE = "https://melon-potent-period.glitch.me/skill/";

async function getSkillsData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    alert(error);
    return null;
  }
}

async function drawSkillsFromURL(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      skillsArray = await getSkillsData(url);
      console.log(skillsArray);
      drawSkillsTable(skillsArray);
    }
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

function capitalizeEachFirstLetter(input) {
  const words = input.split(" ");
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
}

function drawSkillsTable(data) {
  const tbody = document.querySelector("tbody");

  data.forEach((itemData) => {
    const id = document.createElement("td");
    id.textContent = itemData.id;

    const skill = document.createElement("td");
    skill.textContent = capitalizeEachFirstLetter(itemData.skill);

    const deleteBtn = document.createElement("td");
    deleteBtn.textContent = "delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      deleteItems(BASE_URL_FOR_DELETE + itemData.id);
    });

    const tr = document.createElement("tr");
    tr.append(id, skill, deleteBtn);
    tbody.append(tr);
  });
}

async function deleteItems(url) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert("Skill deleted successfully");

      location.reload(true);
    }
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

document.getElementById("see-add-skills-page").addEventListener("click", () => {
  window.location.href = "./add.html";
});

drawSkillsFromURL(BASE_URL);
