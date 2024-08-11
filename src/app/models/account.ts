export interface Account {
    id: number,
    title: string,
    userName: string,
    accountPassword: string,
    accountNumber?:string,
    email: string,
    emailAsUser: boolean, // checkbox use as user
    securityQuestions: Question[],
    categories: Category[],
    url: string,
    recoveryCode?: string,
    description?: string,
    notes?: string,
    createDate: Date | null,
    lastUpdate?: Date
  }

  export interface Category {
    categoryId: number,
    description: string,
  }
  
  export interface Question {
    questionId: number,
    order: number | null,
    name: string,
    answer: string,
  }

  
  export const phoneTypeValues = [
    { title: 'Mobile', value: 'mobile' },
    { title: 'Work', value: 'work' },
    { title: 'Other', value: 'other' },
  ];
  
  export const addressTypeValues = [
    { title: 'Home', value: 'home' },
    { title: 'Work', value: 'work' },
    { title: 'Other', value: 'other' },
  ];

  /**
   * 
   * Name,
User, 
Password,
Email, -checkbox use as user

Url,
Description,
Recovery Code,

Questions: OneToMany
	id, question, answer


History paswords
   */