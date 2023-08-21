import { ProjectForm } from "@/common.types";
import { getAllProjectsBackwardQuery, getBackwardProjectsQuery, createUserMutation, getUserQuery, createProjectMutation, projectsQuery, projectsQuery1, getProjectByIdQuery, getProjectsOfUserQuery, deleteProjectMutation, updateProjectMutation, getAllProjectsQuery, getAllUsersQuery, updateUserQuery } from "@/graphql";
import { makeQuery } from "@/graphql";
import { makeQueryType } from "@/common.types";
import { GraphQLClient, gql } from "graphql-request";
import { UserInterface } from "@/common.types";
const isProduction = process.env.NODE_ENV === 'production';
// const isProduction = true;
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : " http://127.0.0.1:4000/graphql";
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : "letmein";
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : "http://localhost:3000";
// this is a connection to our database

export const client = new GraphQLClient(apiUrl);

export const makeGraphQLRequest = async (query: string, variables = {}) => {

    try {
        return await client.request(query, variables);
    } catch (error) {
        throw error;
    }
}


export const getUser = (email: string) => {

    console.log(client.setHeader('x-api-key', apiKey));

    return makeGraphQLRequest(getUserQuery, { email });
}

export const getAllUsers = async () => {

    try {
        return await makeGraphQLRequest(getAllUsersQuery);
    } catch (error) {

    }
}


export const craeteUser = (name: string, email: string, avatarUrl: string) => {
    client.setHeader('x-api-key', apiKey);

    const variables = {
        input:
        {
            name, email, avatarUrl, desciption: ""
        }
    }

    return makeGraphQLRequest(createUserMutation, variables);
}


export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`);
        const token = await response.json();
        return token;
    } catch (error) {
        throw error;
    }
}

export const uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: 'POST',
            body: JSON.stringify({ path: imagePath })
        })
        return response.json();
    } catch (error) {
        throw error;
    }
}

export const craeteNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
    const imageUrl = await uploadImage(form.image)
    if (imageUrl.url) {

        client.setHeader("Authorization", `Bearer ${token}`);

        const variables = {
            input: {
                ...form,
                image: imageUrl.url,
                createdBy: {
                    link: creatorId
                }
            }
        }
        return makeGraphQLRequest(createProjectMutation, variables);
    }
}

export const fetchAllProjects = async (category?: string | null, endcursor?: string | null, back?: string, startcursor?: string | null) => {
    try {
        client.setHeader('x-api-key', apiKey);
        if (back === "true")
            if (category === "ALL")
                return makeGraphQLRequest(getAllProjectsBackwardQuery, { startcursor });
            else return makeGraphQLRequest(getBackwardProjectsQuery, { category, startcursor });
        else if (category === "ALL") {
            return makeGraphQLRequest(getAllProjectsQuery, { endcursor });
        } else {
            return makeGraphQLRequest(projectsQuery, { category, endcursor })
        }
    } catch (error) {
        console.log(error);
    }
}

export const getProjectDetails = async (id: string) => {
    client.setHeader('x-api-key', apiKey);

    return makeGraphQLRequest(getProjectByIdQuery, { id });
}
export const getUserProjects = async (id: string, last?: number) => {
    client.setHeader('x-api-key', apiKey);

    return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
}
export const deleteProject = async (id: string, token: string) => {
    client.setHeader("Authorization", `Bearer ${token}`);
    return makeGraphQLRequest(deleteProjectMutation, { id });
}
export const updateProject = async (form: ProjectForm, projectId: string, token: string) => {

    function isBase64DataURL(value: string) {
        const base64Regex = /^data:image\/[a-z]+;base64,/;
        return base64Regex.test(value);
    }

    let updateForm = { ...form }
    const isUploadingNewImage = isBase64DataURL(form.image);

    if (isUploadingNewImage) {
        const imageUrl = await uploadImage(form.image);

        if (imageUrl.url) {
            updateForm = { ...form, image: imageUrl.url };
        }
    }

    const variables = {
        id: projectId,
        input: updateForm
    }
    client.setHeader("Authorization", `Bearer ${token}`)
    return makeGraphQLRequest(updateProjectMutation, variables);
}

export const updateUser = async (userData: UserInterface, token: string, id: string) => {

    const variables = {
        id,
        input: {
            ...userData,
            firstLog: false
        }
    }
    client.setHeader("Authorization", `Bearer ${token}`)
    return makeGraphQLRequest(updateUserQuery, variables);
}


// i am going to create a function that request everysingle update along and see how it will work

export const updateSchema = async (value: makeQueryType, token: string) => {

    try {
        client.setHeader("Authorization", `Bearer ${token}`);
        const query = makeQuery(value);
        await makeGraphQLRequest(query);
    } catch (error) {

    }
}



// i will clean it later but here is how u can call the update schema
/**

this code 
// Array<{ identifier: string, identifierValue: string, fieldToUpdate: string, value: string }>
  const updateArray: makeQueryType = users.map((node) => {
    const obj = {
      identifier: "id",
      identifierValue: node.node.id,
      fieldToUpdate: "firstLog",
      value: "true",
    };
    return obj;
  });
  console.log(updateArray);
  try {
    const token = await fetchToken();
    updateSchema(updateArray, token);
  } catch (error) {
    console.log(error);
  }

 * 
 */
