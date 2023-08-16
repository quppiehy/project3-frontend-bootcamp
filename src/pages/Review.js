import React, { useState, useEffect } from "react";
import {
  Typography,
  Rating,
  TextareaAutosize,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../Components/UserContext";

const ReviewSummaryTable = ({ reviews }) => (
  <div style={{ marginTop: "20px" }}>
    <Typography variant="h6">Reviews Summary:</Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Rating</TableCell>
          <TableCell>Review</TableCell>
          <TableCell>Posted By</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {reviews.map((review) => (
          <TableRow key={review.id}>
            <TableCell>{review.ratingId}</TableCell>
            <TableCell>{review.content}</TableCell>
            <TableCell>{review.user.userName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const Review = () => {
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [productId, setProductId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { currUser, setCurrUser } = useUserContext();
  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split("/");
  const id = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    setProductId(id);
  }, [id]);

  const fetchReviews = () => {
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/${id}/review`)
      .then((reviewResponse) => {
        setReviews(reviewResponse.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const submitReview = () => {
    if (!reviewRating || !reviewContent) {
      // Add form validation here
      return;
    }

    setSubmitting(true);

    const reviewData = {
      userId: currUser.id,
      content: reviewContent,
      ratingId: reviewRating,
    };

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`,
        reviewData
      )
      .then((response) => {
        console.log("Review submitted successfully:", response.data);
        setReviewContent("");
        setReviewRating(0);
        fetchReviews(); // Fetch updated reviews after submission
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  useEffect(() => {
    if (currUser === null) {
      const localAccess = JSON.parse(localStorage.getItem("currUser"));
      setCurrUser(localAccess);
    }
  }, [currUser]);

  return (
    <div>
      <Typography variant="h6">Add a Review:</Typography>
      <Rating
        name="review-rating"
        value={reviewRating}
        onChange={(event, newValue) => {
          setReviewRating(newValue);
        }}
      />
      <TextareaAutosize
        rowsMin={4}
        placeholder="Write your review here..."
        value={reviewContent}
        onChange={(event) => setReviewContent(event.target.value)}
        style={{ width: "100%", marginTop: "10px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={submitReview}
        style={{ marginTop: "10px" }}
        disabled={submitting}
      >
        {submitting ? <CircularProgress size={24} /> : "Submit Review"}
      </Button>

      {loading ? (
        <div>Loading reviews...</div>
      ) : (
        <ReviewSummaryTable reviews={reviews} />
      )}
    </div>
  );
};

export default Review;
