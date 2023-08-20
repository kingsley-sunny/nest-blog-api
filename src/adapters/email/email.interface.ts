export interface EmailManagement<T = any> {
  templatePath: string;

  sendMail?: (
    to: string,
    subject: string,
    message: string,
    config?: T,
  ) => Promise<boolean>;
  checkEmailIsInSpam?: (emailToken: string) => Promise<boolean>;
  createSubscriber?: (data: EmailSubscriber) => Promise<string>;
  updateSubscriber?: (data: EmailSubscriber) => Promise<boolean>;
  createSubscribeList?: (title: string) => Promise<boolean>;
  addSubscriberToList?: (
    subscriberId: string[],
    listKey: string,
  ) => Promise<boolean>;
  notify?: <BuildMessage>(data: BuildMessage) => Promise<boolean>;
}

export interface EmailSubscriber {
  subscriberId?: string;
  recordId?: string;
  user_uuid: string;
  user_id: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar?: string;
}
