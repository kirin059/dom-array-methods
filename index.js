const main = document.querySelector("#main"); // 오른쪽 Person / Wealth

// 버튼
const addUserBtn = document.querySelector("#add_user");
const doubleBtn = document.querySelector("#double");
const showMillionairesBtn = document.querySelector("#show_millionaires");
const sortBtn = document.querySelector("#sort");
const calculateWealthBtn = document.querySelector("#calculate_wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch함수 사용  >>  random user and add money
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api"); // fetch함수를 res에 담아주기
    const data = await res.json(); // res(fetch함수가 담긴 변수)를 json으로 풀어주기(해석)

    const user = data.results[0]; // fetch함수 내 result에서 0번째 데이터 가져오기  >> user에 값 담기

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
}

// Double eveyones money
function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
}

// Sort users by richest
function sortByRichest() {
    console.log(123);
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// Filter only millionaires
function showMillionaires() {
    data = data.filter((user) => user.money > 1000000);

    updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

    providedData.forEach((item) => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
