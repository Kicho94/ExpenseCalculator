const createUser = {
    first_name: "required|string",
    last_name: "required|string",
    email: "required|email", 
    password:  "required|string|minLength:3",
    birth_date: "required|string",
    telephone: "required|integer|minLength:8",
    counrty: "required|string"
        
}

module.exports = {
createUser
}

