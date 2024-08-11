import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Account } from '../models/account';

export class InMemoryAccountsApi implements InMemoryDbService {
  createDb() {
    let accounts: Account[] = [
      {
        id: 1, 
        title: 'Gmail John', userName: "john.doe", email: 'johnd@gmail.com',
        accountPassword: 'test',
        emailAsUser: false,
        url: "https://mail.google.com",
        securityQuestions: [],
        categories: [],
        description: "",
        recoveryCode: '',
        notes: '',
        createDate: new Date('1994/05/05'),
        lastUpdate: new Date(),
      },
      {
        id: 2, 
        title: 'Gmail', userName: "johnd4", email: 'jonnyd800@gmail.com',
        accountPassword: 'test',
        emailAsUser: false,
        url: "https://mail.google.com",
        securityQuestions: [],
        categories: [],
        description: "",
        recoveryCode: '',
        notes: '',
        createDate: new Date('1994/05/05'),
        lastUpdate: new Date(),
      },
      {
        id: 3, 
        title: 'Sunpass', userName: "john.doe", email: 'johnd@gmail.com',
        accountPassword: 'test',
        url: "https://www.sunpass.com/en/home/index.shtml",
        accountNumber: "0125463444",
        emailAsUser: false,
        securityQuestions: [],
        categories: [],
        description: "",
        recoveryCode: '',
        notes: '',
        createDate: new Date('1994/05/05'),
        lastUpdate: new Date(),
      },
      {
        id: 4, 
        title: 'Github', userName: "johndoe", email: 'johnd@gmail.com',
        accountPassword: 'test',
        url: "https://github.com/",
        emailAsUser: false,
        securityQuestions: [],
        categories: [],
        description: "",
        recoveryCode: '',
        notes: '',
        createDate: new Date('1994/05/05'),
        lastUpdate: new Date(),
      },
      {
        id: 5, 
        title: 'Gmail', userName: "johndoe", email: 'johnd@gmail.com',
        accountPassword: 'test',
        url: "https://github.com/",
        emailAsUser: false,
        securityQuestions: [],
        categories: [],
        description: "",
        recoveryCode: '',
        notes: '',
        createDate: new Date('1994/05/05'),
        lastUpdate: new Date(),
      }
    ]

    return { accounts }
  }
}