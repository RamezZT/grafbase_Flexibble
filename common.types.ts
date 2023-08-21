import { User, Session } from 'next-auth'

export type FormState = {
  title: string;
  desciption: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

export interface ProjectInterface {
  title: string;
  desciption: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
    id: string;
  };
}


export interface UsersInterface {
  userCollection: {
    edges: [
      {
        node: {
          name: string,
          avatarUrl: string,
          id: string
        }
      }
    ]
  }
}

export interface UserInterface {
  githubUrl: string;
  linkedInUrl: string;
  desciption: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  desciption: string | null;
  avatarUrl: string;
  githubUrl: string | null;
  linkedInUrl: string | null;
  projects: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    desciption: string | null;
    githubUrl: string | null;
    linkedInUrl: string | undefined;
    firstLog: boolean;
  };
}

export interface ProjectForm {
  title: string;
  desciption: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}

export type makeQueryType = Array<{ identifier: string, identifierValue: string, fieldToUpdate: string, value: string }>;
