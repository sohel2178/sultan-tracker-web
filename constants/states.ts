import ROUTES from './route';

export const DEFAULT_EMPTY = {
  title: 'No Data Found',
  message:
    'Looks like the database is taking a nap. Wake it up with some new entries.',
  button: {
    text: 'Add Data',
    href: ROUTES.HOME,
  },
};

export const DEFAULT_CLIENT_DEVICE = {
  title: 'No Vehicle Found',
  message:
    'Looks like no vehicle is assign yet. Please contact customer service to assign a vehicle to your acount',
};

export const DEFAULT_ERROR = {
  title: 'Something Went Wrong',
  message: 'Even our code can have a bad day. Give it another shot.',
  button: {
    text: 'Retry Request',
    href: ROUTES.HOME,
  },
};

export const EMPTY_QUESTION = {
  title: 'Ahh, No Questions Yet!',
  message:
    'The question board is empty. Maybe it’s waiting for your brilliant question to get things rolling',
  button: {
    text: 'Ask a Question',
    href: ROUTES.ASK_QUESTION,
  },
};

export const EMPTY_TAGS = {
  title: 'No Tags Found',
  message: 'The tag cloud is empty. Add some keywords to make it rain.',
  button: {
    text: 'Create Tag',
    href: ROUTES.TAGS,
  },
};

export const EMPTY_COLLECTIONS = {
  title: 'Collections Are Empty',
  message:
    'Looks like you haven’t created any collections yet. Start curating something extraordinary today',
  button: {
    text: 'Save to Collection',
    href: ROUTES.COLLECTION,
  },
};

export const EMPTY_MODELS = {
  title: 'Ahh, No Model found Yet!',
  message: 'The model list is empty. Start Creating Some Model Now',
  button: {
    text: 'Create Model',
    href: ROUTES.ADD_MODEL,
  },
};

export const EMPTY_REFERENCES = {
  title: 'Ahh, No Reference found Yet!',
  message: 'The reference list is empty. Start Creating Some Reference Now',
  button: {
    text: 'Create Reference',
    href: ROUTES.ADD_REFERENCE,
  },
};

export const EMPTY_DEVICES = {
  title: 'Ahh, No Devices found Yet!',
  message: 'The device list is empty. Start Creating Some device Now',
  button: {
    text: 'Create Device',
    href: ROUTES.ADD_DEVICE,
  },
};
