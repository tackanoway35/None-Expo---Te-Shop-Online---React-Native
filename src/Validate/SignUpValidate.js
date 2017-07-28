export default validate = values => {
    const error = {};
    var username = values.username;
    var password = values.password;
    var name = values.name;
    var address = values.address;
    var email = values.email;
    var emailPattern = /\S+@\S+\.\S+/;

    if(values.username === undefined)
    {
        username = '';
    }
    if(values.password === undefined)
    {
        password = '';
    }
    if(values.name === undefined)
    {
        name = '';
    }
    if(values.address === undefined)
    {
        address = '';
    }
    if(values.email === undefined)
    {
        email = '';
    }

    if(!username)
    {
        error.username = "Username is required";
    }
    if(username.length > 24)
    {
        error.username = "Max 24 characters";
    }

    if(!password)
    {
        error.password = "Password is required";
    }
    if(password.length > 24)
    {
        error.password = "Max 24 characters";
    }

    if(!name)
    {
        error.name = "Name is required";
    }
    if(name.length > 24)
    {
        error.name = "Max 24 characters";
    }

    if(!address)
    {
        error.address = "Address is required";
    }

    // if(!email)
    // {
    //     error.email = "Email is required";
    // }
    if(email.length > 32)
    {
        error.email = "Max 32 characters";
    }
    if(emailPattern.test(email) == false)
    {
        error.email = "Invalid type : teshop@xyz.com";
    }

    return error;
}