Express Gallery
===============

Express, Sequelize, HTML5, stored on PostgreSQL

![](https://github.com/SpaceToastCoastToCoast/express-gallery/blob/dark-theme/screenshot.png)

---

Create a multi-user Gallery.
Any user should be able to access these routes:

- `GET /` to view a list of gallery photos
- `GET /gallery/:id` to see a single gallery photo
  - each gallery photo should include a link to delete this gallery photo
  - each gallery photo should include a link to edit this gallery photo
- `GET /gallery/new` to see a "new photo" form
  - the form fields are:
    - `author` : Text
    - `link` : Text (the image url)
    - `description` : TextArea
- `POST /gallery` to create a new gallery photo i
- `GET /gallery/:id/edit` to see a form to *edit* a gallery photo identified by the `:id` param
  - the form fields are:
    - `author` : Text
    - `link` : Text (the image url)
    - `description` : TextArea
- `PUT /gallery/:id` updates a single gallery photo identified by the `:id` param
- `DELETE /gallery/:id` to delete a single gallery photo identified by the `:id` param

---

#### Responsive Layout

- does not have tablet layout
- uses a background image

---

#### Setting up the project

- Create a database for the project in postgres. (`express_gallery`)
- Run `npm start`
- Run `sequelize db:seed:all`
- Run `gulp`
- (Linux) gulp may not automatically run redis-server, in that case start it up manually before the next step
- gulp should bring up a Chrome window at http://localhost:7000