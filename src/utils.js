hasUsers => R.hasIn('users');
 getUser => (y, x) => R.find(x => x.name === y);

 
 addUser =>  R.ifElse(hasUsers,
          (usr, x) => { x.users.add(usr); return x;}, 
          (usr, y) => {y.users = [usr]; return y;});
//addUser( kata1)(user)


export { hasUsers, getUser, addUser };
