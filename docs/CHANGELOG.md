### [EXAMPLE](CHANGELOG_EXAMPLE.md) !Always should be on the TOP!

----

## Changes: 24/08/2023

- Added `isPublish` field to the Product schema.
- Updated `"@prisma/client"` to ` "^5.0.0"`

### Added:

```graphql
mutation updateProduct(
    $id: String!
    $name: String!
    $description: String!
    $count: Int!
    $price: Float!
    $categories: [String!]
    $imageUrl: String!
    $isPunlish: Boolean
) {
    updateProduct(
        id: $id
        isPublished: $isPunlish
        name: $name
        description: $description
        price: $price
        count: $count
        categories: $categories
        imageUrl: $imageUrl
    ) {
        name
        description
        id
        count
        imageUrl
        categories {
            name
        }
    }
}
```

----

## Changes: 14/08/2023

### Added:

```graphql
query getOrderById($id: String) {
    order(id: $id) {
        id
        status
        billingInfo {
            id
        }
        products {
            id
        }
    }
}
```

### Changed:

Added Email to order.billingInfo , and Also when the order is creating you should add email to BillingInfo

from:

```graphql
query getOrders($limit: Int, $page: Int) {
    orders(limit: $limit, page: $page) {
        id
        status
        billingInfo {
            id
        }
        products {
            id
        }
    }
}
```

to:

```graphql
query getOrders($limit: Int, $page: Int, $email: String) {
    orders(limit: $limit, page: $page, email: $email) {
        id
        status
        billingInfo {
            id
            email
        }
        products {
            id
        }
    }
}
```

----

## Changes: 13/08/2023

### Changed:

from:

```graphql
query getProducts($categories: [String!], $limit: Int, $page: Int) {
    countProducts(categories: $categories)
    products(limit: $limit, page: $page, categories: $categories) {
        id
    }
}
```

to:

```graphql
query getProducts($categories: [String!], $limit: Int, $page: Int) {
    products(limit: $limit, page: $page, categories: $categories) {
        totalCount
        currentPage
        totalPages
        items {
            id
            name
            description
            count
            price
            categories {
                name
            }
        }
    }
}
```

### Changed:

from:

```graphql
query getOrders($limit: Int, $page: Int) {
    orders(limit: $limit, page: $page) {
        id
        status
        billingInfo {
            fullName
            id
            bio
            country
            city
            street
            houseNumber
            postalCode
        }
        products {
            id
            productId
            count
            product {
                price
                imageUrl
                id
                description
            }
        }
    }
}
```

to:

```graphql
query getOrders($limit: Int, $page: Int) {
    orders(limit: $limit, page: $page) {
        totalCount
        currentPage
        totalPages
        items {
            id
            status
            billingInfo {
                fullName
                id
                bio
                country
                city
                street
                houseNumber
                postalCode
            }
            products {
                id
                productId
                count
                product {
                    price
                    imageUrl
                    id
                    description
                }
            }
        }
    }
}
```

----

## Changes: 28/07/2023

### Added:

```graphql
mutation createOrder(
    $products: [OrderProductInput!]!
    $billingInfo: OrderBillingInfoInput!
) {
    createOrder(billingInfo: $billingInfo, products: $products) {
        status
        ...
        products {
    id
    ...
}
}
}


```

```graphql
query getOrders($limit: Int, $page: Int) {
    orders(limit: $limit, page: $page) {
        id
        status
        billingInfo {
            fullName
            id
            bio
            country
            city
            street
            houseNumber
            postalCode
        }
        products {
            id
            productId
            count
            product {
                price
                imageUrl
                id
                description
            }
        }
    }
}
```

----

## Changes: 09/07/2023

### Added:

- Added base for development `Order` module,
- Added GQL model for `Order`

----

## Changes: 08/07/2023

### Changed:

from:

```graphql
query getProducts($categories: [String!], $limit: Int, $page: Int) {
    count(categories: $categories)
    products(limit: $limit, page: $page, categories: $categories) {
        id
    }
}
``` 

to:

```graphql
query getProducts($categories: [String!], $limit: Int, $page: Int) {
    countProducts(categories: $categories) // <-- CHANGED
    products(limit: $limit, page: $page, categories: $categories) {
        id
    }
}
```

----

## Changes: 07/07/2023

### Added:

```graphql
mutation registration($email: String!, $password: String!, $name: String!) {
    registration(email: $email, password: $password, name: $name) {
        access_token
        refresh_token
    }
}

```

```graphql
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        access_token
        refresh_token
    }
}
```

----

## Changes: 25/06/2023

### Added:

```graphql
mutation createProduct(
    $name: String!
    $description: String!
    $count: Int!
    $price: Float!
    $categories: [String!]
    $imageUrl: String!
) {
    createProduct(
        name: $name
        description: $description
        price: $price
        count: $count
        categories: $categories
        imageUrl: $imageUrl
    ) {
        name
        description
        id
        count
        imageUrl
        categories {
            name
        }
    }
}
```

```graphql
query getProducts($categories: [String!], $limit: Int, $page: Int) {
    count(categories: $categories)
    products(limit: $limit, page: $page, categories: $categories) {
        id
        name
        description
        count
        price
        categories {
            name
        }
    }
}

```

```graphql
query getCategories {
    categories {
        name
        id
    }
}
```
