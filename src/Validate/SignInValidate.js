export default validate = values => {
    const error = {};
    var username = values.username;
    var password = values.password;
    if(values.username === undefined)
    {
        username = '';
    }
    if(values.password === undefined)
    {
        password = '';
    }
    if(!username)
    {
        error.username = "User name is required";
    }
    if(username.length > 24)
    {
        error.username = "Max 24 characters"
    }
    if(!password)
    {
        error.password = "Password is required";
    }
    if(password.length > 24)
    {
        error.password = "Max 24 characters"
    }
    return error;
    
};