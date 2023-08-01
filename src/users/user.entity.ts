import { AfterInsert, AfterUpdate, AfterRemove, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

// These decorators are used to define the structure of our DB - remember the synchronize attribute in our app.module.ts
@Entity()   //Tells typeorm to reach out to DB at startup and make sure there is a table inside of it that models this class
export class User {
    //PK is auto-generated
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    email: string;
    
    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log(`Inserted user with ID: ${this.id}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Updated user with ID: ${this.id}`);
    }

    @AfterRemove()
    logRemoval() {
        console.log(`Removed user with ID: ${this.id}`);
    }
}

// Typeorm, using these decorators, updates the structure of our DB automatically at startup =>  no need for migrations
// This is all possible because of the synchorize flag we set to true in app.module.ts
// If you change an entity Typeorm will see this change and at the next satrtup it will update DB accordingly
// Note: This is not normal behaviour most SQLorms do not do this, you will have to manually write out migrations in that case (to change a DB's structure)
// IMPORTANT: Never use this synchronize flag in the production environment => since it makes it is very easy to change the structure of the DB
// we don't want to say accidentally delete a table/column in production