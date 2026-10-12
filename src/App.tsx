import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { FeedHeader } from './components/FeedHeader';
import { PostCard } from './components/PostCard';
import { PostComposerModal } from './components/PostComposerModal';
import { AdoptionPortal } from './components/AdoptionPortal';
import { AdoptionApplicationModal } from './components/AdoptionApplicationModal';
import { ExperienceHub } from './components/ExperienceHub';
import { ToplistView } from './components/ToplistView';
import { FriendsView } from './components/FriendsView';
import { GroupsView } from './components/GroupsView';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { PetModal } from './components/PetModal';
import { UserProfileModal } from './components/UserProfileModal';
import { ChatDrawer } from './components/ChatDrawer';
import { AuthModal } from './components/AuthModal';
import { NotificationDropdown, NotificationItem } from './components/NotificationDropdown';
import { ClinicDetailModal } from './components/ClinicDetailModal';

import { 
  User, 
  Pet, 
  Post, 
  AdoptionDetails, 
  GuideArticle, 
  ToplistPlace, 
  AdoptionApplication, 
  ClinicReview,
  AppointmentBooking,
  CommunityGroup 
} from './types';

import { 
  currentUserInitial, 
  initialPets, 
  mockUsers, 
  initialPosts, 
  mockAdoptionPets, 
  mockGuideArticles, 
  mockToplistPlaces,
  mockCommunityGroups 
} from './data/mockData';

