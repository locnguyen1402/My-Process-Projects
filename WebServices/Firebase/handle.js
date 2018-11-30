export default (child, parent) => {

    let arr = new Array(parent.numChildren());
    let table = document.getElementById('table');
    let i = 0;
    arr[i] = table.insertRow();
    arr[i].insertCell().innerHTML = child.val().id;
    arr[i].insertCell().innerHTML = child.val().name;
    arr[i].insertCell().innerHTML = child.val().phone;
    arr[i].insertCell().innerHTML = child.val().description;
    i++;
}