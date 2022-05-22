"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDate: [
    "2022-03-16T11:44:09.932Z",
    "2022-03-15T11:44:09.932Z",
    "2022-03-14T11:44:09.932Z",
    "2022-03-11T11:44:09.932Z",
    "2022-03-01T11:44:09.932Z",
    "2022-02-16T11:44:09.932Z",
    "2022-02-10T11:44:09.932Z",
    "2022-04-06T11:44:09.932Z",
    "2022-03-05T11:44:09.932Z",
    "2022-04-09T11:44:09.932Z",
    "2022-03-08T11:44:09.932Z",
    "2022-01-10T11:44:09.932Z",
  ],
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDate: [
    "2022-03-16T11:44:09.932Z",
    "2022-03-15T11:44:09.932Z",
    "2022-03-14T11:44:09.932Z",
    "2022-03-11T11:44:09.932Z",
    "2022-03-01T11:44:09.932Z",
    "2022-02-16T11:44:09.932Z",
    "2022-02-10T11:44:09.932Z",
    "2022-04-06T11:44:09.932Z",
    "2022-03-05T11:44:09.932Z",
    "2022-04-09T11:44:09.932Z",
    "2022-03-08T11:44:09.932Z",
    "2022-01-10T11:44:09.932Z",
  ],
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDate: [
    "2022-03-16T11:44:09.932Z",
    "2022-03-15T11:44:09.932Z",
    "2022-03-14T11:44:09.932Z",
    "2022-03-11T11:44:09.932Z",
    "2022-03-01T11:44:09.932Z",
    "2022-02-16T11:44:09.932Z",
    "2022-02-10T11:44:09.932Z",
    "2022-04-06T11:44:09.932Z",
    "2022-03-05T11:44:09.932Z",
    "2022-04-09T11:44:09.932Z",
    "2022-03-08T11:44:09.932Z",
    "2022-01-10T11:44:09.932Z",
  ],
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDate: [
    "2022-03-16T11:44:09.932Z",
    "2022-03-15T11:44:09.932Z",
    "2022-03-14T11:44:09.932Z",
    "2022-03-11T11:44:09.932Z",
    "2022-03-01T11:44:09.932Z",
    "2022-02-16T11:44:09.932Z",
    "2022-02-10T11:44:09.932Z",
    "2022-04-06T11:44:09.932Z",
    "2022-03-05T11:44:09.932Z",
    "2022-04-09T11:44:09.932Z",
    "2022-03-08T11:44:09.932Z",
    "2022-01-10T11:44:09.932Z",
  ],
};

const accounts = [account1, account2, account3, account4];

accounts.forEach(function (val) {
  val.userName = val.owner
    .toLowerCase()
    .split(" ")
    .map(function (val) {
      return val[0];
    })
    .join("");
});

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");
const fromLabel = document.querySelector(".form__label");
const labelLoan = document.querySelector(".form__label--loan");
const labelMovementsDate = document.querySelector(".movements__date");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const divMovmentType = document.querySelector(".movements__type--deposit");

// Date

let hozirInt = new Date();
let options = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
let davlat = navigator.language;
let uzb = new Intl.DateTimeFormat(davlat, options).format(hozirInt);
labelDate.textContent = uzb;

/// functions

const pulYigindisi = function (obj) {
  let yig = obj.movements.reduce(function (full, val) {
    return full + val;
  }, 0);
  return yig;
};

let out = 0;
let sumIn = 0;
let komissiya = 0;

const statistika = function (obj) {
  (out = obj.movements
    .filter(function (val) {
      return val < 0;
    })
    .reduce(function (full, val) {
      return full + val;
    })),
    0;

  (sumIn = obj.movements
    .filter(function (val) {
      return val > 0;
    })
    .reduce(function (full, val) {
      return full + val;
    })),
    0;

  (komissiya = obj.movements
    .filter(function (val) {
      return val < 0;
    })
    .map(function (val) {
      return (val * obj.interestRate) / 100;
    })
    .reduce(function (full, val) {
      return full + val;
    })),
    0;
};

let kirganUser;

