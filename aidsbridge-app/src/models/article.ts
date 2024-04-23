//model for article
export interface Article {
    _id?: string;
    title: string;
    content: string;
    creater: string;
    createdDate: Date;
    imageId: string;
    userId: string;
  }