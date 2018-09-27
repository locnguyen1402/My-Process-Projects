function saveBookmark() {
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }
    
    let bookmark = {
        name: siteName,
        url: siteUrl,
    };

    if(localStorage.getItem('bookmarks') === null){
        let bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    //reset form
    document.getElementById("form").reset();
    //reset the page to load data
    fetchData();
}

function fetchData() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarks);
    let result = document.getElementById('result');
    result.innerHTML = '';
    result.innerHTML += bookmarks.map(function(site){
        return `<div class="item" style="font-size: 24px">${site.name}
                    <div>
                        <a href="${site.url}" target="_blank" class="link">Visit</a>
                    </div>
                    <div>
                        <input type="button" value="delete" class="delete" onclick="deleteBookmark(\'${site.url}\')">
                    </div>
                </div>`;
    }).join('');
}

function deleteBookmark(url){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(let i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url === url){
            bookmarks.splice(i, 1);
            console.log('delete successfully');
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchData();
}


// Validate Form
function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}