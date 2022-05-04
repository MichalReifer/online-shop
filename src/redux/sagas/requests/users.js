
export function requestGetUsers() {
    return fetch('http://localhost:8081/users')
            .then(response=>response.json())
  }
  
