import { Message} from '../models/message.model';
import { Chat_Repository } from '../constants/constants';

export const chatProviders = [
  {
    provide: Chat_Repository,
    useValue: Message,
  },
];
