export function postApi(url, data)
{
    //Append data to formData
    let formData = new FormData();
    
    for (let key in data)
    {
        formData.append(key, data[key])
    }
    return fetch(url, {
        method : 'post',
        headers : {
            'Content-Type' : 'multipart/form-data'
        },
        body : formData
    })
    .then(res => res.json())
    
}