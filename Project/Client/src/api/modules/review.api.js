import privateClient from "../client/private.client";

const reviewEndpoints = {
    list: "reviews",
    add: "reviews",
    remove: ({ reviewId }) => `reviews/${reviewId}`,
}

const reviewApi = {
    add: async ({
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content,
        imdbRating
    }) => {
        try {
            const response = await privateClient.post(
                reviewEndpoints.add,
                {
                    mediaId,
                    mediaType,
                    mediaTitle,
                    mediaPoster,
                    content,
                    imdbRating
                }
            );

            return { response };
        } catch (error) {
            return { error };
        }
    },
    remove: async ({ reviewId }) => {
        try {
            const response = await privateClient.delete(
                reviewEndpoints.remove({ reviewId })
            );

            return { response };
        } catch (error) {
            return { error };
        }
    },
    getList: async ({ mediaId, mediaType }) => {
        try {
            const response = await privateClient.get(
                reviewEndpoints.list + `?mediaId=${mediaId}&mediaType=${mediaType}`
            );

            return { response };
        } catch (error) {
            return { error };
        }
    }
};

export default reviewApi;