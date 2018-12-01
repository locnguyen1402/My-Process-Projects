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

// khi có 1 idol được tạo thì sự kiện này sẽ bắt
// hàm callback trả về data của idol đó
let id = document.getElementById('id');
let indexID;
let table = document.getElementById('table');
idolsFB.on('child_added', (snapshot) => {
    event.add(snapshot, table);
    let IDs = document.getElementsByClassName('index');
    for (let i = 0; i < IDs.length; i++) {
        IDs[i].onclick = () => {
            id.value = IDs[i].innerHTML;
            indexID = i;
            console.log(i);
            
        };
    }
    if(localStorage.getItem('length') != null){
        let i = localStorage.getItem('length');
        console.log(i);
        
        localStorage.setItem('length', i);
    }
});

// khi có 1 idol được xóa thì sự kiện này sẽ bắt
// hàm callback trả về data của idol đó
idolsFB.on('child_removed', (snapshot) => {
    console.log(snapshot.val());

    let uplen = localStorage.getItem('length');
    uplen--;
    localStorage.setItem('length', uplen);

    // chạy 1 client thì được nhưng 2 client trở lên thì bị lỗi
    table.deleteRow(indexID);

});

idolsFB.on('value', (snapshot) => {
    let len = snapshot.numChildren();
    if (len === 0) {
        console.log('0 here');
        localStorage.removeItem('length');
        return;
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
    idolInstance.remove(idolKey);
});