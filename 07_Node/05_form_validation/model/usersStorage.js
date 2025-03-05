// model/usersStorage.js
// This class lets us simulate interacting with a database.
class UsersStorage {
    constructor() {
      this.storage = {};
      this.id = 0;
    }
  
    addUser({ firstName, lastName, email, age, bio }) {
      const id = this.id;
      this.storage[id] = { id, firstName, lastName, email, age, bio };
      this.id++;
    }
  
    getUsers() {
      return Object.values(this.storage);
    }
  
    getUser(id) {
      return this.storage[id];
    }
  
    updateUser(id, { firstName, lastName, email, age, bio }) {
      this.storage[id] = { id, firstName, lastName, email, age, bio };
    }

    findUser( name, email ) {
      if (!Object.values(this.storage).length) {
        return []
      } else {
        const query = Object.values(this.storage).filter(user => 
          user.firstName.toLowerCase()===name.toLowerCase() 
          || user.lastName.toLowerCase()===name.toLowerCase()
          || user.email.toLowerCase()===email.toLowerCase()
        )
        return query;
      }
    }
  
    deleteUser(id) {
      delete this.storage[id];
    }
  }
  // Rather than exporting the class, we can export an instance of the class by instantiating it.
  // This ensures only one instance of this class can exist, also known as the "singleton" pattern.
  module.exports = new UsersStorage();
  