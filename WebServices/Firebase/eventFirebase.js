export class eventFB {
    constructor() {
        console.log('create instance event Firebase');
    }

    add(snapshot, table) {
        // trả về data của idol được thêm
        let data = snapshot.val();
        
        let arr = new Array();
        let index = localStorage.getItem('length');
        arr[index] = table.insertRow();
        // thêm class index vào thẻ td đầu tiên
        let firstTD = arr[index].insertCell();
        firstTD.classList.add('index');
        firstTD.innerHTML = snapshot.key;

        arr[index].insertCell().innerHTML = data.name;
        arr[index].insertCell().innerHTML = data.phone;
        arr[index].insertCell().innerHTML = data.description;
        console.log(arr.length);
    }
}