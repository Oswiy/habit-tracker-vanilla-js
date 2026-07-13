const addHabitForm = document.getElementById("addHabitForm");
const addHabitInput = document.getElementById("addHabitInput");
const habitList = document.getElementById("habitList");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function storeHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function idProvider() {
  const habitsId = habits.map((habit) => habit.id);
  console.log(habitsId);
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

  habits = [...habits, { name: habit, status: "active", id: autoIdCounter() }];
  addHabitInput.value = "";
  storeHabits();
  renderHabits();
}

function renderHabits() {
  habitList.textContent = "";
  habits.forEach((habit) => {
    const divHabitCard = document.createElement("div");
    const divNameStatus = document.createElement("div");
    const h4habitName = document.createElement("h4");
    const h4status = document.createElement("h4");
    const divBtnContainer = document.createElement("div");
    const doneBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    //  div:
    divHabitCard.classList.add("habitCard");
    //  habit name:
    h4habitName.textContent = `Name: ${habit.name}`;
    //  habit status:
    h4status.textContent = `Status: ${habit.status}`;
    // done btn:
    doneBtn.textContent = "Done";
    // delete btn:
    deleteBtn.textContent = "Delete";

    divNameStatus.classList.add("divNameStatus");
    divNameStatus.append(h4habitName, h4status);
    divBtnContainer.append(doneBtn, deleteBtn);
    divBtnContainer.classList.add("divBtnContainer");
    divHabitCard.append(divNameStatus, divBtnContainer);
    habitList.append(divHabitCard);
  });
}

addHabitForm.addEventListener("submit", addHabit);
renderHabits();
