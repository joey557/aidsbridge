export interface EventPerson {
    peopleName: string;
    accountId: string;
  }
  
  export interface Event {
    _id: string;
    title: string;
    content: string;
    creator: string;
    people: EventPerson[];
    createdDate: Date;
    eventsDate: Date;
    image: string | null;
  }