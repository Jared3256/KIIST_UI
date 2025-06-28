import errorHandler from "src/handlers/errorHandler";


export const admin_crud_request = {
    student_pay: async ({data, hotAxiosPrivate}) => {
        try {
            const response = await hotAxiosPrivate.post("/payment/jenga/stkpush", data)
            return response.data

        } catch (error) {
            return errorHandler(error);
        }
    },
    put_spc: async ({data, url, hotAxiosPrivate}) => {
        try {
            const response = await hotAxiosPrivate.put(url, data)

            return response.data
        } catch (error) {

            return errorHandler(error);
        }
    },
    post: async ({role, token, entity, jsonData, hotAxiosPrivate}) => {
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
    post_spc: async ({data, url, hotAxiosPrivate}) => {
        try {
            const response = await hotAxiosPrivate.post(url, data)
            return response.data
        } catch (error) {
            return errorHandler(error);
        }
    },
    get: async ({role, entity, adminId, entityId, hotAxiosPrivate}) => {
        try {
            const response = await hotAxiosPrivate.get(`/${role}/${adminId}/${entity}/${entityId}/get`,);
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },
    get_spc: async ({url, hotAxiosPrivate}) => {
        try {
            const response = await hotAxiosPrivate.get(url);

            return response.data
        } catch (e) {
            return errorHandler(e);
        }
    },
    list: async ({role, entity, options, token, hotAxiosPrivate}) => {
        try {
            const response = await hotAxiosPrivate.get(`/${role}/${entity}/list`,);
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },
    list_spc: async ({role, entity, id, hotAxiosPrivate}) => {
        try {
            const response = await hotAxiosPrivate.get(`/${entity}/${role}/${id}/list`);
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },
    finance_get: async ({role, entity, id, hotAxiosPrivate}) => {
        try {
            const response = await hotAxiosPrivate.get(`/${role}/${id}/${entity}/get-info`);
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },
    cancel: async ({role, entity, id, jsonData, hotAxiosPrivate}) => {
        try {
            const response = await hotAxiosPrivate.put(`/${role}/${entity}/${id}/cancel`, jsonData);
            return response.data;
        } catch (e) {
            return errorHandler(e);
        }
    },
    remove: async ({role, entity, entityId, hotAxiosPrivate}) => {
        try {
            const response = await hotAxiosPrivate.delete(`/${role}/${entity}/${entityId}/remove`,);
            return response.data;
        } catch (error) {
            return errorHandler(error);
        }
    },
    assign_class: async ({role, token, entity, jsonData, hotAxiosPrivate, id}) => {
        try {

            const response = await hotAxiosPrivate.put(
                `/${role}/${entity}/${id}/assign-class`,
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
    approve: async ({
                        token, role, entity, jsonData, hotAxiosToken, adminId, regId
                    }) => {
        try {
            const response = await hotAxiosToken.put(`/${entity}/${regId}/${role}/${adminId}/approve`, jsonData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })

            return response.data
        } catch (e) {
            return errorHandler(e);
        }
    }
};

