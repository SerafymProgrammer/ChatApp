import { User} from '../models/users.model';
import { Users_Repository } from '../constants/constants';

export const usersProviders = [
  {
    provide: Users_Repository,
    useValue: User,
  },
];
