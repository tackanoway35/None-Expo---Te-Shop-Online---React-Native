
export function getCategoriesTopProduct()
{
    let url = 'http://webbase.com.vn/ceramic/product-api/get-categories-top-product';
    return fetch(url)
    .then(res => res.json())
}