
export function requestGetCakes() {
    return fetch('http://localhost:8081/cakes')
            .then(response=>response.json())
  }
  
