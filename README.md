# As Yet Unnamed Social Media App

## Reflection

My initial plan for integrating an element from a component library was to make the "edit profile" form on the user-profile page collapsible so I wanted to use either accordion or collapsible from radix, but accordion looked especially complicated and collapsible would need to be a client component and I was unsure how that would work with a form that submits data to the database with a server action. I also considered using a radix form, but decided that would be pointless since it's functionally the same as a regular form. Instead I went for possibly the most boring option: a separator. I personally like when websites use these though, and it looks nicer than changing background colour for visually separating content so I guess it's not too boring.

## Sources

UNIQUE constraint in PostgreSQL - https://neon.tech/postgresql/postgresql-tutorial/postgresql-unique-constraint
Error when trying to add data from currentUser object to formData for server action (needed JSON.stringify) - https://stackoverflow.com/questions/77091418/warning-only-plain-objects-can-be-passed-to-client-components-from-server-compo
JSON viewer (used to debug my json object) - https://jsonviewer.stack.hu/
Postgresql add column with ALTER (to add user submitted alttext to posts) - https://www.w3schools.com/postgresql/postgresql_add_column.php

## Screenshots

![Console log displaying the structure of the currentUser object that I used to inform my database structure](@/../screenshots/currentUser_object.png)
