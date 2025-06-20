import privateClient from "../client/private.client";

const  favoriteEndpoints = {
    list: "user/favorites",
    add: "user/favorites",
    remove: ({ favoriteId }) => `user/favorites/${favoriteId}`,
}

const favoriteApi = {
    getList: async () => {
        try {
            const response = await privateClient.get(
                favoriteEndpoints.list
            );

            return { response };
        } catch (error) {
            return { error };
        }
    },
    add: async ({ 
        mediaId, 
        mediaType, 
        mediaTitle, 
        mediaPoster,
        imdbRate
    }) => {
        try {
            const response = await privateClient.post(
                favoriteEndpoints.add,
                { mediaId, mediaType, mediaTitle, mediaPoster, imdbRate }
            );

            return { response };
        } catch (error) {
            return { error };
        }
    },
    remove: async ({ favoriteId }) => {
        try {
            const response = await privateClient.delete(
                favoriteEndpoints.remove({ favoriteId })
            );

            return { response };
        } catch (error) {
            return { error };
        }
    }
};

export default favoriteApi;
