let title = document.getElementById("title");

let url = document.getElementById("url");

let form = document.getElementById("form");

let result = document.getElementById("result");

let adding = function(){
    if(!checkTitleEmpty() && !checkUrlEmpty()){
        let div = document.createElement("div");
        let content = document.createTextNode({
            title: title.value,
            url : url.value,
        });
        div.appendChild(content);
        result.appendChild(div);
    }
    
};

let checkTitleEmpty = function(){
    return (title.value === "") ? true : false;
}

var checkUrlEmpty = function() {
    return (url.value === "") ? true : false;
}

console.log(result);