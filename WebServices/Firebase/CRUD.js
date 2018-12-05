export class idolClass {
    constructor() {
        console.log('create instance idol class');
    }

    add(idolsFB, name, phone, description){
        // thêm 1 idol mới
        // khi dùng push thì Firebase sẽ tự động tạo 1 ID riêng biệt
        idolsFB.push({
            name: name.value,
            phone: phone.value,
            description: description.value
        });
    }

    remove(idolKey){
        // xóa key trong đối tượng Idol
        idolKey.remove()
        .then(function () {
            console.log("Remove succeeded.");
        })
        .catch(function (error) {
            console.log("Remove failed: " + error.message);
        });
    }

    update(idolKey, name, phone, description){
        let data = {
            name: name.value,
            phone: phone.value,
            description: description.value
        };
        idolKey.update(data);
    }
}