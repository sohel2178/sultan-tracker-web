import Account from './account.model';
import Answer from './answer.model';
import Collection from './collection.model';
import Device from './device.model';
import Interaction from './interaction.model';
import Model from './model.model';
import Question from './question.model';
import Reference from './reference.model';
import TagQuestion from './tag-question.model';
import Tag from './tag.model';
import User from './user.model';
import Vote from './vote.model';
import Location from './location.model';

export {
  Account,
  Answer,
  Collection,
  Interaction,
  Question,
  TagQuestion,
  Tag,
  User,
  Vote,
  Model,
  Reference,
  Device,
  Location,
};

// db.locations.createIndexes([
//   { key: { id: 'hashed' }, name: 'id_hashed' },
//   {
//     key: { id: 1, 'date.year': -1, 'date.month': -1 },
//     name: 'id_1_date.year_-1_date.month_-1',
//     background: true,
//   },
// ]);

// db.locations.createIndex({ id: 'hashed' });

// db.locations.createIndex({ id: 1, 'date.year': -1, 'date.month': -1 });
