import React, { useState, useEffect } from "react";
import { Post } from "../types";

interface PostFormProps {
  post?: Post;
  onSubmit: (post: Omit<Post, "id" | "date">) => void;
  onCancel: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ post, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [author, setAuthor] = useState(post?.author || "");
  const [thumbnail, setThumbnail] = useState(post?.thumbnail || "");
  const [content, setContent] = useState(post?.content || "");
  const [category, setCategory] = useState<Post["category"]>(
    post?.category || "Khác"
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (title.length < 10) newErrors.title = "Tiêu đề phải ít nhất 10 ký tự.";
    if (author.length < 3) newErrors.author = "Tác giả phải ít nhất 3 ký tự.";
    if (content.length < 50)
      newErrors.content = "Nội dung phải ít nhất 50 ký tự.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ title, author, thumbnail, content, category });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tiêu đề:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
      </div>
      <div>
        <label>Tác giả:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        {errors.author && <p style={{ color: "red" }}>{errors.author}</p>}
      </div>
      <div>
        <label>URL ảnh thumbnail:</label>
        <input
          type="url"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Thể loại:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Post["category"])}
        >
          <option value="Công nghệ">Công nghệ</option>
          <option value="Du lịch">Du lịch</option>
          <option value="Ẩm thực">Ẩm thực</option>
          <option value="Đời sống">Đời sống</option>
          <option value="Khác">Khác</option>
        </select>
      </div>
      <div>
        <label>Nội dung:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
        />
        {errors.content && <p style={{ color: "red" }}>{errors.content}</p>}
      </div>
      <button type="submit">{post ? "Cập nhật" : "Đăng bài"}</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
        Hủy
      </button>
    </form>
  );
};

export default PostForm;
