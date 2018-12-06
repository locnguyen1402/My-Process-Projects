export class eventFB {
    constructor() {
        console.log('create instance event Firebase');
    }

    add(snapshot, table) {

        // g?n các thu?c tính vào bi?n data
        let data = snapshot.val();
        let arr = new Array();
        arr[0] = table.insertRow();
        // thêm class 0 vào th? td đ?u tiên
        let firstTD = arr[0].insertCell();
        firstTD.classList.add('index');
        firstTD.innerHTML = snapshot.key;

        let secondTD = arr[0].insertCell();
        secondTD.classList.add('name');
        secondTD.innerHTML = data.name;

        let thirdTD = arr[0].insertCell();
        thirdTD.classList.add('phone');
        thirdTD.innerHTML = data.phone;


        let fourthTD = arr[0].insertCell();
        fourthTD.classList.add('description');
        fourthTD.innerHTML = data.description;


        console.log('arr length: ' + arr.length);
    }
}