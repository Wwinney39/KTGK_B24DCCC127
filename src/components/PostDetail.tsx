import React from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../types";

interface PostDetailProps {
  post: Post | undefined;
  onDelete: (id: string) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onDelete }) => {
  const navigate = useNavigate();

  if (!post) return <p>Bài viết không tồn tại.</p>;

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      onDelete(post.id);
      navigate("/");
    }
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.thumbnail} alt={post.title} />
      <p>
        <strong>Tác giả:</strong> {post.author}
      </p>
      <p>
        <strong>Thể loại:</strong> {post.category}
      </p>
      <p>
        <strong>Ngày đăng:</strong> {post.date}
      </p>
      <p>{post.content}</p>
      <button onClick={() => navigate("/")}>Quay lại</button>
      <button onClick={() => navigate(`/posts/edit/${post.id}`)}>
        Chỉnh sửa
      </button>
      <button onClick={handleDelete}>Xóa bài viết</button>
    </div>
  );
};

export default PostDetail;
