import { Injectable, Inject } from '@nestjs/common';
import { User} from '../models/users.model';

// @EntityRepository(Book)

@Injectable()
export class UsersRepository {
    constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User) {
    }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.findAll<User>();
    }

    // tslint:disable-next-line:variable-name
    async getUser(_id: number): Promise<User> {
        try{
        return await this.usersRepository.findOne({
            where: { id: _id },
        });
        } catch (e) {
            console.log(e)
        }
    }

    // tslint:disable-next-line:variable-name
    async getUserByNickName(nickName: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { nickName },
        });
        return user;
    }

    async getUsersByOnlineStatus(status: any): Promise<User[]> {

        const users = await this.usersRepository.findAll({
            where: {onlineStatus: status},
        });
        return users;
    }
    
    async createUser(user: User) {
        return await this.usersRepository.create(user);
    }
    // tslint:disable-next-line:variable-name
    async updateUser(_id: number, fieldsUpdated) {
        //console.log(user)
        try{
        return await this.usersRepository.update(fieldsUpdated, {returning: true, where: {id: _id}} );
        } catch(e) {
            console.log(e)
        }
    }
    // tslint:disable-next-line:variable-name
    async deleteUser(_id: number) {
        return await  this.usersRepository.destroy({where: {id: _id}});
    }
}
