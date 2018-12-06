// Initialize Firebase
import {config} from './configFB.js';
import {eventFB} from './eventFirebase.js';
import {idolClass} from './CRUD.js';
import {validation} from './validation.js';

// t?o instance c?a class eventFireBase
let event = new eventFB();

// t?o instance c?a class CRUD
let idolInstance = new idolClass();

// kh?i t?o l?p ki?m tra c?a class validation
let validInstance = new validation();

// kh?i t?o Firebase t? CLOUD
firebase.initializeApp(config);

// t?o instance database t? Firebase
let database = firebase.database();

// t?o đ?i tư?ng idol
let idolsFB = database.ref('idols');


//l?y các danh sách ID c?a thu?c tính
let name = document.getElementById('name');
let phone = document.getElementById('phone');
let description = document.getElementById('description');

// l?y danh sách các class đ? hi?n th? chi ti?t
let className = document.getElementsByClassName('name');
let classPhone = document.getElementsByClassName('phone');
let classDescription = document.getElementsByClassName('description');


// khi có s? thay đ?i v? data trong DB th? s? ki?n này s? b?t
// hàm callback tr? v? data c?a idols cha đó
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