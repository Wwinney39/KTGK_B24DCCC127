import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../types";
import PostCard from "./PostCard";

interface PostListProps {
  posts: Post[];
  onDelete: (id: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleViewDetail = (id: string) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div>
      <h1>Trang chủ - Danh sách bài viết</h1>
      <p>Tổng số bài viết: {posts.length}</p>
      <button onClick={() => navigate("/create")}>Viết bài mới</button>
      <input
        type="text"
        placeholder="Tìm kiếm theo tiêu đề..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div>
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={onDelete}
            onViewDetail={handleViewDetail}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;
