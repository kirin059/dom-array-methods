# dom-array-methodsr 만들기 (1)
## html, javascript
![image](https://user-images.githubusercontent.com/71425369/108598003-5962be00-73cf-11eb-8be6-b249b971ca57.png)

---

1️⃣ `Fetch함수` 사용해서 데이터 받아오기

```js
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
```

