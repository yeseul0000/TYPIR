import StrokeButton from '@/atoms/StrokeButton/StrokeButton';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNewPostModalStore } from '@/zustand/useStore';
import { useRef, useEffect } from 'react';

function NewPostModal({ top, right, bottom, bgColor = 'bg-white', border = 'border', showCloseIcon = true }) {
  const { isModalOpen, closeModal } = useNewPostModalStore();
  const modalRef = useRef();

  useEffect(() => {
    // 모달 외부 클릭 닫기
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    // Esc 키로 모달 닫기
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    // 640px 이하에서 모달 닫기
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // 스크롤 막기
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', handleResize);
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (isModalOpen) {
        document.body.style.overflow = 'unset'; // 스크롤 막기 해제
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [isModalOpen, closeModal]);

  /* 모달이 필요할 때만 DOM에 추가 */
  if (!isModalOpen) return null;

  return (
    <div className={`absolute ${top} ${right} ${bottom}`} ref={modalRef}>
      <div className={`w-[300px] h-[180px] ${bgColor} ${border} border-black rounded-xl flex items-center flex-col`}>
        <div className="w-full flex justify-end items-start pt-3 pr-3">
          {showCloseIcon && <FontAwesomeIcon icon={faXmark} onClick={closeModal} />}
        </div>
        <div className="h-full flex flex-col justify-center gap-2 mb-7">
          <StrokeButton
            text="새 스타일 만들기"
            width="w-[220px]"
            height="h-[50px]"
            bgColor="bg-black"
            fontColor="text-white"
            fontSize="text-[14px]"
          />
          <StrokeButton text="커뮤니티에 글쓰기" width="w-[220px]" height="h-[50px]" fontSize="text-[14px]" />
        </div>
      </div>
    </div>
  );
}
export default NewPostModal;
