module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define("Photo", {
    title: {
      type: DataTypes.STRING,
      validate: {
        validateTitle: (value) => {
          if(/[{}<>;]/g.test(value)) {
            throw new TypeError("invalid characters in title");
          }
        },
        len: [2, 255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        validateDescription: (value) => {
          if(/[{}<>;]/g.test(value)) {
            throw new TypeError("invalid characters in description");
          }
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
        len: [2, 255]
      }
    },
    link: {
      type: DataTypes.TEXT,
      unique: true,
      validate: {
        isUrl: true
      }
    },
    hashtags: {
      type: DataTypes.STRING,
      validate: {
        validateHashtag: (value) => {
          if(/[<>?":{}|!@$%^&*()_\-+,./\];\\=]/g.test(value)) {
            throw new TypeError("Invalid characters in hashtags");
          }
        },
        len: [2, 255]
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Photo.belongsTo(models.User);
      }
    }
  });

  return Photo;
};