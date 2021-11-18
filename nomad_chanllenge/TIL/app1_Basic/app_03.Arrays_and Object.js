/* Arrays */
console.log('<Arrays>');
const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat"];

// Get Item from Array
console.log(daysOfWeek[5]);

// Add one more day to the Array
daysOfWeek.push("sun");
console.log(daysOfWeek);



/* Object */
console.log('<Object>');
const player = {
    name: "nico",
    point: 10, 
    fat: false,
};
console.log(player);

// Get data from Object
console.log(player["name"]);
console.log(player.name);
// player.name 에서 알 수 있듯 console.log 도 객체와 요소의 변수로 구성되어 있음을 유추할 수 있다.

// Add one more to the object
player.lastName = "apple";
console.log('player.lastName 추가', player);

// Update one data
player.point = 20;
console.log('update data', player);

// 그냥 typeof 연습해보기
console.log(typeof(player));
console.log(typeof(player.point));