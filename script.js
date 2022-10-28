const BASE_URL = "https://melon-potent-period.glitch.me";

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

function drawSkillsTable(data) {
  const table = document.querySelector("table");
  const tbody = document.querySelector("tbody");

  data.forEach((itemData) => {
    const id = document.createElement("td");
    id.textContent = itemData.id;

    const skill = document.createElement("td");
    skill.textContent = itemData.skill;

    const deleteBtn = document.createElement("td");
    deleteBtn.textContent = "delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      deleteItems(BASE_URL + "/" + dataItem.id);
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
      window.location.reload();
      // create new array
      newSkillsArray = await getSkillsData(BASE_URL);
      // draw with new array

      drawSkillsTable(newSkillsArray);
    }
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

drawSkillsFromURL(BASE_URL);
