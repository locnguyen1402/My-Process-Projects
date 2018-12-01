export class idolClass {
    constructor() {
        console.log('create instance idol class');
    }

    add(idolsFB, name, phone, description){
        // kiểm tra xem localStorage có chứa key là length chưa
        if (localStorage.getItem('length') == null) {
            let index = 0;
            localStorage.setItem("length", index);
        } else {
            let i = localStorage.getItem('length');
            i++;
            localStorage.setItem("length", i);
        }
        // thêm 1 idol mới
        // khi dùng push thì Firebase sẽ tự động tạo 1 ID riêng biệt
        idolsFB.push({
            name: name,
            phone: phone,
            description: description
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
}