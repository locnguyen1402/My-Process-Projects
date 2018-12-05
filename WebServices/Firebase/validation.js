export class validation{
    constructor(){
        console.log('create instance of validation class');
    }

    checkEmpty(name, phone, description){
        return (name.value == '' || phone.value == '' || description.value == '');
    }
}