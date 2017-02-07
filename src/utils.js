function getKata(name) { return R.find(x => x.name === name) };

const addUserArray = R.unless(R.propIs(Array, 'users'), R.assoc('users', []));


const addUser =  R.curry((usr,kt) => {

   let wusr =   kt.users.find((x) =>  x.userName === usr.userName  );
   if (wusr)
      {
        wusr.code = usr.code;
        wusr.tests = usr.tests;
     }
   else {
     kt.users.push(usr)
   }


   return kt;
});

const log = R.curry((prefix, data) => console.log(prefix, data));

//R.compose(addUser(user),addUserArray, getKata('kata 2'))(katas)
export {getKata, addUserArray, addUser, log};