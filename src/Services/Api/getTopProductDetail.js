export function getTopProductDetail(productId)
{
    let url = "http://webbase.com.vn/ceramic/product-api/" + productId +"?expand=photos,stock"
    return fetch(url)
    .then(res => res.json())
}