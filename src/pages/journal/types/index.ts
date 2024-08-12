export type JournalRequestType = JournalQueryType & JournalBodyType;

export type JournalQueryType = {
  skip: number;
  take: number;
};

export type JournalBodyType = {
  filter: {
    from?: Date;
    to?: Date;
    search?: string;
  };
};

export type JournalType = {
  id: number;
  eventId: number;
  createdAt: string;
};

export type JournalResponseType = {
  skip: number;
  count: number;
  items: JournalType[];
};
