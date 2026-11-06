import {
  IconBell,
  IconBookmark,
  IconCheck,
  IconChevronDown,
  IconCompass,
  IconHome2,
  IconMessageCircle,
  IconMoodSmile,
  IconPhoto,
  IconPlus,
  IconSearch,
  IconSettings,
  IconSparkles,
  IconUsers,
  IconWorld,
} from "@tabler/icons-react";
import { useMemo, useState, type FormEvent } from "react";
import { PostCard, type Post } from "../components/posts/PostCard";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { ApiPost } from "../types/post";
import { PostSkeleton } from "../components/posts/PostSkeleton";
import { useAuth } from "../context/useAuth";
import {
  getAllPosts,
  mapApiPost,
  createPost,
  toggleLike,
  toggleBookmark,
} from "../services/posts";

const postNodeIds: Record<string, string> = {
  "post-alex": "1:589",
  "post-elena": "1:645",
  "post-devon": "1:704",
};
const navigation = [
  { label: "Feed", icon: IconHome2 },
  { label: "Explore", icon: IconCompass },
  { label: "Messages", icon: IconMessageCircle, count: "3" },
  { label: "Communities", icon: IconUsers },
  { label: "Saved", icon: IconBookmark },
];
const trendingTopics = [
  {
    category: "Design · Trending",
    tag: "#DarkModeDesign",
    posts: "2.4k posts",
  },
  {
    category: "Technology · Trending",
    tag: "#BuildInPublic",
    posts: "1.8k posts",
  },
  { category: "Community · Today", tag: "#VYBECreators", posts: "936 posts" },
];
const suggestedCreators = [
  {
    name: "Maya Chen",
    handle: "mayacreates",
    initials: "MC",
    color: "from-[#d58b65] to-[#6a4180]",
    role: "Creative developer",
  },
  {
    name: "Jordan Lee",
    handle: "jordanbuilds",
    initials: "JL",
    color: "from-[#5988a8] to-[#31457d]",
    role: "Product designer",
  },
  {
    name: "Nia Brooks",
    handle: "niabrooks",
    initials: "NB",
    color: "from-[#8d64bb] to-[#43366d]",
    role: "Community host",
  },
];
const avatarClass =
  "grid size-10 shrink-0 place-items-center rounded-full text-xs font-semibold text-white ring-1 ring-white/10";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [feedTab, setFeedTab] = useState<"For You" | "Following">("For You");
  const [search, setSearch] = useState("");

  const [draft, setDraft] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const [activeNav, setActiveNav] = useState("Feed");
  const [message, setMessage] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        setError("");

        const response = await getAllPosts();
        console.log(
          "Posts with missing data:",
          response.data.posts.filter(
            (post) =>
              !post.body ||
              !post.user ||
              !post.user.name ||
              !post.user.username,
          ),
        );
        console.log(
          "Mapped posts:",
          response.data.posts.map((post) => mapApiPost(post, user?.id ?? "")),
        );

        const formattedPosts = response.data.posts.map((post: ApiPost) =>
          mapApiPost(post, user?.id ?? ""),
        );

        console.log("FIRST MAPPED POST:", formattedPosts[0]);

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError("Failed to load posts. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [user?.id]);

  const visiblePosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTab = feedTab === "For You" || post.followed;
      const matchesSearch =
        !query ||
        `${post.author.name} ${post.author.username} ${post.text}`
          .toLowerCase()
          .includes(query);
      return matchesTab && matchesSearch;
    });
  }, [feedTab, posts, search]);

  async function handleLike(postId: string) {
    try {
      await toggleLike(postId);

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                liked: !post.liked,
                likes: post.likes + (post.liked ? -1 : 1),
              }
            : post,
        ),
      );
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  }

  async function handleBookmark(postId: string) {
    try {
      const response = await toggleBookmark(postId);

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                bookmarked: response.data.bookmarked,
                saves: response.data.bookmarksCount,
              }
            : post,
        ),
      );
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  }

  async function handleCreatePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = draft.trim();

    if (!text && !selectedImage) return;

    try {
      setIsPosting(true);

      await createPost(text, selectedImage ?? undefined);

      setDraft("");
      setSelectedImage(null);
      setMessage("Your post was published successfully.");

      const response = await getAllPosts();

      const formattedPosts = response.data.posts.map((post: ApiPost) =>
        mapApiPost(post, user?.id ?? ""),
      );

      setPosts(formattedPosts);
    } catch (error) {
      console.error("Failed to create post:", error);
      setMessage("Failed to publish your post. Please try again.");
    } finally {
      setIsPosting(false);
    }
  }

  console.log(posts);

  return (
    <div
      className="min-h-screen bg-[#10131d] text-[#e0e2f0]"
      data-node-id="1:542"
    >
      <header
        className="sticky top-0 z-30 border-b border-white/6 bg-[#10131de8] backdrop-blur-xl"
        data-node-id="1:1747"
      >
        <div className="mx-auto flex h-17 max-w-360 items-center gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex w-63 shrink-0 items-center gap-3 max-xl:w-auto max-xl:flex-1">
            <div className="grid size-9 place-items-center rounded-xl bg-[#5022b6] text-lg font-black text-[#efe9ff] shadow-[0_0_18px_#a78bfa45]">
              V
            </div>
            <span className="text-xl font-bold tracking-[0.14em] text-[#e0e2f0]">
              VYBE
            </span>
            <span className="hidden rounded-full bg-[#272a34] px-2 py-0.5 text-[9px] font-semibold tracking-[0.08em] text-[#cebdff] sm:inline">
              ID 2.0
            </span>
          </div>
          <label
            className="relative hidden max-w-140 flex-1 md:block"
            aria-label="Search VYBE"
          >
            <IconSearch className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-[#948e9d]" />
            <input
              className="h-11 w-full rounded-full border border-white/6 bg-[#1c1f2a] pl-11 pr-4 text-sm text-[#e0e2f0] outline-none transition-[border-color,box-shadow] placeholder:text-[#777182] focus:border-[#a78bfa80] focus:shadow-[0_0_0_3px_#a78bfa1c]"
              type="search"
              placeholder="Search people, posts, and topics"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <div className="ml-auto flex items-center gap-2">
            <label className="relative md:hidden" aria-label="Search posts">
              <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#948e9d]" />
              <input
                className="h-10 w-[min(38vw,180px)] rounded-full border border-white/6 bg-[#1c1f2a] pl-9 pr-3 text-sm text-[#e0e2f0] outline-none placeholder:text-[#777182] focus:border-[#a78bfa80]"
                type="search"
                placeholder="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <button
              className="relative grid size-10 place-items-center rounded-full text-[#cac4d4] transition-colors hover:bg-white/6 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff]"
              type="button"
              aria-label="Notifications"
            >
              <IconBell className="size-5" />
              <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-[#10131d] bg-[#a78bfa]" />
            </button>
            <button
              className="hidden items-center gap-2 rounded-full p-1 pr-2 transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff] sm:flex"
              type="button"
              aria-label="Your profile"
              onClick={() => navigate("/profile")}
            >
              <span
                className={`${avatarClass} size-8 overflow-hidden bg-linear-to-br from-[#8b6cf1] to-[#42628a]`}
              >
                {user?.photo ? (
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="size-full object-cover"
                  />
                ) : (
                  (user?.name?.charAt(0).toUpperCase() ?? "U")
                )}
              </span>

              <span className="hidden text-xs font-medium text-[#cac4d4] lg:inline">
                {user?.name ?? "Loading..."}
              </span>
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-360 grid-cols-1 gap-6 px-4 pb-24 pt-5 sm:px-6 lg:grid-cols-[220px_minmax(0,680px)] lg:gap-8 lg:px-8 xl:grid-cols-[220px_minmax(0,680px)_280px] 2xl:grid-cols-[240px_minmax(0,680px)_300px]">
        <aside
          className="sticky top-22 hidden h-[calc(100dvh-108px)] flex-col lg:flex"
          aria-label="Primary navigation"
        >
          <div className="rounded-2xl border border-white/4 bg-[#181b26] p-3">
            <nav className="space-y-1">
              {navigation.map(({ label, icon: Icon, count }) => (
                <button
                  key={label}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#cebdff] ${activeNav === label ? "bg-[#a78bfa1a] text-[#cebdff]" : "text-[#aaa4b5] hover:bg-white/4 hover:text-[#e0e2f0]"}`}
                  type="button"
                  aria-current={activeNav === label ? "page" : undefined}
                  onClick={() => setActiveNav(label)}
                >
                  <Icon className="size-4.75" stroke={1.8} />
                  <span className="flex-1">{label}</span>
                  {count && (
                    <span className="rounded-full bg-[#a78bfa] px-1.5 py-0.5 text-[10px] font-semibold text-[#321174]">
                      {count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
            <button
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#a78bfa] text-sm font-semibold text-[#321174] shadow-[0_8px_20px_#a78bfa26] transition-[transform,background] hover:-translate-y-0.5 hover:bg-[#b49cff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff]"
              type="button"
              onClick={() => document.getElementById("create-post")?.focus()}
            >
              <IconPlus className="size-4.5" stroke={2.2} /> Create post
            </button>
          </div>
          <div className="mt-auto flex items-center justify-between px-2 py-4 text-xs text-[#777182]">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400" />
              All systems online
            </span>
            <button
              className="rounded-lg p-2 text-[#948e9d] transition-colors hover:bg-white/5 hover:text-[#e0e2f0]"
              type="button"
              aria-label="Settings"
            >
              <IconSettings className="size-4.5" />
            </button>
          </div>
        </aside>
        <main className="mx-auto min-w-0 w-full max-w-170" data-node-id="1:543">
          <div
            className="sticky top-17 z-20 -mx-2 flex items-center justify-between bg-[#10131de8] px-2 py-2 backdrop-blur-xl lg:static lg:mx-0 lg:mb-4 lg:bg-transparent lg:px-0 lg:py-0"
            data-node-id="1:544"
          >
            <div className="flex items-center gap-1 rounded-full bg-[#181b26] p-1 lg:rounded-none lg:bg-transparent lg:p-0">
              {(["For You", "Following"] as const).map((tab) => (
                <button
                  key={tab}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#cebdff] lg:rounded-none lg:px-4 lg:py-2.5 ${feedTab === tab ? "bg-[#a78bfa] font-semibold text-[#321174] lg:bg-transparent lg:text-[#e0e2f0]" : "font-medium text-[#948e9d] hover:text-[#e0e2f0]"}`}
                  type="button"
                  aria-pressed={feedTab === tab}
                  onClick={() => setFeedTab(tab)}
                  data-node-id={tab === "For You" ? "1:547" : "1:550"}
                >
                  {tab}
                  {feedTab === tab && (
                    <span className="absolute inset-x-4 bottom-0 hidden h-0.5 rounded-full bg-[#a78bfa] lg:block" />
                  )}
                </button>
              ))}
            </div>
            <button
              className="grid size-9 place-items-center rounded-full bg-[#181b26] text-[#cac4d4] transition-colors hover:bg-[#272a34] hover:text-[#cebdff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff] lg:bg-transparent"
              type="button"
              aria-label="Feed preferences"
            >
              <IconSparkles className="size-4.5" />
            </button>
          </div>

          <form
            className="mb-4 rounded-2xl border border-white/5 bg-[#1c1f2a] p-4 shadow-[0_12px_36px_#05071114] sm:p-5"
            onSubmit={handleCreatePost}
          >
            <input
              type="file"
              id="post-image"
              accept="image/*"
              className="hidden"
              onChange={(event) =>
                setSelectedImage(event.target.files?.[0] ?? null)
              }
            />

            <div className="flex gap-3">
              <span
                className={`${avatarClass} size-10 overflow-hidden bg-linear-to-br from-[#8b6cf1] to-[#42628a]`}
              >
                {user?.photo ? (
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="size-full object-cover"
                  />
                ) : (
                  (user?.name?.charAt(0).toUpperCase() ?? "U")
                )}
              </span>
              <label className="min-w-0 flex-1">
                <span className="sr-only">Write a post</span>
                <textarea
                  id="create-post"
                  className="min-h-15.5 w-full resize-y border-0 bg-transparent py-1 text-[15px] leading-6 text-[#e0e2f0] outline-none placeholder:text-[#948e9d] focus-visible:ring-0"
                  placeholder={`What's happening, ${user?.name ?? "there"}?`}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                />
              </label>
            </div>

            {selectedImage && (
              <div className="relative mt-3 w-fit">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected image preview"
                  className="max-h-64 max-w-full rounded-xl object-contain"
                />

                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white hover:bg-black"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between border-t border-white/6 pt-3">
              <div className="flex items-center gap-1">
                <button
                  className="grid size-9 place-items-center rounded-full text-[#948e9d] transition-colors hover:bg-white/5 hover:text-[#cebdff] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#cebdff]"
                  type="button"
                  aria-label="Add a photo"
                  onClick={() => document.getElementById("post-image")?.click()}
                >
                  <IconPhoto className="size-4.5" />
                </button>
                <button
                  className="grid size-9 place-items-center rounded-full text-[#948e9d] transition-colors hover:bg-white/5 hover:text-[#cebdff] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#cebdff]"
                  type="button"
                  aria-label="Add an emoji"
                >
                  <IconMoodSmile className="size-4.5" />
                </button>
                <button
                  className="hidden items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-[#aaa4b5] transition-colors hover:bg-white/5 sm:inline-flex"
                  type="button"
                  aria-label="Post visibility is public"
                >
                  <IconWorld className="size-4" />
                  Public
                  <IconChevronDown className="size-3.5" />
                </button>
              </div>
              <button
                className="inline-flex h-9 items-center gap-2 rounded-full bg-[#a78bfa] px-5 text-sm font-semibold text-[#321174] transition-[transform,background] hover:-translate-y-px hover:bg-[#b49cff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff] disabled:cursor-not-allowed disabled:opacity-50"
                type="submit"
                disabled={(!draft.trim() && !selectedImage) || isPosting}
                data-node-id="1:586"
              >
                {isPosting ? "Posting..." : "Post"}
              </button>
            </div>
            {message && (
              <p
                className="mt-3 flex items-center gap-2 text-xs text-[#cebdff]"
                role="status"
              >
                <IconCheck className="size-4" />
                {message}
              </p>
            )}
          </form>

          <div className="space-y-4" aria-live="polite">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <PostSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <p className="py-10 text-center text-red-400">{error}</p>
            ) : visiblePosts.length ? (
              visiblePosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  dataNodeId={postNodeIds[post.id]}
                  onBookmark={handleBookmark}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-white/5 bg-[#1c1f2a] px-6 py-12 text-center">
                <IconSearch className="mx-auto size-7 text-[#948e9d]" />
                <p className="mt-3 text-sm font-medium text-[#e0e2f0]">
                  No posts found
                </p>
                <p className="mt-1 text-xs text-[#948e9d]">
                  Try another search or switch to For You.
                </p>
              </div>
            )}
          </div>
        </main>
        <aside
          className="hidden min-w-0 space-y-4 xl:block"
          aria-label="Discover on VYBE"
        >
          <section className="rounded-2xl border border-white/4 bg-[#181b26] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#e0e2f0]">
                Trending for you
              </h2>
              <IconSparkles className="size-4 text-[#a78bfa]" />
            </div>
            <div className="mt-2 divide-y divide-white/5">
              {trendingTopics.map((topic) => (
                <button
                  className="block w-full py-3 text-left transition-colors hover:text-[#cebdff]"
                  type="button"
                  key={topic.tag}
                  onClick={() => setSearch(topic.tag.replace("#", ""))}
                >
                  <span className="block text-[10px] text-[#777182]">
                    {topic.category}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-[#e0e2f0]">
                    {topic.tag}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-[#948e9d]">
                    {topic.posts}
                  </span>
                </button>
              ))}
            </div>
            <button
              className="mt-1 text-xs font-semibold text-[#cebdff] transition-colors hover:text-white"
              type="button"
            >
              Show more
            </button>
          </section>
          <section className="rounded-2xl border border-white/4 bg-[#181b26] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#e0e2f0]">
                Creators to follow
              </h2>
              <IconUsers className="size-4 text-[#a78bfa]" />
            </div>
            <div className="mt-4 space-y-4">
              {suggestedCreators.map((creator) => (
                <div className="flex items-center gap-2.5" key={creator.handle}>
                  <span
                    className={`${avatarClass} size-9 bg-linear-to-br ${creator.color}`}
                  >
                    {creator.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-[#e0e2f0]">
                      {creator.name}
                    </p>
                    <p className="truncate text-[10px] text-[#948e9d]">
                      {creator.role}
                    </p>
                  </div>
                  <button
                    className="grid size-8 shrink-0 place-items-center rounded-full border border-[#a78bfa55] text-[#cebdff] transition-colors hover:bg-[#a78bfa] hover:text-[#321174] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#cebdff]"
                    type="button"
                    aria-label={`Follow ${creator.name}`}
                  >
                    <IconPlus className="size-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              className="mt-4 text-xs font-semibold text-[#cebdff] transition-colors hover:text-white"
              type="button"
            >
              Find more creators
            </button>
          </section>
          <footer className="flex flex-wrap gap-x-3 gap-y-1 px-1 text-[10px] leading-4 text-[#6f697a]">
            <span>About</span>
            <span>Guidelines</span>
            <span>Privacy</span>
            <span>Terms</span>
            <span>© 2025 VYBE</span>
          </footer>
        </aside>
      </div>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-5 border-t border-white/6 bg-[#181b26ed] px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
        aria-label="Mobile navigation"
        data-node-id="1:1759"
      >
        {[
          { label: "Feed", icon: IconHome2 },
          { label: "Explore", icon: IconCompass },
          { label: "Create", icon: IconPlus },
          { label: "Saved", icon: IconBookmark },
          { label: "Profile", icon: IconUsers },
        ].map(({ label, icon: Icon }) => (
          <button
            className={`flex flex-col items-center justify-center gap-1 text-[10px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#cebdff] ${label === "Feed" ? "text-[#cebdff]" : "text-[#948e9d] hover:text-[#e0e2f0]"}`}
            type="button"
            aria-label={label}
            aria-current={label === "Feed" ? "page" : undefined}
            onClick={() => {
              if (label === "Create") {
                document.getElementById("create-post")?.focus();
              } else if (label === "Profile") {
                navigate("/profile");
              } else {
                setActiveNav(label);
              }
            }}
            key={label}
          >
            <span
              className={`grid size-8 place-items-center rounded-full ${label === "Create" ? "bg-[#a78bfa] text-[#321174] shadow-[0_5px_18px_#a78bfa40]" : ""}`}
            >
              <Icon className="size-4.5" stroke={1.9} />
            </span>
            {label !== "Create" && <span>{label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
