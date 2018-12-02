export class eventFB {
    constructor() {
        console.log('create instance event Firebase');
    }

    add(snapshot, table) {
        
        // gắn các thuộc tính vào biến data
        let data = snapshot.val();
        let arr = new Array();
        arr[0] = table.insertRow();
        // thêm class 0 vào thẻ td đầu tiên
        let firstTD = arr[0].insertCell();
        firstTD.classList.add('index');
        firstTD.innerHTML = snapshot.key;

        arr[0].insertCell().innerHTML = data.name;
        arr[0].insertCell().innerHTML = data.phone;
        arr[0].insertCell().innerHTML = data.description;
        console.log('arr length: ' + arr.length);
    }
}