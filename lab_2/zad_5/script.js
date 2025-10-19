const API_URL = "http://127.0.0.1:8000"

const list = document.getElementById("list")

fetch(API_URL + "/categories")
    .then(response => response.json())
    .then(data => create_categories(data))


const create_categories = (categories) => {
    for(let category of categories){
        checkbox = create_checkbox(category)
        label = create_checkbox_label(category)

        list.appendChild(checkbox)
        list.appendChild(label)
    }
}

const create_checkbox = (value) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = value;

    return checkbox
}

const create_checkbox_label = (value) => {
    const label = document.createElement('label');
    label.htmlFor = value
    label.textContent = value;
    return label
}