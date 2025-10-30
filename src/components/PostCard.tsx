import React from "react";
import { Post } from "../types";

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
  onViewDetail: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onDelete,
  onViewDetail,
}) => {
  const shortDesc =
    post.content.length > 100
      ? post.content.substring(0, 100) + "..."
      : post.content;

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      onDelete(post.id);
    }
  };

  return (
    <div>
      <img src={post.thumbnail} alt={post.title} />
      <h3>{post.title}</h3>
      <p>
        <strong>Tác giả:</strong> {post.author}
      </p>
      <p>
        <strong>Ngày đăng:</strong> {post.date}
      </p>
      <p>{shortDesc}</p>
      <button onClick={() => onViewDetail(post.id)}>Đọc thêm</button>
      <button onClick={handleDelete}>Xóa</button>
    </div>
  );
};

export default PostCard;
