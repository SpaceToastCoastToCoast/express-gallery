const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authentication');
const validate = require('../middleware/validation');
const session = require('express-session');
const db = require('../models');
const Photo = db.Photo;
const User = db.User;

let isLoggedIn = (req) => {
  if(req.user !== undefined && req.user !== false) {
    return true;
  }
  return false;
};

let renderById = (req, res, id) => {
  Photo.findById(id)
  .then((photo) => {
    User.findAll({
      attributes: ['username'],
      limit: 1,
      where: {
        id: {
          $eq: photo.UserId
        }
      }
    }).then((poster) => {
      let [postedBy] = poster;
      Photo.findAll({
        limit: 3,
          where: {
            id: {
              $ne:id
            }
          }
        })
      .then((related) => {
        res.render('photo', {
          user: req.user || {auth: false, id: null},
          id: photo.id,
          title:photo.title,
          link: photo.link,
          description: photo.description,
          author: photo.author,
          hashtags: photo.hashtags,
          uid: photo.UserId,
          poster: postedBy.dataValues.username,
          //needs to be edited
          relatedPhotos: related
        });
      })
      .catch((error) => {
        res.status(404).render('404');
      });
    });
  })
  .catch((error) => {
    res.status(404).render('404');
  });
};


router.route('/')
  .get((req, res) => {
    //to view list of gallery photos
    if(req.user === undefined) {
      username = 'Not logged in';
    } else {
      username = req.user.username;
    }
    Photo.findAll({
      order: [['id', 'DESC']]
    })
    .then((photos) => {
      res.render('gallery', {
        featured: photos.shift(),
        gallery: photos,
        isLoggedIn: isLoggedIn(req),
        username: username
      });
    });
  })
  .post(validate.validate, authenticate.isAuthenticated, (req, res) => {
    //to create a new gallery photo
    Photo.create({ title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      link: req.body.link,
      hashtags: req.body.hashtags,
      UserId: req.user.id })
    .then((photos) => {
      renderById(req, res, photos.id);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
  });

router.route('/new')
  .get(authenticate.isAuthenticated, (req, res) => {
    //to view new photo form
    //we will pass res.render an object with the user's info later
    res.render('new', {
      title: 'Untitled',
      author: 'Your name here',
      link: 'URL Link to Photo',
      description: 'Your text here',
      hashtags: 'Your tags here'
    });
  });

router.route('/:id')
  .get((req, res) => {
    //to view single of gallery photo
    let id = parseInt(req.params.id);
    renderById(req, res, id);
  })
  .post(validate.validate, authenticate.isAuthenticated, (req, res) => {
    //to update selected photo in gallery
    if(req.body._method === 'PUT'){
      let id = parseInt(req.params.id);
      Photo.findById(id)
      .then((photo) => {
        if(req.user.id == photo.UserId || req.user.id == 1) {
          photo.update({
            id: id,
            title: req.body.title || photo.title,
            description: req.body.description || photo.description,
            author: req.body.author || photo.author,
            link: req.body.link || photo.link,
            hashtags: req.body.hashtags || photo.hashtags
          })
          .then((photo) => {
          //add a WHERE clause here for hashtags
            renderById(req, res, id);
          });
        } else {
          res.sendStatus(403);
        }
      })
      .catch((error) => {
        res.status(404).render('404');
      });
    } else {
      res.sendStatus(405);
    }
  })
  .put(validate.validate, authenticate.isAuthenticated, (req, res) => {
    //to update selected photo in gallery
    let id = parseInt(req.params.id);
    Photo.findById(id)
    .then((photo) => {
      if(req.user.id == photo.UserId || req.user.id == 1) {
        photo.update({
          title: req.body.title || photo.title,
          description: req.body.description || photo.description,
          author: req.body.author || photo.author,
          link: req.body.link || photo.link,
          hashtags: req.body.hashtags || photo.hashtags
        })
        .then((photo) => {
          res.status(200)
          .json({
            success: true
          });
        });
      } else {
        res.sendStatus(403);
      }
    });
  })
  .delete(authenticate.isAuthenticated, (req, res) => {
    //to delete selected photo in gallery
    let id = parseInt(req.params.id);
    Photo.findById(id)
    .then((photo) => {
      if(req.user.id == photo.UserId || req.user.id == 1) {
        photo.destroy();
        res.status(200)
        .json({
          success: true
        });
      } else {
        res.sendStatus(403);
      }
    })
    .catch((error) => {
      res.status(404).render('404');
    });
  });

router.route('/:id/edit')
  .get(authenticate.isAuthenticated, (req, res) => {
    //to edit selected photo in gallery
    let id = parseInt(req.params.id);
    Photo.findById(id)
    .then((photo) => {
      res.render('edit', {
        id: id,
        title: photo.title,
        link: photo.link,
        description: photo.description,
        author: photo.author,
        hashtags: photo.hashtags
      });
    })
    .catch((error) => {
      res.status(404).render('404');
    });
  });

  router.route('/:id/delete')
  .get(authenticate.isAuthenticated, (req, res) => {
    //to edit selected photo in gallery
    let id = parseInt(req.params.id);
    Photo.findById(id)
    .then((photo) => {
      if(req.user.id == photo.UserId || req.user.id == 1) {
        photo.destroy();
        res.redirect('/');
      } else {
        res.sendStatus(403);
      }
    })
    .catch((error) => {
      res.status(404).render('404');
    });
  });

router.route('/:page')
.get((req, res) => {
  res.status(404).render('404');
});

module.exports = router;