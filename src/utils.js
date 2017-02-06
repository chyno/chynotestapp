function getKata(name) { return R.find(x => x.name === name) };

let addUserArray = R.unless(R.propIs(Array, 'users'), R.assoc('users', []));

let addUser = R.curry((usr, kt) => { kt.users.push(usr); return kt; });

//R.compose(addUser(user),addUserArray, getKata('kata 2'))(katas)
export {getKata, addUserArray, addUser};