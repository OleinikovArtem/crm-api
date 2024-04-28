### Example:

----
## Changes: DD/MM/YY

### Added:
```graphql
query Example {
    example {
        id
    }
}
```

### Changed:
from:
```graphql
query Example {
    example {
        id
    }
}
```

to:
```graphql
query Example {
    exampleChange {  // <-- CHANGED
        id
    }
}
```
