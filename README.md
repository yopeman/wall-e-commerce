# user
- first name
- last name
- email
- password
- role: admin, customer
- phone number

# category
- name
- description

# product
- name
- description
- price
- category id
- stock quantity

# product images
- product id
- image url
- is primary

# order
- total price
- user id

# order items
- order id
- product id
- quantity
- subtotal price

# payment
- method
- status: pending, completed, cancelled
- receipt url
- order id
- transaction id

# common for all tables/models
- id: UUID
- is deleted
- deleted at
- created at
- updated at
- cascade reference



---

give me sequilize model for the following database schema in functional model with proper relationships.:

---
# user
- first name
- last name
- email
- password
- role: admin, customer
- phone number

# category
- name
- description

# product
- name
- description
- price
- category id
- stock quantity

# product images
- product id
- image url
- is primary

# order
- total price
- user id

# order items
- order id
- product id
- quantity
- subtotal price

# payment
- method
- status: pending, completed, cancelled
- receipt url
- order id
- transaction id

# common for all tables/models
- id: UUID
- is deleted
- deleted at
- created at
- updated at
- cascade reference

---

it import sequilize from '../config/database.js' and DataTypes from 'Sequilze'. and all common field(like id) write explicitly in all models