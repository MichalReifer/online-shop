
export function requestGetCakes() {
    return fetch('http://localhost:8081/cakes')
            .then(response=>response.json())
  }
  
export function requestGetCakesNoImage() {
return fetch('http://localhost:8081/cakes/no-image')
        .then(response=>response.json())
}

export function requestGetCakesByCategory(category) {
return fetch('http://localhost:8081/cakes/by-category/'+category)
        .then(response=>response.json())
}


export function requestGetCakeCategories() {
return fetch('http://localhost:8081/cakes/all-categories')
        .then(response=>response.json())
}

