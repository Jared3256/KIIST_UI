import errorHandler from "src/handlers/errorHandler";


export const admin_crud_request = {
  post: async ({ role,token, entity, jsonData , hotAxiosPrivate}) => {
    try {

      const response = await hotAxiosPrivate.post(
        `/${role}/${entity}/create`,
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {

      return errorHandler(error);
    }
  },
  get: async ({role, entity, adminId,entityId,  hotAxiosPrivate }) => {
    try {
      const response = await hotAxiosPrivate.get( `/${role}/${adminId}/${entity}/${entityId}/get`,);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  list: async ({role, entity, options, token, hotAxiosPrivate }) => {
    try {
      const response = await hotAxiosPrivate.get( `/${role}/${entity}/list`,);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  remove :async({role, entity,entityId ,hotAxiosPrivate})=>{
    try {
      const response =  await hotAxiosPrivate.delete( `/${role}/${entity}/${entityId}/remove`,);
      return response.data;
    }catch (error) {
      return errorHandler(error);
    }
  }
};
