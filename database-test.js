const sqlite = require('sqlite');

async function setup() {
  const db = await sqlite.open('./mydb.sqlite');
  //migrate db, force it to migrate the latest version
  await db.migrate({ force: 'last' });
  const people = await db.all('SELECT * FROM person');
  console.log('ALL PEOPLE ', JSON.stringify(people, null, 2));
}

setup();
