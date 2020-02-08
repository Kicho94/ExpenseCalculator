const createUser = {
    first_name: "required|string",
    last_name: "required|string",
    email: "required|email",
    password:  "required|string|minLength:3",
    birth_date: "required|dateiso",
    telephone: "required|string|minLength:8",
    country: "required|string",
  
}

module.exports = {
createUser
}

