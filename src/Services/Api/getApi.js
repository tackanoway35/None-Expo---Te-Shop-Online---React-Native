export function getApi(url)
{
    return fetch(url)
    .then(res => res.json())
}