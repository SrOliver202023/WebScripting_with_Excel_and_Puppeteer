import { Browser, Page } from 'puppeteer';

interface IZapBot {
  page: Promise<Page | undefined> | undefined;
  browser: Promise<Browser | undefined>;
  showContacts(): Promise<void>;

  findContact(contact: string): Promise<void>;

  openChat(contactName: string): Promise<void>;

  sendMessage(message: string): Promise<void>;

  checkFoundContact(contactName: string): Promise<void>;
}

export { IZapBot };