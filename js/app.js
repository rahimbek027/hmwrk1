const nameInput = document.querySelector(".data");
const lastnameInput = document.querySelector(".id");
const usernameInput = document.querySelector(".name");
const ageInput = document.querySelector(".price");
const plusButton = document.querySelector(".plus");
const faXmark = document.querySelector(".fa-xmark");
const openbar = document.querySelector(".openbar");
const form = document.querySelector(".form");
const qoshishButton = document.querySelector(".qoshish");
const tableBody = document.querySelector("table tbody");
const scoreSelect = document.querySelector(".score");

let rowCount = 0;
const maxRows = 300;


document.addEventListener("DOMContentLoaded", () => {
  const storedData = JSON.parse(localStorage.getItem("tableData"));
  if (storedData) {
    storedData.forEach((row) => {
      addRowToTable(
        row.name,
        row.id,
        row.name,
        row.price,
        row.quantity,
        row.total
      );
    });
  }
});


function addRowToTable(data, id, name, price, quantity, total) {
  const newRow = document.createElement("tr");
  newRow.classList.add("tr");

  newRow.innerHTML = `
  <td contenteditable="true" data-call="data">${data}</td>
  <td contenteditable="true" data-call="lastname">${id}</td>
  <td contenteditable="true" data-call="username">${name}</td>
  <td contenteditable="true" data-call="age">${price}</td>
  <td contenteditable="true" class="id" data-call="id">${quantity}</td>
  <td contenteditable="true" data-call="ilesScore">${total}</td>
`;

  tableBody.appendChild(newRow);
  rowCount++;
}

plusButton.addEventListener("click", () => {
  openbar.style.display = "flex";
});

openbar.addEventListener("click", (event) => {
  if (event.target === openbar) {
    openbar.style.display = "none";
  }
});

faXmark.addEventListener("click", () => {
  openbar.style.display = "none";
});

qoshishButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (rowCount >= maxRows) {
    alert("Siz faqat 6 ta qatordan ko'p qo'sha olmaysiz.");
    return;
  }

  const data = nameInput.value.trim();
const id = lastnameInput.value.trim();
const name = usernameInput.value.trim();
const price = ageInput.value.trim();


  if (!data || !id || !name || !price) {
    alert("Barcha maydonlar to'ldirilishi shart.");
    return;
  }

  const scoreOptions = Array.from(scoreSelect.options);
  const randomOption =
    scoreOptions[Math.floor(Math.random() * scoreOptions.length)].value;

  const randomId = Math.floor(Math.random() * 100000) + 1;

  addRowToTable(data, id, name, price, randomId, randomOption);

  const tableData = JSON.parse(localStorage.getItem("tableData")) || [];
  tableData.push({
    data,
    id,
    name,
    price,
    quantity: randomId,
    total: randomOption,
  });
  localStorage.setItem("tableData", JSON.stringify(tableData));

  form.reset();
  openbar.style.display = "none";
});