const db = require("../db/queries");

async function getUsernames(req, res) {
    if (req.query.search) {
        const userQuery = req.query.search;
        const usernames = await db.findUser(userQuery);
        console.log("Usernames: ", usernames);
        res.send("Usernames: " + usernames.map(user => user.username).join(", "));
    } else {
        const usernames = await db.getAllUsernames();
        console.log("Usernames: ", usernames);
        res.send("Usernames: " + usernames.map(user => user.username).join(", "));
    }
}

async function createUsernameGet(req, res) {
    // render the form
    res.send(
        `
        <form action="/create" method="POST">
            <label for="username"></label>
            <input type="text" id="username" name="username" placeholder="Enter Username" />
        </form>
    `
    )
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

async function deleteUsernames(req, res) {
    await db.deleteAll();
    res.redirect("/");
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost,
  deleteUsernames
};
