import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useState } from "react";
import { Post } from "./types";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";

const PostDetailWrapper: React.FC<{
  posts: Post[];
  onDelete: (id: string) => void;
}> = ({ posts, onDelete }) => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p) => p.id === id);
  return <PostDetail post={post} onDelete={onDelete} />;
};

const PostFormWrapper: React.FC<{
  posts: Post[];
  onAdd: (post: Omit<Post, "id" | "date">) => void;
  onUpdate: (id: string, post: Omit<Post, "id" | "date">) => void;
}> = ({ posts, onAdd, onUpdate }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === id);

  const handleSubmit = (newPost: Omit<Post, "id" | "date">) => {
    if (id) {
      onUpdate(id, newPost);
      alert("Cập nhật thành công!");
      navigate(`/posts/${id}`);
    } else {
      onAdd(newPost);
      alert("Đăng bài thành công!");
      navigate("/");
    }
  };

  const handleCancel = () => {
    if (id) {
      navigate(`/posts/${id}`);
    } else {
      navigate("/");
    }
  };

  return (
    <PostForm post={post} onSubmit={handleSubmit} onCancel={handleCancel} />
  );
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Hướng dẫn lập trình React cơ bản",
      author: "Nguyễn Văn A",
      thumbnail: "https://via.placeholder.com/300",
      content:
        "React là một thư viện JavaScript phổ biến cho việc xây dựng giao diện người dùng. Trong bài viết này, chúng ta sẽ tìm hiểu cách bắt đầu với React, từ cài đặt đến tạo component đầu tiên. React sử dụng JSX để viết mã, giúp code dễ đọc hơn. Chúng ta cũng sẽ khám phá state và props, hai khái niệm cốt lõi. Cuối cùng, bài viết sẽ hướng dẫn tích hợp React Router để điều hướng giữa các trang.",
      category: "Công nghệ",
      date: "2023-10-01",
    },
    {
      id: "2",
      title: "Khám phá du lịch Đà Nẵng",
      author: "Trần Thị B",
      thumbnail: "https://via.placeholder.com/300",
      content:
        "Đà Nẵng là một thành phố ven biển tuyệt đẹp ở Việt Nam. Bài viết này sẽ đưa bạn qua các điểm đến nổi tiếng như cầu Rồng, núi Ngũ Hành Sơn và bãi biển Mỹ Khê. Chúng ta sẽ thảo luận về ẩm thực địa phương, các hoạt động vui chơi và mẹo du lịch tiết kiệm. Đà Nẵng cũng là điểm khởi đầu lý tưởng để khám phá Hội An và Bà Nà Hills.",
      category: "Du lịch",
      date: "2023-10-02",
    },
    {
      id: "3",
      title: "Công thức nấu ăn món phở bò",
      author: "Lê Văn C",
      thumbnail: "https://via.placeholder.com/300",
      content:
        "Phở bò là món ăn truyền thống của Việt Nam. Bài viết này sẽ hướng dẫn chi tiết cách nấu phở từ việc chuẩn bị nguyên liệu đến cách trình bày. Bạn sẽ học cách ninh xương, làm nước dùng thơm ngon và chọn thịt bò tươi. Ngoài ra, chúng ta sẽ khám phá các biến tấu của phở và cách phục vụ để có bữa ăn hoàn hảo.",
      category: "Ẩm thực",
      date: "2023-10-03",
    },
    {
      id: "4",
      title: "Mẹo sống khỏe mạnh hàng ngày",
      author: "Phạm Thị D",
      thumbnail: "https://via.placeholder.com/300",
      content:
        "Sống khỏe mạnh không khó nếu bạn áp dụng đúng thói quen. Bài viết này chia sẻ các mẹo như ăn uống cân bằng, tập thể dục đều đặn và quản lý stress. Chúng ta sẽ thảo luận về tầm quan trọng của giấc ngủ và cách duy trì cân nặng hợp lý. Cuối cùng, bài viết khuyến khích xây dựng lối sống tích cực để cải thiện sức khỏe tổng thể.",
      category: "Đời sống",
      date: "2023-10-04",
    },
    {
      id: "5",
      title: "Xu hướng công nghệ 2023",
      author: "Hoàng Văn E",
      thumbnail: "https://via.placeholder.com/300",
      content:
        "Năm 2023 chứng kiến nhiều tiến bộ trong công nghệ. Bài viết này điểm qua AI, blockchain và thực tế ảo. Chúng ta sẽ phân tích tác động của chúng đến cuộc sống hàng ngày và kinh doanh. Ngoài ra, bài viết dự đoán xu hướng tương lai như metaverse và xe tự lái.",
      category: "Công nghệ",
      date: "2023-10-05",
    },
  ]);

  const handleDelete = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handleAdd = (newPost: Omit<Post, "id" | "date">) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
    };
    setPosts([...posts, post]);
  };

  const handleUpdate = (id: string, updatedPost: Omit<Post, "id" | "date">) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, ...updatedPost } : p)));
  };

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route
            path="/"
            element={<PostList posts={posts} onDelete={handleDelete} />}
          />
          <Route
            path="/posts"
            element={<PostList posts={posts} onDelete={handleDelete} />}
          />
          <Route
            path="/create"
            element={
              <PostFormWrapper
                posts={posts}
                onAdd={handleAdd}
                onUpdate={handleUpdate}
              />
            }
          />
          <Route
            path="/posts/:id"
            element={
              <PostDetailWrapper posts={posts} onDelete={handleDelete} />
            }
          />
          <Route
            path="/posts/edit/:id"
            element={
              <PostFormWrapper
                posts={posts}
                onAdd={handleAdd}
                onUpdate={handleUpdate}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
};
export default App;
