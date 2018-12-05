// Initialize Firebase
import {config} from './configFB.js';
import {eventFB} from './eventFirebase.js';
import {idolClass} from './CRUD.js';
import {validation} from './validation.js';

// tạo instance của class eventFireBase
let event = new eventFB();

// tạo instance của class CRUD
let idolInstance = new idolClass();

// khởi tạo lớp kiểm tra của class validation
let validInstance = new validation();

// khởi tạo Firebase từ CLOUD
firebase.initializeApp(config);

// tạo instance database từ Firebase
let database = firebase.database();

// tạo đối tượng idol
let idolsFB = database.ref('idols');


//lấy các danh sách ID của thuộc tính
let name = document.getElementById('name');
let phone = document.getElementById('phone');
let description = document.getElementById('description');

// lấy danh sách các class để hiện thị chi tiết
let className = document.getElementsByClassName('name');
let classPhone = document.getElementsByClassName('phone');
let classDescription = document.getElementsByClassName('description');


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
            name.value = className[i].innerHTML;
            phone.value = classPhone[i].innerHTML;
            description.value = classDescription[i].innerHTML;
            console.log(i);
        };
    }
});




// add new idol
let btnSave = document.getElementById('save');
btnSave.addEventListener('click', () => {
    if (validInstance.checkEmpty(name, phone, description)) {
        alert('the input field must not empty -- SAVE');
        return;
    } else {
        idolInstance.add(idolsFB, name, phone, description);
        document.getElementsByTagName('form')[0].reset();
    }

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


// edit idol
let btnEdit = document.getElementById('edit');
btnEdit.addEventListener('click', () => {
    let idolKey = firebase.database().ref(`idols/${id.value}`);
    if(validInstance.checkEmpty(name, phone, description)){
        alert('the input field must not empty -- EDIT');
    } else {
        idolInstance.update(idolKey, name, phone, description);
        document.getElementsByTagName('form')[0].reset();
    }
    
});