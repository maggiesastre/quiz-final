export interface question {
  question: string;
  options: string[];
  answer: string;
}

export interface quiz {
  name: string;
  type: string;
  questions: question[];
}

export interface user {
  email: string;
  username: string;
  password: string;
}

export interface answers {
  answers: string[];
  type: string;
}
