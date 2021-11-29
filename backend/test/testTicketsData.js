const testUsers = [
  {
    id: 1,
    name: 'Test User 1',
  },
  {
    id: 2,
    name: 'Test User 2',
  },
];

const sampleTicketResponseCurrPage = {
  tickets: [
    {
      id: 3,
      subject: 'test subject 3',
      description: 'test description 3',
      requester_id: 1,
      created_at: '123',
      status: 'open',
    },
    {
      id: 4,
      subject: 'test subject 4',
      description: 'test description 4',
      requester_id: 1,
      created_at: '234',
      status: 'open',
    },
  ],
  users: testUsers,
  meta: {
    before_cursor: 'before_cursor',
    after_cursor: 'after_cursor',
    has_more: 'has_more',
  },
};

const sampleTicketResponseCurrPageMapped = {
  tickets: [
    {
      id: 3,
      subject: 'test subject 3',
      description: 'test description 3',
      requester: 'Test User 1',
      assignee: '',
      createdAt: '123',
      status: 'open',
    },
    {
      id: 4,
      subject: 'test subject 4',
      description: 'test description 4',
      requester: 'Test User 1',
      assignee: '',
      createdAt: '234',
      status: 'open',
    },
  ],
  meta: {
    before_cursor: 'before_cursor',
    after_cursor: 'after_cursor',
    has_more: 'has_more',
  },
};

const sampleTicketResponsePrevPage = {
  tickets: [
    {
      id: 1,
      subject: 'test subject',
      description: 'test description',
      requester_id: 1,
      created_at: '123',
      status: 'open',
    },
    {
      id: 2,
      subject: 'test subject 2',
      description: 'test description 2',
      requester_id: 1,
      created_at: '123',
      status: 'open',
    },
  ],
  users: testUsers,
  meta: {
    before_cursor: 'before_cursor',
    after_cursor: 'after_cursor',
    has_more: 'has_more',
  },
};

const sampleTicketResponsePrevPageMapped = {
  tickets: [
    {
      id: 1,
      subject: 'test subject',
      description: 'test description',
      requester: 'Test User 1',
      assignee: '',
      createdAt: '123',
      status: 'open',
    },
    {
      id: 2,
      subject: 'test subject 2',
      description: 'test description 2',
      requester: 'Test User 1',
      assignee: '',
      createdAt: '123',
      status: 'open',
    },
  ],
  meta: {
    before_cursor: 'before_cursor',
    after_cursor: 'after_cursor',
    has_more: 'has_more',
  },
};

const sampleTicketResponseNextPage = {
  tickets: [
    {
      id: 5,
      subject: 'test subject 5',
      description: 'test description 5',
      requester_id: 1,
      created_at: '123',
      status: 'open',
    },
    {
      id: 6,
      subject: 'test subject 6',
      description: 'test description 6',
      requester_id: 1,
      created_at: '123',
      status: 'open',
    },
  ],
  users: testUsers,
  meta: {
    before_cursor: 'before_cursor',
    after_cursor: 'after_cursor',
    has_more: 'has_more',
  },
};

const sampleTicketResponseNextPageMapped = {
  tickets: [
    {
      id: 5,
      subject: 'test subject 5',
      description: 'test description 5',
      requester: 'Test User 1',
      assignee: '',
      createdAt: '123',
      status: 'open',
    },
    {
      id: 6,
      subject: 'test subject 6',
      description: 'test description 6',
      requester: 'Test User 1',
      assignee: '',
      createdAt: '123',
      status: 'open',
    },
  ],
  meta: {
    before_cursor: 'before_cursor',
    after_cursor: 'after_cursor',
    has_more: 'has_more',
  },
};

const testError = JSON.stringify({ error: 'test error' });

module.exports = {
  testUsers,
  sampleTicketResponseCurrPage,
  sampleTicketResponseCurrPageMapped,
  sampleTicketResponsePrevPage,
  sampleTicketResponsePrevPageMapped,
  sampleTicketResponseNextPage,
  sampleTicketResponseNextPageMapped,
  testError,
};
