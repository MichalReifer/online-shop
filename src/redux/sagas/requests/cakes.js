
export function requestGetCakes() {
    return fetch('http://localhost:8081/cakes/no-image')
            .then(response=>response.json())
  }
  
