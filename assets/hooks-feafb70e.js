/* LICENSES */
import{L as f,O as h,d}from"./index-f670b21d.js";import{_ as y}from"./index-3129d060.js";var m={exports:{}};(function(t){(function(){var a={}.hasOwnProperty;function n(){for(var e=[],o=0;o<arguments.length;o++){var r=arguments[o];if(r){var c=typeof r;if(c==="string"||c==="number")e.push(r);else if(Array.isArray(r)){if(r.length){var u=n.apply(null,r);u&&e.push(u)}}else if(c==="object"){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){e.push(r.toString());continue}for(var s in r)a.call(r,s)&&r[s]&&e.push(s)}}}return e.join(" ")}t.exports?(n.default=n,t.exports=n):window.classNames=n})()})(m);var C=m.exports;const E=f(C);function I(t){return t.errors!==void 0}const g="brockjuniors-dev.myshopify.com",A="2023-01",v="fe31d86295ee307f9484f41f0142495e",l=new y(`https://${g}/api/${A}/`,{headers:{"Content-Type":"application/graphql","X-Shopify-Storefront-Access-Token":v}});l.use({onRequest:async()=>{if(!navigator.onLine)return new Promise(t=>{window.addEventListener("online",()=>{t({})},{once:!0})})},onResponse:async t=>{if(t.raw.status===200){const a=await t.json();if(I(a))return{status:400,statusText:a.data.errors.map(n=>n.message).join(`
`)}}}});function S(t,a){const n=`
        query getProductByHandle {
            product(handle: "${t}") {
            id
            title
            descriptionHtml
            collections(first: 1) {
                edges {
                    cursor
                    node {
                        title
                    }
                }
            }
            images(first: 3) {
                edges {
                    cursor
                    node {
                        id
                        width
                        height
                        url
                        altText
                    }
                }
            }
            variants(first: 3) {
                edges {
                    cursor
                    node {
                        id
                        title
                        quantityAvailable
                        color: metafield(
                            namespace: "features"
                            key: "color"
                        ) {
                            value
                        }
                        image {
                            id
                            width
                            height
                            url
                            altText
                        }
                        price {
                            amount
                            currencyCode
                            }
                        }
                    }
                }
            }
        }
    `;return l.post("graphql.json",n,{signal:a}).then(e=>e.json()).then(e=>e.data.product)}function q(t,a){const e={query:`
        query cartQuery($cartId: ID!) {
            cart(id: $cartId) {
                id
                createdAt
                updatedAt
                checkoutUrl
                lines(first: 10) {
                    edges {
                        node {
                            id
                            quantity
                            merchandise {
                                ... on ProductVariant {
                                    id
                                    title
                                    image {
                                        id
                                        width
                                        height
                                        url
                                        altText
                                    }
                                    product {
                                        id
                                        title
                                        collections(first: 1) {
                                            edges {
                                                node {
                                                    id
                                                    title
                                                }
                                            }
                                        }
                                    }
                                    price {
                                        amount
                                        currencyCode
                                    }
                                }
                            }
                        }
                    }
                }
                cost {
                    totalAmount {
                        amount
                        currencyCode
                    }
                    subtotalAmount {
                        amount
                        currencyCode
                    }
                    totalTaxAmount {
                        amount
                        currencyCode
                    }
                    totalDutyAmount {
                        amount
                        currencyCode
                    }
                }
            }
        }
    `,variables:{cartId:t},operationName:"cartQuery"};return l.post("graphql.json",JSON.stringify(e),{signal:a,headers:{"Content-Type":"application/json"}}).then(o=>o.json()).then(o=>o.data.cart)}function j(t){const e={query:`
        mutation createCart($cartInput: CartInput) {
            cartCreate(input: $cartInput) {
                cart {
                    id
                    createdAt
                    updatedAt
                    checkoutUrl
                    lines(first: 10) {
                        edges {
                            node {
                                id
                                merchandise {
                                    ... on ProductVariant {
                                        id
                                    }
                                }
                            }
                        }
                    }
                    cost {
                        totalAmount {
                            amount
                            currencyCode
                        }
                        subtotalAmount {
                            amount
                            currencyCode
                        }
                        totalTaxAmount {
                            amount
                            currencyCode
                        }
                        totalDutyAmount {
                            amount
                            currencyCode
                        }
                    }
                }
            }
        }
    `,variables:{cartInput:{lines:[]}},operationName:"createCart"};return l.post("graphql.json",JSON.stringify(e),{signal:t,headers:{"Content-Type":"application/json"}}).then(o=>o.json()).then(o=>o.data.cartCreate.cart)}function T(t,{id:a},n,e){const r={query:`
        mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
                cart {
                    id
                    createdAt
                    updatedAt
                    checkoutUrl
                    lines(first: 10) {
                        edges {
                            node {
                                id
                                quantity
                                merchandise {
                                    ... on ProductVariant {
                                        id
                                        title
                                        image {
                                            id
                                            width
                                            height
                                            url
                                            altText
                                        }
                                        product {
                                            id
                                            title
                                            collections(first: 1) {
                                                edges {
                                                    node {
                                                        id
                                                        title
                                                    }
                                                }
                                            }
                                        }
                                        price {
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                            }
                        }
                    }
                    cost {
                        totalAmount {
                            amount
                            currencyCode
                        }
                        subtotalAmount {
                            amount
                            currencyCode
                        }
                        totalTaxAmount {
                            amount
                            currencyCode
                        }
                        totalDutyAmount {
                            amount
                            currencyCode
                        }
                    }
                }
            }
        }
    `,operationName:"addCartLines",variables:{cartId:t,lines:{merchandiseId:a,quantity:n}}};return l.post("graphql.json",JSON.stringify(r),{signal:e,headers:{"Content-Type":"application/json"}}).then(c=>c.json()).then(c=>c.data.cartLinesAdd.cart)}function b(t,a,n){const o={query:`
        mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
                cart {
                    id
                    createdAt
                    updatedAt
                    checkoutUrl
                    lines(first: 10) {
                        edges {
                            node {
                                id
                                quantity
                                merchandise {
                                    ... on ProductVariant {
                                        id
                                        title
                                        image {
                                            id
                                            width
                                            height
                                            url
                                            altText
                                        }
                                        product {
                                            id
                                            title
                                            collections(first: 1) {
                                                edges {
                                                    node {
                                                        id
                                                        title
                                                    }
                                                }
                                            }
                                        }
                                        price {
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                            }
                        }
                    }
                    cost {
                        totalAmount {
                            amount
                            currencyCode
                        }
                        subtotalAmount {
                            amount
                            currencyCode
                        }
                        totalTaxAmount {
                            amount
                            currencyCode
                        }
                        totalDutyAmount {
                            amount
                            currencyCode
                        }
                    }
                }
            }
        }
    `,operationName:"removeCartLines",variables:{cartId:t,lineIds:a}};return l.post("graphql.json",JSON.stringify(o),{signal:n,headers:{"Content-Type":"application/json"}}).then(r=>r.json()).then(r=>r.data.cartLinesRemove.cart)}const{useGlobalState:p}=h({cart:null,cartId:null,product:null,productHandle:null});function N(t,a){const[n,e]=p("productHandle"),[o,r]=p("product"),[c,u]=d.useState(null),s=d.useRef();return d.useEffect(()=>{n!==t&&(e(t),s.current=S(n??t,a))},[n,e,t,a]),d.useEffect(()=>{var i;(i=s.current)==null||i.then(r).catch(u)},[s,r]),{loading:!o&&!c,error:c,product:o}}function O(t){const[a,n]=d.useState(localStorage.getItem("cartId")),[e,o]=p("cart"),[r,c]=d.useState(null),u=d.useRef();return d.useEffect(()=>{a!==(e==null?void 0:e.id)&&!u.current&&(u.current=a?q(a,t):j(t))},[e,a,t]),d.useEffect(()=>{var s;(s=u.current)==null||s.then(i=>{i&&(o(i),n(i.id),localStorage.setItem("cartId",i.id),u.current=void 0)}).catch(c)},[u,o,n,c]),{loading:!e&&!r,error:r,cart:e,add:(s,i)=>{if(e)return T(e.id,s,i,t).then(o).catch(c)},remove:s=>{if(e)return b(e.id,s,t).then(o).catch(c)}}}export{O as a,E as c,N as u};
