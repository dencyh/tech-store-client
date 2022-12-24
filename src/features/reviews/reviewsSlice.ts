import { apiSlice } from "../api/apiSlice";
import { User } from "../auth/userSlice";

export interface Review {
  _id: string;
  user: User;
  product: string;
  score: number;
  review: {
    advantages: string;
    disadvantages: string;
    comment: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewInput {
  productId: string;
  userId: string;
  score: number;
  review: Review["review"];
}

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<Review[], string>({
      query: (productId) => `/reviews/${productId}`,
      providesTags: ["Review"]
    }),

    postReview: builder.mutation<Review, ReviewInput>({
      query: ({ productId, userId, score, review }) => ({
        url: `/products/${productId}/${userId}`,
        method: "POST",
        body: { score, review }
      })
    })
  })
});

export const { useGetReviewsQuery, usePostReviewMutation } = reviewsApiSlice;
