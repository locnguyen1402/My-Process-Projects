// Initialize Firebase
import {
    config
} from './configFB.js';
import {
    eventFB
} from './eventFirebase.js';
import {
    idolClass
} from './CRUD.js';

// tạo instance của class eventFireBase
let event = new eventFB();

// tạo instance của class CRUD
let idolInstance = new idolClass();

// khởi tạo Firebase từ CLOUD
firebase.initializeApp(config);

// tạo instance database từ Firebase
let database = firebase.database();

// tạo đối tượng idol
let idolsFB = database.ref('idols');

// khi có sự thay đổi về data trong DB thì sự kiện này sẽ bắt
// hàm callback trả về data của idols cha đó
let table = document.getElementById('table');
idolsFB.on('value', (snapshot) => {

    table.innerHTML = '';
    snapshot.forEach((child) => {
        event.add(child, table);
    });
    let IDs = document.getElementsByClassName('index');
    for (let i = 0; i < IDs.length; i++) {
        IDs[i].onclick = () => {
            id.value = IDs[i].innerHTML;
            console.log(i);
        };
    }
});




// add new idol
let name = document.getElementById('name');
let phone = document.getElementById('phone');
let description = document.getElementById('description');

let btnSave = document.getElementById('save');
btnSave.addEventListener('click', () => {
    idolInstance.add(idolsFB, name.value, phone.value, description.value);
    document.getElementsByTagName('form')[0].reset();
});


// remove idol
let btnDelete = document.getElementById('delete');
btnDelete.addEventListener('click', () => {
    let idolKey = firebase.database().ref(`idols/${id.value}`);
    console.log(id.value);
    let isConfirm = confirm("Are you sure to delete this record");
    if (isConfirm) {
        idolInstance.remove(idolKey);
    }
    document.getElementsByTagName('form')[0].reset();
});