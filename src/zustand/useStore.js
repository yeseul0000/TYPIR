import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* 마이 페이지, 헤더 관련 */
export const useSelectCategoryStore = create((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export const useDeleteModalStore = create((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export const useDetailModalStore = create((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export const useToggleStore = create((set) => ({
  isToggled: false,
  toggle: () => set((state) => ({ isToggled: !state.isToggled })),
}));

/* 포켓베이스 데이터 관련 */

/* 이미지 url 저장 */
export const useImageStore = create((set) => ({
  selectedImageUrl: null,
  setSelectedImageUrl: (url) => set({ selectedImageUrl: url }),
}));

/* 마이 페이지 앨범 */
export const useAlbumStore = create((set) => ({
  albums: [],
  setAlbums: (albums) => set({ albums }),
}));

/* New Post 앨범 */
export const usePersistentAlbumStore = create(
  persist(
    (set) => ({
      albums: [],
      setAlbums: (albums) => set({ albums }),
    }),
    {
      name: 'album-storage', // 로컬 스토리지에 저장될 때 사용할 키
    },
  ),
);

export const useBoardStore = create((set) => ({
  boards: [],
  setBoards: (data) => set({ boards: data }),
}));
