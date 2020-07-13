function openRecipeForm() {
    let form = document.getElementById('addRecipe');
    if (form.style.display != "flex") {
        document.getElementById('addRecipe').style.display = "flex";
        document.getElementById('openRecipeBt').innerHTML = "Отмена";
    } else {
        document.getElementById('openRecipeBt').innerHTML = "Добавить рецепт";
        document.getElementById('addRecipe').style.display = "none";
    }
}

function addImagePopUp() {
    document.getElementById('popup').style.display = "block";
}

function searchImage() {
    let name = document.getElementById('foodImageName').value;
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            parseImages(this.responseText);
        }
    });

    xhr.open("GET", "https://bing-image-search1.p.rapidapi.com/images/search?count=6&q=" + name);
    xhr.setRequestHeader("x-rapidapi-host", "bing-image-search1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "b9963a9716msh89dc96422b82a3bp1a5ca4jsnb463f989c910");

    xhr.send(data);
}

function parseImages(searchResponse) {
    console.log("PARSE RESPONSE");
    let jsValues = JSON.parse(searchResponse).value;
    let imageUrlArray = [];
    jsValues.forEach(el => imageUrlArray.push(el.contentUrl));
    imageUrlArray.forEach(el => console.log(el));
    if (imageUrlArray.length > 0) showImages(imageUrlArray);
}

function showImages(imageUrlArray) {
    let imgDiv = document.getElementById('imageSearchResults');
    imgDiv.innerHTML = "";
    let buffer = "";
    imageUrlArray.forEach(el => {
        buffer += '<img src="' + el + '" width=100 height=100 onclick=setChosenImage("' + el + '")>';
    })
    imgDiv.innerHTML = buffer;
}

function setChosenImage(chosenImage) {
    document.getElementById('foodImg').src = chosenImage;
    document.getElementById('popup').style.display = "none";
}


//функция смены категории
$(document).ready(function () {
        $(".created-recipes select").change(function () {
            let category = this.options[this.selectedIndex].value;
            console.log("chosen id_category : "+category);
            $.ajax({
                url: "load_user_recipes.php",
                type: "get",
                datatype: "json",
                data:{category:category}
            });
        });
    }
)

//функция добавления категории
$(document).ready(function () {
    $("#addCategory").click(function () {
        let newCategory = prompt("Новая категория :");
        if (newCategory) {
            $.ajax({
                url: "load_user_recipes.php",
                type: "get",
                datatype: "json",
                data: {newCategory : newCategory}
            })
        }
    })
});