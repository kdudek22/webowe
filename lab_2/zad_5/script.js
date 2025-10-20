const API_URL = "http://127.0.0.1:8000"
const list = document.getElementById("list")
const selected_items = document.getElementById("selected-items")

const checkboxes = 

document.addEventListener("change", function(){
    const items_elements = document.getElementsByClassName("item")

    const checked_items = Array.from(items_elements).filter(e => e.checked).map(e => e.id)

    selected_items.innerHTML = ""

    const div = document.createElement("div")

    for(let item of checked_items){
        const p = document.createElement("p")
        p.textContent = item
        div.appendChild(p)
    }

    selected_items.appendChild(div)
})

const fetch_data = async () => {
    const categories = await fetch_categories()

    const items = await fetch_items()

    const categories_with_items = match_items_to_categories(items, categories)

    create_checkboxes(categories_with_items)
}

const create_checkboxes = (categories_map) => {
    for(let category of categories_map.keys()){
        const element = create_category_checkboxes(category, categories_map.get(category))
        list.appendChild(element)
    }
}

const create_category_checkboxes = (category_name, category_items) => {
    const div = document.createElement("div")

    div.appendChild(create_category_checkbox_with_arrow(category_name))
    div.appendChild(create_items_checkboxes(category_items))

    div.addEventListener("change", function(e){
        const category_checkbox = div.childNodes[0].childNodes[1]
        const all_checked = all_category_items_checked(div)

        if(all_checked){
            category_checkbox.indeterminate = false
            category_checkbox.checked = true
        }
        else{
            if(none_category_items_checked(div)){
                category_checkbox.indeterminate = false
                category_checkbox.checked = false
            }
            else{
                category_checkbox.indeterminate = true
                category_checkbox.checked = false
            }

        }
    })

    return div
}

const all_category_items_checked = (element) => {
    for(let ce of element.childNodes[1].childNodes){
        if(!ce.childNodes[0].checked){
            return false
        }
    }
    return true
}

const none_category_items_checked = (element) => {
    for(let ce of element.childNodes[1].childNodes){
        if(ce.childNodes[0].checked){
            return false
        }
    }
    return true
}

const create_category_checkbox_with_arrow = (category_name) => {
    const element = document.createElement("div")
    element.appendChild(create_arrow())
    const checkbox = create_checkbox(category_name)
    element.appendChild(checkbox)
    element.appendChild(create_checkbox_label(category_name))

  checkbox.addEventListener('change', function() {
    for(let e of checkbox.parentElement.parentElement.childNodes[1].childNodes){
        e.childNodes[0].checked = checkbox.checked // toggle all child elements
    }

  });

    return element
}

const create_items_checkboxes = (items) => {
    const element = document.createElement("div")

    for(let item of items){
        const div = document.createElement("div")
        const checkbox = create_checkbox(item)
        checkbox.classList.add("item")
        div.appendChild(checkbox)
        div.appendChild(create_checkbox_label(item))
        element.appendChild(div)
    }

    element.classList.add("hidden")
    return element
}

const create_arrow = () => {
    const element = document.createElement("i")
    element.classList.add("arrow")
    element.classList.add("right")

    element.addEventListener("click", () => {
        element.classList.toggle("right");
        element.classList.toggle("down");
        element.parentElement.parentElement.childNodes[1].classList.toggle("hidden")
  });

    return element
}

const fetch_categories = async() => {
    const response = await fetch(API_URL + "/categories") 
    return await response.json()
}

const fetch_items = async() => {
    const response = await fetch(API_URL + "/items") 
    return await response.json()
}

const match_items_to_categories = (items, categories) => {
    const result = new Map();
    for (let category of categories) {
        result.set(category, get_items_for_category(items, category))
    }

    return result;
}

const get_items_for_category = (items, category) => {
    for(let item_list of items){
        if(Object.entries(item_list)[0][0] === category)
            return Object.entries(item_list)[0][1]
        }

    return []
}

fetch_data()

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