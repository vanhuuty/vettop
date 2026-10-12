import React, { useState } from 'react';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  MapPin, 
  Globe, 
  MoreHorizontal, 
  Star, 
  Send, 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck, 
  Phone,
  CheckCircle2
} from 'lucide-react';
import { Post, User } from '../types';

interface PostCardProps {
  post: Post;
  currentUser: User | null;
  onLikePost: (postId: string) => void;
  onSavePost: (postId: string) => void;
  onSharePost: (post: Post) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onOpenAdoptionModal: (post: Post) => void;
  onOpenClinicModal: (clinic: NonNullable<Post['clinicReview']>) => void;
  onOpenUserModal: (user: User) => void;
  onOpenAuth?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  onLikePost,
  onSavePost,
  onSharePost,
  onAddComment,
  onOpenAdoptionModal,
  onOpenClinicModal,
  onOpenUserModal,
  onOpenAuth,
}) => {
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(post.id, newComment.trim());
    setNewComment('');
  };

  return (
    <article className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/80 transition-all hover:shadow-sm">
      {/* Post Header */}
      <div className="flex items-start justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onOpenUserModal(post.author)} 
            className="relative shrink-0 group"
          >
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-blue-400 transition-all"
            />
          </button>

          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              <button 
                onClick={() => onOpenUserModal(post.author)}
                className="hover:text-blue-600 transition-colors inline"
              >
                {post.author.name}
              </button>

              {post.type === 'review' && post.clinicReview && (
                <span className="font-normal text-slate-500">
                  {' '}đã đánh giá{' '}
                  <span className="font-bold text-blue-600 hover:underline cursor-pointer" onClick={() => onOpenClinicModal(post.clinicReview!)}>
                    {post.clinicReview.clinicName}
                  </span>
                </span>
              )}

              {post.type === 'adoption' && post.adoption && (
                <span className="font-normal text-slate-500">
                  {' '}đã đăng tin tìm chủ nhận nuôi cho bé{' '}
                  <span className="font-bold text-rose-600">
                    {post.adoption.petName}
                  </span>
                </span>
              )}

              {post.groupName && (
                <span className="font-normal text-slate-500">
                  {' '}trong nhóm{' '}
                  <span className="font-bold text-blue-600 hover:underline cursor-pointer">
                    {post.groupName}
                  </span>
                </span>
              )}

              {post.type === 'experience' && (
                <span className="font-normal text-slate-500">
                  {' '}đã chia sẻ bài viết{' '}
                  <span className="font-bold text-emerald-600">
                    Kinh nghiệm chăm sóc
                  </span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
              <span>{post.createdAt}</span>
              {post.location && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{post.location}</span>
                  </span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <Globe className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        </div>

        <button 
          aria-label="Tùy chọn bài viết"
          className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <MoreHorizontal className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Post Text Content */}
      <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line mb-3.5">
        {post.content}
      </div>

      {/* Media Layout */}
      {post.images && post.images.length > 0 && (
        <div className="mb-3.5 rounded-xl overflow-hidden">
          {post.images.length === 1 ? (
            <div 
              onClick={() => setSelectedPhoto(post.images![0])}
              className="max-h-[420px] bg-slate-100 overflow-hidden cursor-pointer"
            >
              <img
                src={post.images[0]}
                alt="Post attachment"
                className="w-full h-full object-cover hover:scale-101 transition-transform"
              />
            </div>
          ) : post.images.length === 4 ? (
            <div className="grid grid-cols-2 gap-1.5 max-h-[380px]">
              {post.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPhoto(img)}
                  className="relative h-44 bg-slate-100 overflow-hidden cursor-pointer group"
                >
                  <img
                    src={img}
                    alt={`Attachment ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                  />
                  {i === 3 && (
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center text-white text-lg font-bold">
                      +3 ảnh
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1.5 max-h-[360px]">
              {post.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPhoto(img)}
                  className="h-44 bg-slate-100 overflow-hidden cursor-pointer group"
                >
                  <img
                    src={img}
                    alt={`Attachment ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Embedded Clinic Review Card (matching screenshot) */}
      {post.type === 'review' && post.clinicReview && (
        <div className="mb-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {post.clinicReview.clinicLogo ? (
              <img 
                src={post.clinicReview.clinicLogo} 
                alt="Logo" 
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 bg-white shadow-xs" 
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">
                🏥
              </div>
            )}
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {post.clinicReview.clinicName}
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{post.clinicReview.rating}</span>
                </span>
                <span>({post.clinicReview.reviewsCount} đánh giá)</span>
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {post.clinicReview.city} · {post.clinicReview.category}
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenClinicModal(post.clinicReview!)}
            className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-lg shrink-0 transition-colors"
          >
            Xem chi tiết
          </button>
        </div>
      )}

      {/* Embedded Pet Adoption Action Card */}
      {post.type === 'adoption' && post.adoption && (
        <div className="mb-3.5 p-3.5 rounded-xl bg-gradient-to-r from-rose-50/80 to-amber-50/60 border border-rose-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-md uppercase">
                {post.adoption.urgent ? 'Cần tìm chủ khẩn cấp' : 'Tìm mái ấm'}
              </span>
              <span className="text-xs text-slate-500">
                {post.adoption.city}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Bé {post.adoption.petName} ({post.adoption.breed})
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-1">
              <span>{post.adoption.age}</span>
              <span aria-hidden="true">·</span>
              <span>{post.adoption.gender === 'male' ? 'Đực' : 'Cái'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-medium">
                {post.adoption.vaccinated ? '✓ Đã tiêm phòng' : 'Chưa tiêm'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-700 font-medium">{post.adoption.adoptionFee}</span>
            </div>
          </div>

          <button
            onClick={() => onOpenAdoptionModal(post)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Gửi yêu cầu nhận nuôi</span>
          </button>
        </div>
      )}

      {/* Engagement Counter Summary Row */}
      <div className="flex items-center justify-between py-2 border-y border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]">
            ❤️
          </span>
          <span className="font-semibold text-slate-700 tabular-nums">{post.likes}</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <button 
            onClick={() => setShowComments(!showComments)}
            className="hover:underline"
          >
            <span className="tabular-nums">{post.comments.length}</span> bình luận
          </button>
          <span>
            <span className="tabular-nums">{post.shares}</span> lượt chia sẻ
          </span>
        </div>
      </div>

      {/* Primary Interaction Buttons (Like, Comment, Share, Save) */}
      <div className="flex items-center justify-between pt-1 pb-2">
        <button
          onClick={() => onLikePost(post.id)}
          className={`flex-1 py-1.5 flex items-center justify-center gap-1.5 text-xs font-semibold rounded-lg transition-colors ${
            post.isLiked
              ? 'text-rose-600 bg-rose-50/60 font-bold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
          <span>Thích</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 py-1.5 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Bình luận</span>
        </button>

        <button
          onClick={() => onSharePost(post)}
          className="flex-1 py-1.5 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>Chia sẻ</span>
        </button>

        <button
          onClick={() => onSavePost(post.id)}
          className={`flex-1 py-1.5 flex items-center justify-center gap-1.5 text-xs font-semibold rounded-lg transition-colors ${
            post.isSaved
              ? 'text-blue-600 bg-blue-50/60 font-bold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-blue-600 text-blue-600' : ''}`} />
          <span>Lưu</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-2 pt-3 border-t border-slate-100 space-y-3">
          {/* Comments List */}
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-2.5">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="bg-slate-100/80 rounded-2xl px-3.5 py-2">
                  <span className="text-xs font-bold text-slate-900 block">
                    {comment.author.name}
                  </span>
                  <p className="text-xs text-slate-700 mt-0.5">
                    {comment.content}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 pl-3 pt-1">
                  <span>{comment.createdAt}</span>
                  <button className="font-semibold hover:underline">Thích</button>
                  <button className="font-semibold hover:underline">Phản hồi</button>
                  {comment.likes > 0 && (
                    <span className="flex items-center gap-0.5 text-rose-500 ml-auto">
                      ❤️ <span className="tabular-nums">{comment.likes}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* New Comment Input */}
          {currentUser ? (
            <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 pt-1">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Viết bình luận cho bài viết..."
                  className="w-full pl-3.5 pr-10 py-2 text-xs bg-slate-100 hover:bg-slate-50 focus:bg-white border border-transparent focus:border-blue-400 rounded-full outline-hidden transition-all"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  aria-label="Gửi bình luận"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 disabled:text-slate-300 hover:text-blue-700 transition-colors p-1"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-2 px-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-500 flex items-center justify-between">
              <span>Đăng nhập để thích và bình luận bài viết này.</span>
              {onOpenAuth && (
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Đăng nhập ngay
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedPhoto}
              alt="Enlarged preview"
              className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </article>
  );
};
