'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Photos', [
      {
        title: 'Large Home Tree',
        description: 'From the architect. Commissioned by the well-known art supporter and successful businessman George Bonin and developed by the New York based firm Ignatov Architects, the Home Tree concept is an attempt for defining contemporary, adaptable rural architecture. Its strategy is based on learning from existing trees on site recognizing their natural optimization for the given location and climate. The aim is to align architecture with nature and deliver site-conscious, clean, energy-independent and feasible buildings. In opposition to the Treehouse typology, which presents parasitic dwellings burdening existing trees, the Home Tree concept focuses on developing free-standing, tree-inspired architecture. Besides the usual residential program, each Home Tree house consists of three integral parts that parallel actual trees:',
        author: 'Archdaily',
        link: 'http://images.adsttc.com/media/images/5012/9674/28ba/0d67/1700/07a1/large_jpg/stringio.jpg',
        hashtags: '#LargeHomeTree#Archdaily#House',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      }, {
        title: 'Observation House /I/O architects',
        description: 'The house is located on a hill in the highest corner of a village amid an agricultural area in Northeast Bulgaria. The site of the project is distinguished both by its panoramic views and distant visibility. In order to strengthen them, a part of the program is located in the seemingly blind bastion-like volume and the living area is elevated high on it.',
        author: 'Archdaily',
        link: 'http://images.adsttc.com/media/images/562d/862f/e58e/ce22/ae00/021d/slideshow/19.jpg',
        hashtags: '#ObservationHouse#Bulgaria#Archdaily#House',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },{
        title: 'TOC House',
        description: 'From the architect. This unique vacation house is located near Tapalpa in a secluded forested area. The house adapts to its surrounding through two volumes that define the usage areas. The first volume is where all daytime activities happen: the entrance, dining room, kitchen, living room, and terrace. This volume is elevated, generating a dialog with the surrounding forest.',
        author: 'Archdaily',
        link: 'http://images.adsttc.com/media/images/5068/baef/28ba/0d2a/7800/00b1/large_jpg/stringio.jpg',
        hashtags: '#TOCHouse#Archdaily#House',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },{
        title: 'LA House',
        description: 'From the architect. LA House was born out of an especially fruitful relationship with the client. Thorough communication was established from the beginning we were granted complete trust to translate their needs into space.',
        author: 'Archdaily',
        link: 'http://images.adsttc.com/media/images/5439/c304/c07a/801f/e700/0093/large_jpg/PORTADA.jpg',
        hashtags: '#LA#House#Archdaily',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },{
        title: 'VR Tapalpa House',
        description: 'From the architect. Casa VR, located in a secluded area near the town of Tapalpa, is an exercise in clarity and functionality. The program is arranged on four quadrants, which are defined by the intersection of two main circulation axes. Within this system, spaces are distributed according to privacy requirements and affinity. The design of the house was driven by the desire to allow it to connect with the outdoors and to converse with its regional context using a contemporary vocabulary: the building affords ample views and is accessible through various entry points, while its stark geometry is expressed with local materials and rustic finishes that were executed with precision.',
        author: 'Archdaily',
        link: 'http://images.adsttc.com/media/images/52fc/4676/e8e4/4e54/8200/0069/large_jpg/PORTADA.jpg',
        hashtags: '#VR#Tapalpa#House#Archdaily',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      }
    ], {});
  },


  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Photos',
      {
        author: ['Archdaily']
      }, {});
  }
};
