let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

//Cereate function get Total
//onkeyup
function getTotal() {
  if (price.value != ``) {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = `#040`;
  } else {
    total.innerHTML = ``;
    total.style.background = `#a00d02`;
  }
}

//create Product  think save data in where  => array
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
//save in local storage
//====================================

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  //   counting
  if (mood === `create`) {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    mood = `create`;
    submit.innerHTML = `Create`;
    count.style.display = `block`;
  }
  //====================================
  //save localstorage
  localStorage.setItem(`product`, JSON.stringify(dataPro));
  clearData();
  showData();
};

/// save in local Storage |
//== localStorage.setItem('nameofDatavale in local', data take from java Script);
// localStorage.setItem(`product`, JSON.stringify(dataPro));
//clear inputs
function clearData() {
  title.value = ``;
  price.value = ``;
  taxes.value = ``;
  ads.value = ``;
  discount.value = ``;
  category.value = ``;
  count.value = ``;
  total.innerHTML = ``;
}

//read input in table
function showData() {
  getTotal();
  let table = ``;
  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="upDate(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>
    `;
  }
  document.getElementById(`tbody`).innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick="deleteAll()">delete All (${dataPro.length}Row)</button>`;
  } else {
    btnDelete.innerHTML = ``;
  }
}
showData();

//delete
//clean Data
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
//deleteAll
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

//update
//==========================
function upDate(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  getTotal();
  count.style.display = `none`;
  submit.innerHTML = `UpDate`;
  mood = `update`;
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
