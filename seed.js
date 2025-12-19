const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Project = require('./models/Project');
const Client = require('./models/Client');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/flipr';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(async ()=>{
  console.log('Connected to DB for seeding');
  await Project.deleteMany();
  await Client.deleteMany();

  await Project.create([
    { name: 'Project Alpha', description: 'An awesome project', image: '' },
    { name: 'Project Beta', description: 'Another cool project', image: '' }
  ]);

  await Client.create([
    { name: 'Alice', designation: 'CEO', description: 'Loves Flipr', image: '' },
    { name: 'Bob', designation: 'Designer', description: 'Skilled designer', image: '' }
  ]);

  console.log('Seeding done');
  process.exit(0);
}).catch(err=>{ console.error(err); process.exit(1); });
