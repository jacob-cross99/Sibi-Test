const model = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    gender: {
      type: DataTypes.ENUM('male', 'female')
    },
    nameSet: {
      type: DataTypes.TEXT
    },
    title: {
      type: DataTypes.TEXT
    },
    givenName: {
      type: DataTypes.TEXT
    },
    middleInitial: {
      type: DataTypes.STRING(1)
    },
    surname: {
      type: DataTypes.TEXT
    },
    streetAddress: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.TEXT
    },
    state: {
      type: DataTypes.STRING(2)
    },
    stateFull: {
      type: DataTypes.TEXT
    },
    zipCode: {
      type: DataTypes.TEXT
    },
    country: {
      type: DataTypes.STRING(2)
    },
    countyFull: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.TEXT
    },
    username: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    browserUserAgent: {
      type: DataTypes.TEXT
    },
    telephoneNumber: {
      type: DataTypes.TEXT
    },
    telephoneCountryCode: {
      type: DataTypes.TEXT
    },
    mothersMaiden: {
      type: DataTypes.TEXT
    },
    birthday: {
      type: DataTypes.DATEONLY
    },
    age: {
      type: DataTypes.INTEGER
    },
    ccType: {
      type: DataTypes.TEXT
    },
    ccNumber: {
      type: DataTypes.TEXT
    },
    cvv2: {
      type: DataTypes.TEXT
    },
    ccExpiry: {
      type: DataTypes.TEXT
    },
    nationalID: {
      type: DataTypes.TEXT
    },
    ups: {
      type: DataTypes.TEXT
    },
    westernUnionMTCN: {
      type: DataTypes.TEXT
    },
    moneyGramMTCN: {
      type: DataTypes.TEXT
    },
    color: {
      type: DataTypes.TEXT
    },
    company: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    occupation: {
      type: DataTypes.TEXT
    },
    vehicle: {
      type: DataTypes.TEXT
    },
    domain: {
      type: DataTypes.TEXT
    },
    guid: {
      type: DataTypes.TEXT
    },
    latitude: {
      type: DataTypes.REAL
    },
    longitude: {
      type: DataTypes.REAL
    }
  });

  User.associate = models => {};

  return User;
};

export default model;