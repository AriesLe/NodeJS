const breedArr = getFromStorage("breed")
  ? JSON.parse(getFromStorage("breed"))
  : [];
const submitBtn = document.getElementById("submit-btn");
const renderTableData = () => {
  tbody.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${i + 1}</th>
                <td>${breedArr[i].breed}</td>
                <td>${breedArr[i].type}</td>
                 <td><button type="button" class="btn btn-danger" onclick="deletePet('${i}')">Delete</button></td>
                `;
    tbody.appendChild(row);
  }
};

const deletePet = (i) => {
  breedArr.splice(i, 1);
  saveToStorage("breed", breedArr);
  renderTableData();
};

submitBtn.addEventListener("click", function () {
  const data = {
    breed: document.getElementById("input-breed").value,
    type: document.getElementById("input-type").value,
  };
  const resetData = () => {
    document.getElementById("input-breed").value = "";
    document.getElementById("input-type").value = "";
  };

  const validateData = () => {
    if (data.breed == "" || data.type == "") {
      alert("Please enter infor!!");
      return false;
    }
    return true;
  };

  if (validateData()) {
    breedArr.push(data);
    resetData();
    renderTableData();
    saveToStorage("breed", breedArr);
  }
});
renderTableData();
