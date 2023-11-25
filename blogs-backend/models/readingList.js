const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')
const Blog = require('./blog.js')
const User = require('./user.js')

class ReadingList extends Model {}

ReadingList.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize, 
    underscored: true,
    timestamps: false,
    tableName: 'reading_list',
    modelName: 'readingList',
});

module.exports = ReadingList;