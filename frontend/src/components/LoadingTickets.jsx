import React from 'react';
import CustomPlaceholder from './CustomPlaceholder';

const loadingTickets = [
  {
    id: 1,
    subject: <CustomPlaceholder height={1} width={4} />,
    description: <CustomPlaceholder height={3} width={12} />,
  },
];

export default loadingTickets;