let ekrangaTranzaksiyalarniChiqarish = function (obj) {
  containerMovements.innerHTML = "";
  obj.movements.forEach(function (val, key) {
    let tekshiruv = val > 0 ? "deposit" : "withdrawal";
    let sanalar = new Date(
      obj.movementsDate[obj.movementsDate.length - key - 1]
    );
    let kun = sanalar.getDate();
    let oy = sanalar.getMonth() + 1;
    let yil = sanalar.getFullYear();

    let qalay = `
          <div class="movements__row">
          <div class="movements__type movements__type--${tekshiruv}">deposit ${
      key + 1
    }</div>
    <div class="movements__date">${kun} / ${oy} / ${yil}</div>
    <div class="movements__value">${val}</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", qalay);
  });
};

// UI Update
const updateUI = function () {
  ekrangaTranzaksiyalarniChiqarish(kirganUser);
  labelBalance.textContent = `${pulYigindisi(kirganUser)} €`;
  statistika(kirganUser);
  labelSumIn.textContent = sumIn;
  labelSumOut.textContent = Math.abs(out);
  labelSumInterest.textContent = Math.abs(komissiya);
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  let login = inputLoginUsername.value;
  let parol = Number(inputLoginPin.value);

  kirganUser = accounts.find(function (val) {
    return val.userName == login;
  });
  if (kirganUser?.pin === parol) {
    inputLoginUsername.value = inputLoginPin.value = "";
    labelWelcome.textContent = `Welcome ${kirganUser.owner}`;
    containerApp.style.opacity = 1;
    labelWelcome.style.color = "#333";
  } else {
    labelWelcome.textContent = `Try again`;
    labelWelcome.style.color = "red";
  }
  if (!kirganUser) {
    labelWelcome.textContent = "try again";
    labelWelcome.style.color = "red";
  }
  updateUI();
});
// console.log(kirganUser);
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  let transferTo = inputTransferTo.value;
  let transferamount = Number(inputTransferAmount.value);
  let oluvchi = accounts.find((val) => val.userName == transferTo);
  if (
    transferamount < pulYigindisi(kirganUser) &&
    transferTo !== kirganUser.userName
  ) {
    oluvchi.movements.push(transferamount);
    kirganUser.movements.push(-transferamount);
    fromLabel.textContent = "Transfer to";
    fromLabel.style.color = "#333";
  } else {
    fromLabel.textContent = "Not found login";
    fromLabel.style.color = "red";
  }

  updateUI();
  inputTransferAmount.value = "";
  inputTransferTo.value = "";
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  let inpLoan = Number(inputLoanAmount.value);

  if (
    inpLoan < 6 * pulYigindisi(kirganUser) &&
    inpLoan * 10 > pulYigindisi(kirganUser)
  ) {
    kirganUser.movements.push(inpLoan);
    labelLoan.textContent = "Amount";
    labelLoan.style.color = "#333";
  } else {
    labelLoan.textContent = "Sorry, please retry";
    labelLoan.style.color = "red";
  }
  updateUI(kirganUser);

  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  let fromInpUser = inputCloseUsername.value;
  let fromInpPin = Number(inputClosePin.value);

  if (fromInpUser == kirganUser.userName && fromInpPin === kirganUser.pin) {
    containerApp.style.opacity = 0;
  } else {
    alert("error login or parol");
  }

  inputClosePin.value = "";
  inputCloseUsername.value = "";
});
let uzgar;
let uzgar2 = 0;

labelBalance.addEventListener("click", function () {
  uzgar2++;
  [...document.querySelectorAll(".movements__row")].forEach(function (
    val,
    key
  ) {
    if (uzgar2 % 2 == 1) {
      if (key % 2 == 0) {
        val.style.backgroundColor = "blue";
      } else if (key % 2 == 1) {
        val.style.backgroundColor = "green";
      }
    } else if (uzgar2 % 2 == 0) {
      val.style.backgroundColor = "white";
    }
  });
});

// Sort

let sort = {};
let a = 1;
let movementSort = [];
btnSort.addEventListener("click", function () {
  if (a == 1) {
    containerMovements.innerHTML = "";
    movementSort = [...kirganUser.movements];
    movementSort.sort((a, b) => a - b);
    sort.movements = movementSort;
    ekrangaTranzaksiyalarniChiqarish(sort);
    a = 0;
  } else {
    ekrangaTranzaksiyalarniChiqarish(kirganUser);
    a = 1;
  }
});

///////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let obj1 = { name: "jafar", age: 20 };
// let obj2 = { name: "aziz", age: 18 };
// let obj3 = { name: "bekzod", age: 22 };

// let x = [obj1, obj2, obj3];
// let y = x.find(function (val) {
//   return val.name == "bekzod";
// });
// console.log(y);
// let x;
// labelBalance.addEventListener("click", function () {
//   x = document.querySelectorAll(".movements__value");
//   let t = [...x];
//   let k = t.map(function (val, key) {
//     return Number(val.textContent.replace("€", ""));
//   });
//   console.log(k);
// });
