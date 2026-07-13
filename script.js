const addHabitForm = document.getElementById("addHabitForm");
const addHabitInput = document.getElementById("addHabitInput");
const habitList = document.getElementById("habitList");
const searchHabitForm = document.getElementById("searchHabitForm");
const searchHabitInput = document.getElementById("searchHabitInput");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function storeHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function idProvider() {
  const habitsId = habits.map((habit) => habit.id);
  let count = habits.length > 0 ? Math.max(...habitsId) : -1;
  return function idCountIncrement() {
    count++;
    return count;
  };
}

const autoIdCounter = idProvider();

function addHabit(e) {
  e.preventDefault();
  const habit = addHabitInput.value.trim();

  if (!habit) return;

  let duplicate = false;

  for (const item of habits) {
    if (habit === item.name.toLowerCase()) {
      addHabitInput.value = "";
      habitList.textContent = "This habit already exists";
      habitList.style.textAlign = "Center";
      habitList.style.fontSize = "1.3em";
      setTimeout(() => {
        habitList.style.textAlign = "";
        habitList.style.fontSize = "";
        renderHabits();
      }, 1200);
      return;
    }
  }

  habits = [...habits, { name: habit, status: "active", id: autoIdCounter() }];
  addHabitInput.value = "";
  storeHabits();
  renderHabits();
}

addHabitForm.addEventListener("submit", addHabit);

function searchHabit(e) {
  e.preventDefault();
  const target = searchHabitInput.value.trim().toLowerCase();
  if (!target) return;

  const match = habits.filter((habit) => habit.name.toLowerCase() === target);
  if (match.length === 0) {
    const h4ErrorDisplay = document.createElement("h4");
    h4ErrorDisplay.textContent = `${target} not found.`;
    h4ErrorDisplay.id = "searchErrorDisplay";
    habitList.textContent = "";
    habitList.append(h4ErrorDisplay);
    searchHabitInput.value = "";
    return;
  }

  searchHabitInput.value = "";
  renderHabits(match);
}

searchHabitForm.addEventListener("submit", searchHabit);

function renderHabits(arr = habits) {
  habitList.textContent = "";
  arr.forEach((element) => {
    const divHabitCard = document.createElement("div");
    const divNameStatus = document.createElement("div");
    const h4habitName = document.createElement("h4");
    const h4status = document.createElement("h4");
    const divBtnContainer = document.createElement("div");
    const doneBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    //  div:
    divHabitCard.classList.add("habitCard");
    divHabitCard.dataset.cardId = element.id;
    //  habit name:
    h4habitName.textContent = `Name: ${element.name}`;
    //  habit status:
    h4status.textContent = `Status: ${element.status}`;
    // done btn:
    doneBtn.classList.add("doneBtn");
    doneBtn.textContent = "Done";
    // delete btn:
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.textContent = "Delete";

    divNameStatus.classList.add("divNameStatus");
    divNameStatus.append(h4habitName, h4status);
    divBtnContainer.append(doneBtn, deleteBtn);
    divBtnContainer.classList.add("divBtnContainer");
    divHabitCard.append(divNameStatus, divBtnContainer);
    habitList.append(divHabitCard);
  });
}

habitList.addEventListener("click", (e) => {
  const habitCard = e.target.closest(".habitCard");

  if (!habitCard) return;

  const habitCardId = habitCard.dataset.cardId;
  const habitIndex = habits.findIndex((habit) => habit.id == habitCardId);

  if (e.target.classList.contains("doneBtn")) {
    habits[habitIndex].status = "completed";
  } else if (e.target.classList.contains("deleteBtn")) {
    console.log(habitIndex);
    console.log(habitCardId);
    habits.splice(habitIndex, 1);
  }
  storeHabits();
  renderHabits();
});

renderHabits();
