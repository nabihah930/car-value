import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';                                               //Repositories are like interfaces to our DB
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

// Services actually implement the business logic/real-app logic
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}          //User repository is automatically created by Typeorm for us
    // When using a generic type such as 'User' dependency injection needs a little help
    // which is why we add the 'InjectRepository' decorator 

    create(email: string, password: string) {
        // Creates instance of our User entity -> does NOT save/persist any data inside of our DB
        // Any validation enclosed in the user entity is done here, when you create an instance of the user entity
        const user = this.repo.create({ email, password });

        // Actually takes an entity & saves it inside of our DB
        // We can call this method with any object that has the properties a user object has e.g. should contain email and password
        // Because of this we can just as well use:
        // return this.repo.save({ email, password });
        // Why create() at all? Because if you want to run any validation tied to our entity then you should definitly create an instance
        return this.repo.save(user);

        // Also when saving an entity as opposed to a simple object all hooks associated with that entity are executed
        // Mixing saving entities with simple objects can lead to some tricky hard to trace bugs
        // Ideally should decide up front if we want to use hooks in our project or not -> for hooks: always create an instance then insert
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id });             //Returns single record
    }

    find(email: string) {
        return this.repo.find({ where: {email} });      //Returns array of records if no records then []
    }

    // Partial is a type helper defined by TypeScript itself
    // Partial accepts any object that has at least one (or none i.e. empty obj.) of the properties of the user
    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if(!user) {
            throw new Error('User not found');
        }
        Object.assign(user, attrs);

        // save() uses entities whereas insert() and update() use simple objects
        return this.repo.save(user);                    //Also updates if it finds an existing record
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if(!user) {
            throw new Error('User not found');
        }
        
        // remove() uses entitites whereas delete() works with simple objects
        return this.repo.remove(user);
    }
}

