module.exports = {
    async up(db, client) {
      return db.collection('schemes').updateMany({}, { $set: { duration: "5 Years" } })
    },
  
    async down(db, client) {
      return db.collection('schemes').updateMany({}, { $unset: { duration: 1 } })
    }
  };