export default function App() {
  // Navigation & Filtering
  const [activeNavTab, setActiveNavTab] = useState<string>('feed');
  const [activeFilterType, setActiveFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Core Data State
  const [currentUser, setCurrentUser] = useState<User | null>(currentUserInitial);
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [adoptionPets, setAdoptionPets] = useState<AdoptionDetails[]>(mockAdoptionPets);
  const [guideArticles, setGuideArticles] = useState<GuideArticle[]>(mockGuideArticles);
  const [toplistPlaces, setToplistPlaces] = useState<ToplistPlace[]>(mockToplistPlaces);
  const [groups, setGroups] = useState<CommunityGroup[]>(mockCommunityGroups);
  const [appointments, setAppointments] = useState<AppointmentBooking[]>([]);
  const [applications, setApplications] = useState<AdoptionApplication[]>([]);

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Đã đăng xuất khỏi tài khoản VetTop.');
  };

  // Modals & Drawers Visibility
  const [showPostComposer, setShowPostComposer] = useState<boolean>(false);
  const [composerInitialType, setComposerInitialType] = useState<'general' | 'adoption' | 'experience' | 'review' | 'qa'>('general');
  const [composerInitialGroup, setComposerInitialGroup] = useState<string>('');
  const [showPetModal, setShowPetModal] = useState<boolean>(false);
  const [selectedPetForEdit, setSelectedPetForEdit] = useState<Pet | null>(null);
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [selectedPetForApply, setSelectedPetForApply] = useState<AdoptionDetails | null>(null);
  const [showUserProfileModal, setShowUserProfileModal] = useState<boolean>(false);
  const [selectedUserForProfile, setSelectedUserForProfile] = useState<User | null>(null);
  const [showChatDrawer, setShowChatDrawer] = useState<boolean>(false);
  const [activeChatUser, setActiveChatUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showClinicDetailModal, setShowClinicDetailModal] = useState<boolean>(false);
  const [selectedClinic, setSelectedClinic] = useState<ClinicReview | null>(null);
  const [showAppointmentBookingModal, setShowAppointmentBookingModal] = useState<boolean>(false);
  const [selectedClinicForBooking, setSelectedClinicForBooking] = useState<ToplistPlace | null>(null);

  // Toast alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      type: 'adoption',
      title: 'Trạm cứu trợ Sài Gòn Time',
      desc: 'vừa đăng tin tìm chủ mới cho bé Bông Mì.',
      time: '15 phút trước',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      read: false,
    },
    {
      id: 'n2',
      type: 'friend',
      title: 'Lê Mai Anh',
      desc: 'đã gửi lời mời kết bạn cho bạn.',
      time: '1 giờ trước',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      read: false,
    },
    {
      id: 'n3',
      type: 'comment',
      title: 'BS. Trần Quốc Khánh',
      desc: 'đã trả lời bình luận trong bài viết Phòng khám Hòa Vang.',
      time: '2 giờ trước',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      read: true,
    },
  ]);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Post Actions
  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : Math.max(0, post.likes - 1),
          };
        }
        return post;
      })
    );
  };

  const handleSavePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isSaved = !post.isSaved;
          showToast(isSaved ? 'Đã lưu bài viết vào mục Đã lưu!' : 'Đã bỏ lưu bài viết.');
          return { ...post, isSaved };
        }
        return post;
      })
    );
  };

  const handleSharePost = (post: Post) => {
    navigator.clipboard?.writeText(window.location.href);
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, shares: p.shares + 1 } : p))
    );
    showToast('Đã sao chép liên kết bài viết vào bộ nhớ tạm!');
  };

  const handleAddComment = (postId: string, commentText: string) => {
    if (!currentUser) {
      setShowAuthModal(true);
      showToast('Vui lòng đăng nhập để bình luận bài viết.');
      return;
    }

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newCommentItem = {
            id: `c-${Date.now()}`,
            author: currentUser,
            content: commentText,
            createdAt: 'Vừa xong',
            likes: 0,
            isLiked: false,
          };
          return {
            ...post,
            comments: [...post.comments, newCommentItem],
          };
        }
        return post;
      })
    );
    showToast('Bình luận của bạn đã được đăng!');
  };

  const handleAddPost = (postData: Partial<Post>) => {
    if (!currentUser) {
      setShowAuthModal(true);
      showToast('Vui lòng đăng nhập để đăng bài viết.');
      return;
    }

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: currentUser,
      createdAt: 'Vừa xong',
      content: postData.content || '',
      type: postData.type || 'general',
      location: postData.location || currentUser.location,
      groupName: postData.groupName,
      images: postData.images,
      clinicReview: postData.clinicReview,
      adoption: postData.adoption,
      likes: 1,
      isLiked: true,
      comments: [],
      shares: 0,
      isSaved: false,
    };

    setPosts([newPost, ...posts]);

    // If it's an adoption post, also add it to the adoption pets listing!
    if (newPost.adoption) {
      setAdoptionPets([newPost.adoption, ...adoptionPets]);
      showToast('Đã đăng tin tìm chủ nhận nuôi cho bé thành công!');
    } else {
      showToast('Đã đăng bài viết mới lên bảng tin cộng đồng!');
    }
  };

  // Adoption application submit
  const handleSubmitApplication = (appData: {
    petName: string;
    applicantName: string;
    applicantPhone: string;
    applicantEmail: string;
    applicantCity: string;
    experienceYears: string;
    housingType: string;
    message: string;
  }) => {
    const newApp: AdoptionApplication = {
      id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      petName: appData.petName,
      ownerId: selectedPetForApply?.ownerId || 'admin',
      applicantName: appData.applicantName,
      applicantPhone: appData.applicantPhone,
      applicantEmail: appData.applicantEmail,
      applicantCity: appData.applicantCity,
      experienceYears: appData.experienceYears,
      housingType: appData.housingType,
      message: appData.message,
      createdAt: 'Vừa xong',
      status: 'pending',
    };

    setApplications([newApp, ...applications]);
    showToast(`Đã gửi đơn nhận nuôi bé ${appData.petName} thành công!`);
  };

  // Friend actions
  const handleSendFriendRequest = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          if (u.isFriend) {
            showToast(`Đã hủy kết bạn với ${u.name}.`);
            return { ...u, isFriend: false, friendRequestSent: false };
          }
          if (u.friendRequestSent) {
            showToast(`Đã hủy lời mời kết bạn gửi tới ${u.name}.`);
            return { ...u, friendRequestSent: false };
          }
          showToast(`Đã gửi lời mời kết bạn tới ${u.name}!`);
          return { ...u, friendRequestSent: true };
        }
        return u;
      })
    );
  };

  const handleAcceptFriendNotif = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
    showToast('Đã chấp nhận kết bạn! Bây giờ hai bạn có thể trò chuyện.');
  };

  // Place Bookmark
  const handleToggleSavePlace = (placeId: string) => {
    setToplistPlaces((prev) =>
      prev.map((p) => {
        if (p.id === placeId) {
          const isSaved = !p.isSaved;
          showToast(isSaved ? `Đã lưu ${p.name}!` : `Đã bỏ lưu ${p.name}.`);
          return { ...p, isSaved };
        }
        return p;
      })
    );
  };

  // Booking handlers
  const handleOpenBooking = (clinicOrPlace: ToplistPlace | ClinicReview) => {
    const targetName = 'clinicName' in clinicOrPlace ? clinicOrPlace.clinicName : clinicOrPlace.name;
    let target = toplistPlaces.find((p) => p.name === targetName);
    if (!target) {
      target = {
        id: `clinic-${Date.now()}`,
        name: targetName,
        category: 'clinic',
        rating: clinicOrPlace.rating || 4.9,
        reviewsCount: clinicOrPlace.reviewsCount || 100,
        city: clinicOrPlace.city || 'Đà Nẵng',
        address: clinicOrPlace.address || '154 Cách Mạng Tháng 8, Q. Cẩm Lệ, Đà Nẵng',
        phone: ('phone' in clinicOrPlace ? clinicOrPlace.phone : undefined) || '0236 3889 999',
        email: ('email' in clinicOrPlace ? clinicOrPlace.email : undefined) || 'bs.hoang.hoavang@vettop.vn',
        doctorName: ('doctorName' in clinicOrPlace ? clinicOrPlace.doctorName : undefined) || 'BS. Nguyễn Huy Hoàng',
        logoUrl: ('clinicLogo' in clinicOrPlace ? clinicOrPlace.clinicLogo : undefined) || ('logoUrl' in clinicOrPlace ? clinicOrPlace.logoUrl : undefined),
        isOpen: true,
      };
    }
    setSelectedClinicForBooking(target);
    setShowAppointmentBookingModal(true);
  };

  const handleBookingSuccess = (booking: AppointmentBooking) => {
    setAppointments((prev) => [booking, ...prev]);
    const notifItem: NotificationItem = {
      id: `n-${Date.now()}`,
      type: 'adoption',
      title: `Đặt lịch khám: ${booking.clinicName}`,
      desc: `Đã gửi email thông báo hẹn khám bé ${booking.petName} đến hộp thư bác sĩ (${booking.doctorEmail}).`,
      time: 'Vừa xong',
      avatar: booking.clinicLogo || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      read: false,
    };
    setNotifications((prev) => [notifItem, ...prev]);
    showToast(`Đã gửi email đặt lịch khám thành công tới: ${booking.doctorEmail}!`);
  };

  // Group handlers
  const handleToggleJoinGroup = (groupId: string) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const isJoined = !g.isJoined;
          showToast(isJoined ? `Đã tham gia nhóm ${g.name}!` : `Đã rời khỏi nhóm ${g.name}.`);
          return {
            ...g,
            isJoined,
            membersCount: isJoined ? g.membersCount + 1 : Math.max(0, g.membersCount - 1),
          };
        }
        return g;
      })
    );
  };

  const handleFilterPostsByGroup = (groupName: string) => {
    setActiveNavTab('feed');
    setSearchQuery(groupName);
    showToast(`Đang lọc bài viết từ nhóm: ${groupName}`);
  };

  const handleOpenCreatePostInGroup = (groupName: string) => {
    if (!currentUser) {
      setShowAuthModal(true);
      showToast('Vui lòng đăng nhập để đăng bài vào nhóm.');
      return;
    }
    setComposerInitialType('general');
    setComposerInitialGroup(groupName);
    setShowPostComposer(true);
  };

  // Add / Edit Pet
  const handleSavePet = (petData: Omit<Pet, 'id' | 'userId'>) => {
    if (selectedPetForEdit) {
      setPets((prev) =>
        prev.map((p) => (p.id === selectedPetForEdit.id ? { ...p, ...petData } : p))
      );
      showToast(`Đã cập nhật sổ sức khỏe bé ${petData.name}!`);
    } else {
      const newPet: Pet = {
        id: `pet-${Date.now()}`,
        userId: currentUser?.id || 'guest',
        ...petData,
      };
      setPets([...pets, newPet]);
      showToast(`Đã thêm bé ${newPet.name} vào gia đình của bạn!`);
    }
    setSelectedPetForEdit(null);
  };

  // Register New User
  const handleRegisterNewUser = (newUser: User, initialPetName?: string, initialPetBreed?: string) => {
    setCurrentUser(newUser);
    setUsers([newUser, ...users]);

    if (initialPetName) {
      const firstPet: Pet = {
        id: `pet-${Date.now()}`,
        userId: newUser.id,
        name: initialPetName,
        species: initialPetBreed?.toLowerCase().includes('chó') ? 'dog' : 'cat',
        breed: initialPetBreed || 'Thú cưng',
        age: '1 tuổi',
        gender: 'female',
        avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&auto=format&fit=crop&q=80',
        vaccinated: true,
        neutered: false,
        notes: 'Bé cưng của gia đình.',
      };
      setPets([firstPet]);
    }
  };

  // Filter posts logic
  const filteredPosts = posts.filter((post) => {
    if (activeFilterType === 'saved') {
      if (!post.isSaved) return false;
    } else if (activeFilterType !== 'all') {
      if (post.type !== activeFilterType) return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const inContent = post.content.toLowerCase().includes(q);
      const inAuthor = post.author.name.toLowerCase().includes(q);
      const inLocation = post.location?.toLowerCase().includes(q);
      const inClinic = post.clinicReview?.clinicName.toLowerCase().includes(q);
      const inAdoption = post.adoption?.petName.toLowerCase().includes(q) || post.adoption?.breed.toLowerCase().includes(q);
      return inContent || inAuthor || inLocation || inClinic || inAdoption;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <span>🐾</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navbar */}
      <Navbar
        currentUser={currentUser}
        activeNavTab={activeNavTab}
        setActiveNavTab={setActiveNavTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        unreadNotifications={unreadNotificationsCount}
        unreadMessages={1}
        onOpenNotifications={() => setShowNotifications(!showNotifications)}
        onOpenMessages={() => {
          setActiveChatUser(users[0]);
          setShowChatDrawer(true);
        }}
        onOpenProfile={() => {
          setSelectedUserForProfile(currentUser);
          setShowUserProfileModal(true);
        }}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenCreatePost={() => {
          setComposerInitialType('general');
          setShowPostComposer(true);
        }}
        onLogout={handleLogout}
      />

      {/* Notification Dropdown */}
      <NotificationDropdown
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onAcceptFriend={handleAcceptFriendNotif}
        onMarkAllAsRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          showToast('Đã đánh dấu tất cả thông báo là đã đọc.');
        }}
      />

      {/* Main Container Layout */}
      <div className="max-w-[1520px] mx-auto px-2 sm:px-4 py-4 flex-1 w-full">
        <div className="flex items-start gap-4">
          {/* Left Sidebar (Desktop & Tablet) */}
          <LeftSidebar
            currentUser={currentUser}
            activeNavTab={activeNavTab}
            setActiveNavTab={setActiveNavTab}
            activeFilterType={activeFilterType}
            setActiveFilterType={setActiveFilterType}
            pets={pets}
            onOpenAddPet={() => {
              if (!currentUser) {
                setShowAuthModal(true);
                showToast('Vui lòng đăng nhập để quản lý thú cưng.');
                return;
              }
              setSelectedPetForEdit(null);
              setShowPetModal(true);
            }}
            onSelectPet={(pet) => {
              setSelectedPetForEdit(pet);
              setShowPetModal(true);
            }}
            onOpenCreatePost={() => {
              if (!currentUser) {
                setShowAuthModal(true);
                showToast('Vui lòng đăng nhập để đăng bài.');
                return;
              }
              setComposerInitialType('general');
              setShowPostComposer(true);
            }}
            onOpenAuth={() => setShowAuthModal(true)}
          />

          {/* Center Main Content Area */}
          <main className="flex-1 min-w-0 max-w-4xl mx-auto space-y-4">
            {activeNavTab === 'feed' && (
              <>
                <FeedHeader
                  currentUser={currentUser}
                  onOpenCreatePost={(type) => {
                    setComposerInitialType(type || 'general');
                    setShowPostComposer(true);
                  }}
                  activeFilterType={activeFilterType}
                  setActiveFilterType={setActiveFilterType}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />

                {/* Posts List */}
                {filteredPosts.length === 0 ? (
                  <div className="bg-white rounded-2xl p-10 text-center space-y-3 border border-slate-200/80">
                    <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-2xl">
                      🐾
                    </div>
                    <h3 className="text-base font-bold text-slate-800">
                      Chưa có bài viết nào trong danh mục này
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Hãy là người đầu tiên chia sẻ kinh nghiệm hoặc đăng tin thú cưng nhận nuôi!
                    </p>
                    <button
                      onClick={() => {
                        setComposerInitialType('general');
                        setShowPostComposer(true);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Tạo bài viết ngay
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        currentUser={currentUser}
                        onLikePost={handleLikePost}
                        onSavePost={handleSavePost}
                        onSharePost={handleSharePost}
                        onAddComment={handleAddComment}
                        onOpenAdoptionModal={(p) => {
                          if (p.adoption) {
                            setSelectedPetForApply(p.adoption);
                            setShowApplyModal(true);
                          }
                        }}
                        onOpenClinicModal={(clinic) => {
                          setSelectedClinic(clinic);
                          setShowClinicDetailModal(true);
                        }}
                        onOpenUserModal={(author) => {
                          setSelectedUserForProfile(author);
                          setShowUserProfileModal(true);
                        }}
                        onOpenAuth={() => setShowAuthModal(true)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {activeNavTab === 'adoption' && (
              <AdoptionPortal
                adoptionPets={adoptionPets}
                currentUser={currentUser}
                applications={applications}
                onOpenApplyModal={(pet) => {
                  if (!currentUser) {
                    setShowAuthModal(true);
                    showToast('Vui lòng đăng nhập để gửi đơn nhận nuôi.');
                    return;
                  }
                  setSelectedPetForApply(pet);
                  setShowApplyModal(true);
                }}
                onOpenCreateAdoption={() => {
                  if (!currentUser) {
                    setShowAuthModal(true);
                    showToast('Vui lòng đăng nhập để đăng tin tìm chủ.');
                    return;
                  }
                  setComposerInitialType('adoption');
                  setShowPostComposer(true);
                }}
                onOpenChatWith={(ownerName, ownerId) => {
                  const target = users.find((u) => u.id === ownerId) || {
                    id: ownerId,
                    name: ownerName,
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                    role: 'Người bảo trợ nhận nuôi',
                  };
                  setActiveChatUser(target);
                  setShowChatDrawer(true);
                }}
              />
            )}

            {activeNavTab === 'experience' && (
              <ExperienceHub
                articles={guideArticles}
                currentUser={currentUser}
                onOpenCreateExperience={() => {
                  if (!currentUser) {
                    setShowAuthModal(true);
                    showToast('Vui lòng đăng nhập để chia sẻ kinh nghiệm.');
                    return;
                  }
                  setComposerInitialType('experience');
                  setShowPostComposer(true);
                }}
                onSelectArticle={(article) => {
                  // Handled inside ExperienceHub reader
                }}
              />
            )}

            {activeNavTab === 'toplist' && (
              <ToplistView
                places={toplistPlaces}
                onToggleSavePlace={handleToggleSavePlace}
                onOpenClinicDetails={(place) => {
                  setSelectedClinic({
                    clinicName: place.name,
                    rating: place.rating,
                    reviewsCount: place.reviewsCount,
                    city: place.city,
                    category: place.category === 'clinic' ? 'Phòng khám thú y' : 
                              place.category === 'petshop' ? 'Petshop dinh dưỡng' : 
                              place.category === 'spa' ? 'Spa & Grooming' : 'Pet Hotel lưu chuồng',
                    address: place.address,
                    clinicLogo: place.logoUrl || place.imageUrl,
                    email: place.email,
                    phone: place.phone,
                    doctorName: place.doctorName,
                  });
                  setShowClinicDetailModal(true);
                }}
                onOpenBooking={handleOpenBooking}
              />
            )}

            {activeNavTab === 'groups' && (
              <GroupsView
                groups={groups}
                currentUser={currentUser}
                onToggleJoinGroup={handleToggleJoinGroup}
                onOpenCreatePostInGroup={handleOpenCreatePostInGroup}
                onFilterPostsByGroup={handleFilterPostsByGroup}
              />
            )}

            {activeNavTab === 'friends' && (
              <FriendsView
                users={users}
                currentUser={currentUser || currentUserInitial}
                onSendFriendRequest={handleSendFriendRequest}
                onOpenUserModal={(u) => {
                  setSelectedUserForProfile(u);
                  setShowUserProfileModal(true);
                }}
                onOpenChatWith={(u) => {
                  setActiveChatUser(u);
                  setShowChatDrawer(true);
                }}
              />
            )}
          </main>

          {/* Right Sidebar (Desktop) */}
          <RightSidebar
            toplistPlaces={toplistPlaces}
            guideArticles={guideArticles}
            suggestedFriends={users.filter((u) => u.id !== currentUser?.id)}
            onToggleSavePlace={handleToggleSavePlace}
            onSendFriendRequest={handleSendFriendRequest}
            onOpenArticle={(article) => {
              setActiveNavTab('experience');
            }}
            onOpenUserModal={(u) => {
              setSelectedUserForProfile(u);
              setShowUserProfileModal(true);
            }}
            onOpenChatWith={(u) => {
              setActiveChatUser(u);
              setShowChatDrawer(true);
            }}
            onViewAllToplist={() => setActiveNavTab('toplist')}
            onViewAllArticles={() => setActiveNavTab('experience')}
            onViewAllFriends={() => setActiveNavTab('friends')}
          />
        </div>
      </div>

      {/* Floating Modals and Dialogs */}
      <PostComposerModal
        isOpen={showPostComposer}
        onClose={() => setShowPostComposer(false)}
        currentUser={currentUser}
        initialType={composerInitialType}
        initialGroupName={composerInitialGroup}
        onAddPost={handleAddPost}
      />

      <AdoptionApplicationModal
        isOpen={showApplyModal}
        onClose={() => {
          setShowApplyModal(false);
          setSelectedPetForApply(null);
        }}
        adoptionPet={selectedPetForApply}
        currentUser={currentUser}
        onSubmitApplication={handleSubmitApplication}
      />

      <PetModal
        isOpen={showPetModal}
        onClose={() => {
          setShowPetModal(false);
          setSelectedPetForEdit(null);
        }}
        initialPet={selectedPetForEdit}
        onSavePet={handleSavePet}
      />

      <UserProfileModal
        isOpen={showUserProfileModal}
        onClose={() => {
          setShowUserProfileModal(false);
          setSelectedUserForProfile(null);
        }}
        user={selectedUserForProfile}
        currentUser={currentUser}
        userPets={selectedUserForProfile?.id === currentUser?.id ? pets : []}
        onSendFriendRequest={handleSendFriendRequest}
        onOpenChatWith={(u) => {
          setActiveChatUser(u);
          setShowChatDrawer(true);
        }}
      />

      <ChatDrawer
        isOpen={showChatDrawer}
        onClose={() => setShowChatDrawer(false)}
        activeChatUser={activeChatUser}
        currentUser={currentUser}
        allUsers={users}
        onSelectChatUser={(u) => setActiveChatUser(u)}
        onSendFriendRequest={handleSendFriendRequest}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        currentUser={currentUser}
        onLoginAsUser={(u) => {
          setCurrentUser(u);
          showToast(`Đã chuyển sang tài khoản ${u.name}`);
        }}
        onRegisterNewUser={handleRegisterNewUser}
        onLogout={handleLogout}
      />

      <ClinicDetailModal
        isOpen={showClinicDetailModal}
        onClose={() => {
          setShowClinicDetailModal(false);
          setSelectedClinic(null);
        }}
        clinic={selectedClinic}
        onOpenBooking={(c) => handleOpenBooking(c as any)}
      />

      <AppointmentBookingModal
        isOpen={showAppointmentBookingModal}
        onClose={() => {
          setShowAppointmentBookingModal(false);
          setSelectedClinicForBooking(null);
        }}
        clinic={selectedClinicForBooking}
        allClinics={toplistPlaces}
        currentUser={currentUser}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
}
