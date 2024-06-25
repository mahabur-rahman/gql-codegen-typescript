import { useMutation, useQuery } from "@apollo/client";
import { GET_COMMENT_QUOTE_REF } from "../graphql/queries/queries";
import { FC } from "react";
import WriteComment from "./WriteComment";
import { CREATE_COMMENT } from "../graphql/mutations/mutations";

type CommentProps = {
  quoteId: string;
};

const FetchComment: FC<CommentProps> = ({ quoteId }) => {
  const { data, loading, error, refetch } = useQuery(GET_COMMENT_QUOTE_REF, {
    variables: { quoteId },
  });

//   write comment here 
const [writeComment] = useMutation(CREATE_COMMENT)

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments: {error.message}</p>;


    // write comment
    const handleCommentSubmit = async (text: string) => {
     
        try {
          await writeComment({
            variables: {
              createCommentDto: {
                content: text,
                quoteRef: quoteId
              }
            },
          });
          await refetch();
        } catch (error) {
          console.error("Error writing comment:", error);
        }
      };
    



  return (
    <div>
      {data?.getCommentsByQuote?.map((comment) => (
        <div key={comment._id} className="flex justify-between">
          <p>{comment.content}</p>
          {/* Example of mapping through commentedBy */}
          <ul>
            {comment.commentedBy.map((user) => (
              <li key={user?._id}>{user?.firstName} {user?.lastName}</li>
            ))}
          </ul>


        </div>
      ))}


      <WriteComment onCommentSubmit={handleCommentSubmit}/>
    </div>
  );
};

export default FetchComment;
