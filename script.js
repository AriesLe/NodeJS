const submitBtn = document.getElementById("submit-btn");
const petArr = [];
const day =
  new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate();
const month =
  new Date().getMonth() + 1 < 10
    ? `0${new Date().getMonth() + 1}`
    : new Date().getMonth() + 1;

const renderTableData = () => {
  tbody.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
                <td>${petArr[i].name}</td>
                <td>${petArr[i].age}</td>
                <td>${petArr[i].type}</td>
                <td>${petArr[i].weight}</td>
                <td>${petArr[i].length}</td>
                <td>${petArr[i].breed}</td>
                <td><i class="bi bi-square-fill" style="color: ${
                  petArr[i].color
                }"></i></td>
                <td><i class="bi ${
                  petArr[i].vaccinated === true
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  petArr[i].dewormed === true
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  petArr[i].sterilized === true
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }"></i></td>
                <td>${petArr[i].date}</td>
                <td><button type="button" class="btn btn-danger" onclick="deletePet('${
                  petArr[i].id
                }')">Delete</button></td>
                `;
    tbody.appendChild(row);
  }
};

const deletePet = (id) => {
  const index = petArr.findIndex((x) => x.id == id);
  petArr.splice(index, 1);
  renderTableData();
};

submitBtn.addEventListener("click", function () {
  const data = {
    id: "P00" + document.getElementById("input-id").value,
    name: document.getElementById("input-name").value,
    age: parseInt(document.getElementById("input-age").value),
    type: document.getElementById("input-type").value,
    weight: document.getElementById("input-weight").value + " " + "kg",
    length: document.getElementById("input-length").value + " " + "cm",
    color: document.getElementById("input-color-1").value,
    breed: document.getElementById("inputbreed").value,
    vaccinated: document.getElementById("input-vaccinated").checked,
    date: `${day}/${month}/${new Date().getFullYear()}`,
    dewormed: document.getElementById("input-dewormed").checked,
    sterilized: document.getElementById("input-sterilized").checked,
  };
  const resetData = () => {
    document.getElementById("input-id").value = "";
    document.getElementById("input-name").value = "";
    document.getElementById("input-age").value = "";
    document.getElementById("input-type").value = "";
    document.getElementById("input-weight").value = "";
    document.getElementById("input-length").value = "";
    document.getElementById("inputbreed").value = "";
    document.getElementById("input-color-1").value = "";
    document.getElementById("input-vaccinated").checked = "";
    document.getElementById("input-dewormed").checked = "";
    document.getElementById("input-sterilized").checked = "";
  };

  const validateData = () => {
    if (
      data.id == "" ||
      data.name == "" ||
      data.age == "" ||
      data.type == "" ||
      data.weight == "" ||
      data.length == "" ||
      data.color == "" ||
      data.breed == ""
    ) {
      alert("Please enter infor");
      return false;
    } else if (data.age < 1 || data.age > 15) {
      alert("Age must be between 1 and 15");
      return false;
    }
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === data.id) {
        alert("id must be unique");
        return false;
      }
    }
    return true;
  };

  const validate = validateData();
  if (validate) {
    petArr.push(data);
    resetData();
    renderTableData();
  }
});

//Show healthPet
const healthBtn = document.getElementById("healthy-btn");
let healthyCheck;
const healthyPetArr = [];
healthBtn.addEventListener("click", function () {
  // TẠO BIẾN ĐIỀU KIỆN => TRẢ VỀ BUTTON
  let healthyPetArr = petArr.filter((pet) => {
    if (!pet.vaccinated || !pet.dewormed || !pet.sterilized) {
      return false;
    }
    return true;
  });

  healthyCheck = healthyCheck === false ? true : false;

  // ĐỔI TÊN BUTTON THEO GIAO DIỆN
  if (healthyCheck) {
    healthBtn.textContent = "Show All Pet !";
    renderTableData(healthyPetArr);
  } else {
    healthBtn.textContent = "Show Healthy Pet";
    renderTableData(petArr);
  }
  return;
});

//Calculate BMI
const BMIBtn = document.getElementById("BMI-btn");
BMIBtn.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === "Cat") {
      petArr[i].BMI = (
        (petArr[i].weight * 886) /
        Math.pow(petArr[i].length, 2)
      ).toFixed(2);
    } else {
      petArr[i].BMI = (
        (petArr[i].weight * 703) /
        Math.pow(petArr[i].length, 2)
      ).toFixed(2);
    }
  }
  renderTableData(petArr);
});

const breed = JSON.parse(getFromStorage("breed"));

const renderBreed = (breed) => {
  inputbreed.innerHTML = "";
  for (let i = 0; i < breed.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `${breed[i].breed}`;
    inputbreed.appendChild(option);
  }
};

const inputType = document.getElementById("input-type");
inputType.addEventListener("change", function () {
  const optionsValue = breed.filter(function (item) {
    if (inputType.value === "Dog") return item.type === "Dog";
    if (inputType.value === "Cat") return item.type === "Cat";
    if (inputType.value === "Select type") return false;
  });
  renderBreed(optionsValue);
});
